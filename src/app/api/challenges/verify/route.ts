import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db/client";
import { verifyLeetCodeSolved } from "@/lib/leetcode/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { challenge_id } = body;
    let { user_id, leetcode_slug, leetcode_username } = body;

    // Default to user's provided handle if not specified
    if (!leetcode_username) {
      if (user_id) {
        const [user] = await sql`SELECT leetcode_username FROM users WHERE id = ${user_id}`;
        leetcode_username = user?.leetcode_username;
      }
      if (!leetcode_username) {
        leetcode_username = "ev7utG9eiZ";
      }
    }

    interface ChallengeRecord {
      id: string;
      xp_reward: number;
      leetcode_slug: string;
    }

    let challenge: ChallengeRecord | null = null;
    if (challenge_id) {
      const rows = await sql`SELECT id, xp_reward, leetcode_slug FROM challenges WHERE id = ${challenge_id}`;
      if (rows && rows.length > 0) {
        challenge = rows[0] as unknown as ChallengeRecord;
      }
    } else if (leetcode_slug) {
      const rows = await sql`SELECT id, xp_reward, leetcode_slug FROM challenges WHERE leetcode_slug = ${leetcode_slug} OR slug = ${leetcode_slug}`;
      if (rows && rows.length > 0) {
        challenge = rows[0] as unknown as ChallengeRecord;
      }
    }

    const slug = leetcode_slug || challenge?.leetcode_slug;
    if (!slug) {
      return NextResponse.json({ error: "No challenge or leetcode_slug provided" }, { status: 400 });
    }

    // Verify with live LeetCode GraphQL
    const isSolved = await verifyLeetCodeSolved(leetcode_username, slug);

    if (!isSolved) {
      return NextResponse.json({
        verified: false,
        username: leetcode_username,
        slug,
        message: `Not solved on LeetCode yet by '${leetcode_username}'. Submit your solution there first!`,
      });
    }

    const xpReward = challenge?.xp_reward || 50;

    // If user_id provided, record verification and reward XP
    if (user_id && challenge?.id) {
      await sql`
        INSERT INTO user_challenges (user_id, challenge_id, status, submitted_at, verified_at, attempts)
        VALUES (${user_id}, ${challenge.id}, 'verified', NOW(), NOW(), 1)
        ON CONFLICT (user_id, challenge_id)
        DO UPDATE SET status = 'verified', verified_at = NOW(), attempts = user_challenges.attempts + 1
      `;

      await sql`
        UPDATE users SET xp = xp + ${xpReward} WHERE id = ${user_id}
      `;

      await sql`
        INSERT INTO xp_transactions (user_id, amount, reason, ref_id, ref_type)
        VALUES (${user_id}, ${xpReward}, 'challenge_solved', ${challenge.id}, 'challenge')
      `;
    }

    return NextResponse.json({
      verified: true,
      username: leetcode_username,
      slug,
      xp_earned: xpReward,
      message: `Verified! Solution confirmed on LeetCode. +${xpReward} XP awarded!`,
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Verification failed", details: String(error) }, { status: 500 });
  }
}
