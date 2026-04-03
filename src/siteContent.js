import defaultSiteContent from "./content/site-content.json";

export const ADMIN_DRAFT_STORAGE_KEY = "portfolio-sec-3d:admin-draft";

export const cloneJson = (value) => JSON.parse(JSON.stringify(value));

const isPlainObject = (value) =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const mergeWithDefaults = (defaults, candidate) => {
  if (Array.isArray(defaults)) {
    return Array.isArray(candidate) ? candidate : cloneJson(defaults);
  }

  if (isPlainObject(defaults)) {
    const source = isPlainObject(candidate) ? candidate : {};
    const out = {};

    Object.keys(defaults).forEach((key) => {
      out[key] = mergeWithDefaults(defaults[key], source[key]);
    });

    Object.keys(source).forEach((key) => {
      if (!(key in out)) {
        out[key] = source[key];
      }
    });

    return out;
  }

  return candidate === undefined || candidate === null ? defaults : candidate;
};

export const createDefaultSiteContent = () => cloneJson(defaultSiteContent);

export const mergeSiteContent = (candidate = {}) =>
  mergeWithDefaults(createDefaultSiteContent(), candidate);

export const loadDraftSiteContent = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(ADMIN_DRAFT_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return mergeSiteContent(JSON.parse(raw));
  } catch {
    return null;
  }
};

export const persistDraftSiteContent = (content) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    ADMIN_DRAFT_STORAGE_KEY,
    JSON.stringify(content, null, 2)
  );
};

export const clearDraftSiteContent = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(ADMIN_DRAFT_STORAGE_KEY);
};

export const resolveAssetUrl = (value) => {
  const raw = String(value || "").trim();
  if (!raw) {
    return "";
  }

  if (
    /^(?:[a-z]+:)?\/\//i.test(raw) ||
    /^data:/i.test(raw) ||
    /^mailto:/i.test(raw) ||
    /^tel:/i.test(raw) ||
    raw.startsWith("#")
  ) {
    return raw;
  }

  if (raw.startsWith("/")) {
    return raw;
  }

  return `${import.meta.env.BASE_URL}${raw.replace(/^\.?\//, "")}`;
};
