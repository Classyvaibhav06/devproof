import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db/client";
import { verifyLeetCodeSolved } from "@/lib/github/api";

export async function POST(req: NextRequest) {
  try {
    const { user_id, challenge_id, leetcode_slug } = await req.json();

    if (!user_id || !challenge_id) {
      return NextResponse.json({ error: "Missing user_id or challenge_id" }, { status: 400 });
    }

    // Get user's LeetCode username
    const [user] = await sql`
      SELECT leetcode_username, xp FROM users WHERE id = ${user_id}
    `;

    if (!user?.leetcode_username) {
      return NextResponse.json(
        { error: "No LeetCode username linked. Add it in your profile settings." },
        { status: 400 }
      );
    }

    // Get challenge info
    const [challenge] = await sql`
      SELECT id, xp_reward, leetcode_slug FROM challenges WHERE id = ${challenge_id}
    `;

    if (!challenge) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    }

    const slug = leetcode_slug || challenge.leetcode_slug;

    // Check existing attempt
    const [existing] = await sql`
      SELECT status FROM user_challenges WHERE user_id = ${user_id} AND challenge_id = ${challenge_id}
    `;

    if (existing?.status === "verified") {
      return NextResponse.json({ already_verified: true, message: "Already verified!" });
    }

    // Verify with LeetCode API
    const isSolved = await verifyLeetCodeSolved(user.leetcode_username, slug);

    if (!isSolved) {
      // Upsert as failed attempt
      await sql`
        INSERT INTO user_challenges (user_id, challenge_id, status, submitted_at, attempts)
        VALUES (${user_id}, ${challenge_id}, 'pending', NOW(), 1)
        ON CONFLICT (user_id, challenge_id)
        DO UPDATE SET attempts = user_challenges.attempts + 1, submitted_at = NOW()
      `;
      return NextResponse.json({
        verified: false,
        message: "Not solved on LeetCode yet. Submit your solution there first!",
      });
    }

    // Award XP and mark verified
    await sql`
      INSERT INTO user_challenges (user_id, challenge_id, status, submitted_at, verified_at, attempts)
      VALUES (${user_id}, ${challenge_id}, 'verified', NOW(), NOW(), 1)
      ON CONFLICT (user_id, challenge_id)
      DO UPDATE SET status = 'verified', verified_at = NOW(), attempts = user_challenges.attempts + 1
    `;

    await sql`
      UPDATE users SET xp = xp + ${challenge.xp_reward} WHERE id = ${user_id}
    `;

    await sql`
      INSERT INTO xp_transactions (user_id, amount, reason, ref_id, ref_type)
      VALUES (${user_id}, ${challenge.xp_reward}, 'challenge_solved', ${challenge_id}, 'challenge')
    `;

    return NextResponse.json({
      verified: true,
      xp_earned: challenge.xp_reward,
      message: `Verified! +${challenge.xp_reward} XP awarded.`,
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
