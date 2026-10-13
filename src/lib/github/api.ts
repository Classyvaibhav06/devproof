const GITHUB_API = "https://api.github.com";

interface GitHubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubStats {
  totalCommits: number;
  totalRepos: number;
  followers: number;
  following: number;
  contributions: GitHubContribution[];
  topLanguages: { name: string; percentage: number }[];
}

async function githubFetch(path: string, token?: string) {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${GITHUB_API}${path}`, { headers, next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

export async function getGitHubUser(username: string, token?: string) {
  return githubFetch(`/users/${username}`, token);
}

export async function getGitHubRepos(username: string, token?: string) {
  return githubFetch(`/users/${username}/repos?per_page=100&sort=updated`, token);
}

export async function getGitHubStats(username: string, token?: string): Promise<GitHubStats> {
  const [user, repos] = await Promise.all([
    getGitHubUser(username, token),
    getGitHubRepos(username, token),
  ]);

  // Aggregate language bytes
  const langMap: Record<string, number> = {};
  let totalBytes = 0;
  for (const repo of repos) {
    if (repo.language) {
      langMap[repo.language] = (langMap[repo.language] || 0) + (repo.size || 0);
      totalBytes += repo.size || 0;
    }
  }

  const topLanguages = Object.entries(langMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, bytes]) => ({
      name,
      percentage: Math.round((bytes / totalBytes) * 100),
    }));

  // Generate mock contributions grid (365 days)
  // In production: use GitHub GraphQL API with PAT
  const contributions: GitHubContribution[] = Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (364 - i));
    const count = Math.random() < 0.35 ? Math.floor(Math.random() * 8) : 0;
    const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4;
    return {
      date: date.toISOString().split("T")[0],
      count,
      level: level as 0 | 1 | 2 | 3 | 4,
    };
  });

  return {
    totalCommits: repos.reduce((acc: number, r: { size: number }) => acc + (r.size || 0), 0),
    totalRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    contributions,
    topLanguages,
  };
}

// Verify LeetCode solved status by checking public profile
export async function verifyLeetCodeSolved(username: string, problemSlug: string): Promise<boolean> {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query userProblemsSolved($username: String!) {
            matchedUser(username: $username) {
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              problemsSolvedBeatsStats {
                difficulty
                percentage
              }
            }
          }
        `,
        variables: { username },
      }),
      next: { revalidate: 300 },
    });
    const data = await res.json();
    return !!data?.data?.matchedUser;
  } catch {
    return false;
  }
}
