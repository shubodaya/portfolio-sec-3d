const GITHUB_API_BASE = "https://api.github.com";

const toBase64 = (value) => {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
};

const requestGithub = async (path, { method = "GET", token = "", body } = {}) => {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${GITHUB_API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      `GitHub request failed with status ${response.status}.`;
    throw new Error(message);
  }

  return data;
};

const encodeContentPath = (contentPath) =>
  String(contentPath || "")
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

export const publishContentToGithub = async ({
  owner,
  repo,
  branch,
  contentPath,
  content,
  token,
  message
}) => {
  const normalizedOwner = String(owner || "").trim();
  const normalizedRepo = String(repo || "").trim();
  const normalizedBranch = String(branch || "main").trim();
  const normalizedContentPath = String(contentPath || "").trim();
  const normalizedToken = String(token || "").trim();

  if (!normalizedOwner || !normalizedRepo || !normalizedContentPath) {
    throw new Error("Owner, repo, branch, and content path are required.");
  }

  if (!normalizedToken) {
    throw new Error("A GitHub token with repository write access is required.");
  }

  const encodedPath = encodeContentPath(normalizedContentPath);
  const repoPath = `/repos/${encodeURIComponent(
    normalizedOwner
  )}/${encodeURIComponent(normalizedRepo)}/contents/${encodedPath}`;

  const currentFile = await requestGithub(
    `${repoPath}?ref=${encodeURIComponent(normalizedBranch)}`,
    { token: normalizedToken }
  );

  const nextJson = `${JSON.stringify(content, null, 2)}\n`;
  const result = await requestGithub(repoPath, {
    method: "PUT",
    token: normalizedToken,
    body: {
      message:
        String(message || "").trim() || "Update portfolio-sec-3d site content",
      content: toBase64(nextJson),
      sha: currentFile.sha,
      branch: normalizedBranch
    }
  });

  return {
    commitSha: result?.commit?.sha || "",
    commitUrl: result?.commit?.html_url || "",
    contentUrl: result?.content?.html_url || ""
  };
};
