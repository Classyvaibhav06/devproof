export interface LeetCodeStats {
  username: string;
  ranking: number;
  reputation: number;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  recentSubmissions: {
    id: string;
    title: string;
    titleSlug: string;
    timestamp: string;
  }[];
}

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

export async function getLeetCodeProfile(username: string): Promise<LeetCodeStats | null> {
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            ranking
            reputation
          }
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
        recentAcSubmissionList(username: $username, limit: 50) {
          id
          title
          titleSlug
          timestamp
        }
      }
    `;

    const res = await fetch(LEETCODE_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 120 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const user = json?.data?.matchedUser;
    if (!user) return null;

    const stats = user.submitStatsGlobal?.acSubmissionNum || [];
    const getCount = (diff: string) => stats.find((s: { difficulty: string }) => s.difficulty === diff)?.count || 0;

    return {
      username: user.username,
      ranking: user.profile?.ranking || 0,
      reputation: user.profile?.reputation || 0,
      totalSolved: getCount("All"),
      easySolved: getCount("Easy"),
      mediumSolved: getCount("Medium"),
      hardSolved: getCount("Hard"),
      recentSubmissions: json?.data?.recentAcSubmissionList || [],
    };
  } catch (err) {
    console.error("LeetCode fetch error:", err);
    return null;
  }
}

export async function verifyLeetCodeSolved(username: string, problemSlug: string): Promise<boolean> {
  const profile = await getLeetCodeProfile(username);
  if (!profile) return false;

  const normalized = problemSlug.toLowerCase().trim();
  return profile.recentSubmissions.some((sub) => sub.titleSlug.toLowerCase() === normalized);
}
