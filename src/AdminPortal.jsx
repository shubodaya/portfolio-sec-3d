import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { publishContentToGithub } from "./githubPages";
import {
  clearDraftSiteContent,
  cloneJson,
  loadDraftSiteContent,
  mergeSiteContent,
  persistDraftSiteContent
} from "./siteContent";

const PANE_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
  { id: "publish", label: "Publish" }
];

const moveItem = (items, index, direction) => {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= items.length) {
    return items;
  }

  const nextItems = [...items];
  const [item] = nextItems.splice(index, 1);
  nextItems.splice(nextIndex, 0, item);
  return nextItems;
};

const readFileText = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("Unable to read file."));
    reader.readAsText(file);
  });

const downloadJson = (fileName, content) => {
  const blob = new Blob([`${JSON.stringify(content, null, 2)}\n`], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const splitParagraphs = (value) =>
  String(value || "")
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);

const splitLines = (value) =>
  String(value || "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

const joinParagraphs = (items) => (Array.isArray(items) ? items.join("\n\n") : "");
const joinLines = (items) => (Array.isArray(items) ? items.join("\n") : "");

const createQuickLink = () => ({ label: "New Link", to: "/" });
const createSkill = () => ({ label: "New Skill", percent: 80 });
const createInfoItem = () => ({ label: "Label", value: "Value" });
const createExperienceItem = () => ({
  date: "",
  title: "",
  company: "",
  bullets: []
});
const createProjectItem = () => ({
  year: "",
  title: "",
  subtitle: "",
  link: ""
});
const createEducationItem = () => ({
  date: "",
  title: "",
  institution: "",
  detail: ""
});
const createCertification = () => ({
  title: "",
  imagePath: "",
  link: ""
});
const createContactCard = () => ({
  title: "",
  iconClass: "",
  value: "",
  type: "text",
  href: ""
});
const createSocialLink = () => ({
  label: "",
  iconClass: "",
  href: ""
});

const updateAtPath = (root, path, updater) => {
  const nextRoot = cloneJson(root);
  let cursor = nextRoot;

  for (let index = 0; index < path.length - 1; index += 1) {
    cursor = cursor[path[index]];
  }

  const lastKey = path[path.length - 1];
  cursor[lastKey] = updater(cursor[lastKey]);
  return mergeSiteContent(nextRoot);
};

const Notice = ({ message, isError = false }) =>
  message ? (
    <div className={`admin-notice${isError ? " admin-notice--error" : ""}`}>
      {message}
    </div>
  ) : null;

function RepeaterActions({ index, length, onMove, onRemove }) {
  return (
    <div className="admin-repeater__actions">
      <button
        className="admin-btn admin-btn--ghost admin-btn--small"
        type="button"
        onClick={() => onMove(index, -1)}
        disabled={index === 0}
      >
        Up
      </button>
      <button
        className="admin-btn admin-btn--ghost admin-btn--small"
        type="button"
        onClick={() => onMove(index, 1)}
        disabled={index === length - 1}
      >
        Down
      </button>
      <button
        className="admin-btn admin-btn--danger admin-btn--small"
        type="button"
        onClick={() => onRemove(index)}
      >
        Remove
      </button>
    </div>
  );
}

export default function AdminPortal({ defaultContent, onContentSaved }) {
  const publishedContent = useMemo(
    () => mergeSiteContent(defaultContent),
    [defaultContent]
  );

  const [draftContent, setDraftContent] = useState(() => {
    const localDraft = loadDraftSiteContent();
    return localDraft || publishedContent;
  });
  const [activePane, setActivePane] = useState("home");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusError, setStatusError] = useState("");
  const [publishBusy, setPublishBusy] = useState(false);
  const [publishToken, setPublishToken] = useState("");
  const [publishMessage, setPublishMessage] = useState(
    "Update portfolio-sec-3d site content"
  );
  const [publishResult, setPublishResult] = useState(null);
  const [importText, setImportText] = useState("");

  useEffect(() => {
    const localDraft = loadDraftSiteContent();
    if (localDraft) {
      setDraftContent(localDraft);
      setStatusMessage("Loaded your saved local draft.");
      setStatusError("");
      return;
    }

    setDraftContent(publishedContent);
  }, [publishedContent]);

  const applyDraftUpdate = (path, updater) => {
    setDraftContent((prev) => updateAtPath(prev, path, updater));
  };

  const handleSaveDraft = () => {
    const normalized = mergeSiteContent(draftContent);
    persistDraftSiteContent(normalized);
    onContentSaved?.(normalized);
    setStatusError("");
    setStatusMessage(
      "Draft saved locally. Use Publish to GitHub to commit the content file and redeploy Pages."
    );
  };

  const handleReset = () => {
    clearDraftSiteContent();
    setDraftContent(publishedContent);
    onContentSaved?.(publishedContent);
    setPublishResult(null);
    setStatusError("");
    setStatusMessage("Draft reset to the published repository content.");
  };

  const handleExport = () => {
    downloadJson("portfolio-sec-3d-content.json", mergeSiteContent(draftContent));
    setStatusError("");
    setStatusMessage("Exported the current draft as JSON.");
  };

  const applyImportedContent = (candidate) => {
    const normalized = mergeSiteContent(candidate);
    setDraftContent(normalized);
    persistDraftSiteContent(normalized);
    onContentSaved?.(normalized);
    setPublishResult(null);
    setStatusError("");
    setStatusMessage("Imported content into the local draft.");
  };

  const handleImportFromText = () => {
    try {
      applyImportedContent(JSON.parse(importText));
    } catch (error) {
      setStatusError(error.message || "Import JSON is invalid.");
      setStatusMessage("");
    }
  };

  const handleImportFromFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const text = await readFileText(file);
      setImportText(text);
      applyImportedContent(JSON.parse(text));
    } catch (error) {
      setStatusError(error.message || "Unable to import the selected file.");
      setStatusMessage("");
    } finally {
      event.target.value = "";
    }
  };

  const handlePublish = async () => {
    try {
      setPublishBusy(true);
      setStatusError("");
      setStatusMessage("");
      setPublishResult(null);

      const normalized = mergeSiteContent(draftContent);
      persistDraftSiteContent(normalized);
      onContentSaved?.(normalized);

      const result = await publishContentToGithub({
        owner: normalized.meta.githubPages.owner,
        repo: normalized.meta.githubPages.repo,
        branch: normalized.meta.githubPages.branch,
        contentPath: normalized.meta.githubPages.contentPath,
        content: normalized,
        token: publishToken,
        message: publishMessage
      });

      setPublishResult(result);
      setStatusMessage(
        "Content committed to GitHub. GitHub Pages will redeploy from the new commit."
      );
    } catch (error) {
      setStatusError(error.message || "Unable to publish the draft to GitHub.");
    } finally {
      setPublishBusy(false);
    }
  };

  const renderHomePane = () => {
    const home = draftContent.home;
    return (
      <section className="admin-card">
        <h2>Home</h2>
        <div className="admin-form admin-form--two-col">
          <label>
            Greeting
            <input
              type="text"
              value={home.greeting}
              onChange={(event) =>
                applyDraftUpdate(["home", "greeting"], () => event.target.value)
              }
            />
          </label>
          <label>
            Headline Prefix
            <input
              type="text"
              value={home.headlinePrefix}
              onChange={(event) =>
                applyDraftUpdate(["home", "headlinePrefix"], () => event.target.value)
              }
            />
          </label>
          <label>
            Headline Name
            <input
              type="text"
              value={home.headlineName}
              onChange={(event) =>
                applyDraftUpdate(["home", "headlineName"], () => event.target.value)
              }
            />
          </label>
          <label>
            Typing Text
            <input
              type="text"
              value={home.typingText}
              onChange={(event) =>
                applyDraftUpdate(["home", "typingText"], () => event.target.value)
              }
            />
          </label>
          <label>
            Hero Background Image
            <input
              type="text"
              value={home.heroBackgroundImage}
              onChange={(event) =>
                applyDraftUpdate(
                  ["home", "heroBackgroundImage"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label>
            Hero Portrait Image
            <input
              type="text"
              value={home.heroPortraitImage}
              onChange={(event) =>
                applyDraftUpdate(
                  ["home", "heroPortraitImage"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label>
            Primary Button Label
            <input
              type="text"
              value={home.primaryButtonLabel}
              onChange={(event) =>
                applyDraftUpdate(
                  ["home", "primaryButtonLabel"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label>
            Primary Button URL
            <input
              type="url"
              value={home.primaryButtonUrl}
              onChange={(event) =>
                applyDraftUpdate(["home", "primaryButtonUrl"], () => event.target.value)
              }
            />
          </label>
          <label>
            Secondary Button Label
            <input
              type="text"
              value={home.secondaryButtonLabel}
              onChange={(event) =>
                applyDraftUpdate(
                  ["home", "secondaryButtonLabel"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label>
            Secondary Button URL
            <input
              type="url"
              value={home.secondaryButtonUrl}
              onChange={(event) =>
                applyDraftUpdate(
                  ["home", "secondaryButtonUrl"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label className="admin-form__full">
            Quick Links Heading
            <input
              type="text"
              value={home.quickLinksHeading}
              onChange={(event) =>
                applyDraftUpdate(
                  ["home", "quickLinksHeading"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label className="admin-form__full">
            3D Interaction Hint
            <input
              type="text"
              value={home.gamingHintText}
              onChange={(event) =>
                applyDraftUpdate(["home", "gamingHintText"], () => event.target.value)
              }
            />
          </label>
        </div>

        <div className="admin-subsection">
          <div className="admin-subsection__head">
            <h3>Quick Links</h3>
            <button
              className="admin-btn admin-btn--primary"
              type="button"
              onClick={() =>
                applyDraftUpdate(["home", "quickLinks"], (items) => [
                  ...items,
                  createQuickLink()
                ])
              }
            >
              Add Link
            </button>
          </div>
          <div className="admin-repeater">
            {home.quickLinks.map((item, index) => (
              <article className="admin-repeater__item" key={`quick-link-${index}`}>
                <div className="admin-form admin-form--two-col">
                  <label>
                    Label
                    <input
                      type="text"
                      value={item.label}
                      onChange={(event) =>
                        applyDraftUpdate(["home", "quickLinks"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, label: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                  <label>
                    Route
                    <input
                      type="text"
                      value={item.to}
                      onChange={(event) =>
                        applyDraftUpdate(["home", "quickLinks"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, to: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                </div>
                <RepeaterActions
                  index={index}
                  length={home.quickLinks.length}
                  onMove={(itemIndex, direction) =>
                    applyDraftUpdate(["home", "quickLinks"], (items) =>
                      moveItem(items, itemIndex, direction)
                    )
                  }
                  onRemove={(itemIndex) =>
                    applyDraftUpdate(["home", "quickLinks"], (items) =>
                      items.filter((_, entryIndex) => entryIndex !== itemIndex)
                    )
                  }
                />
              </article>
            ))}
          </div>
        </div>

        <div className="admin-subsection">
          <h3>Resume Block</h3>
          <div className="admin-form admin-form--two-col">
            <label>
              Heading
              <input
                type="text"
                value={home.resumeSection.heading}
                onChange={(event) =>
                  applyDraftUpdate(
                    ["home", "resumeSection", "heading"],
                    () => event.target.value
                  )
                }
              />
            </label>
            <label>
              Background Image
              <input
                type="text"
                value={home.resumeSection.backgroundImage}
                onChange={(event) =>
                  applyDraftUpdate(
                    ["home", "resumeSection", "backgroundImage"],
                    () => event.target.value
                  )
                }
              />
            </label>
            <label className="admin-form__full">
              Summary
              <textarea
                rows="5"
                value={home.resumeSection.body}
                onChange={(event) =>
                  applyDraftUpdate(
                    ["home", "resumeSection", "body"],
                    () => event.target.value
                  )
                }
              />
            </label>
            <label>
              Button Label
              <input
                type="text"
                value={home.resumeSection.buttonLabel}
                onChange={(event) =>
                  applyDraftUpdate(
                    ["home", "resumeSection", "buttonLabel"],
                    () => event.target.value
                  )
                }
              />
            </label>
            <label>
              Button URL
              <input
                type="url"
                value={home.resumeSection.buttonUrl}
                onChange={(event) =>
                  applyDraftUpdate(
                    ["home", "resumeSection", "buttonUrl"],
                    () => event.target.value
                  )
                }
              />
            </label>
          </div>
        </div>

        <div className="admin-subsection">
          <h3>GitHub CTA</h3>
          <div className="admin-form admin-form--two-col">
            <label>
              Heading Prefix
              <input
                type="text"
                value={home.githubSection.headingPrefix}
                onChange={(event) =>
                  applyDraftUpdate(
                    ["home", "githubSection", "headingPrefix"],
                    () => event.target.value
                  )
                }
              />
            </label>
            <label>
              Background Image
              <input
                type="text"
                value={home.githubSection.backgroundImage}
                onChange={(event) =>
                  applyDraftUpdate(
                    ["home", "githubSection", "backgroundImage"],
                    () => event.target.value
                  )
                }
              />
            </label>
            <label>
              Button Label
              <input
                type="text"
                value={home.githubSection.buttonLabel}
                onChange={(event) =>
                  applyDraftUpdate(
                    ["home", "githubSection", "buttonLabel"],
                    () => event.target.value
                  )
                }
              />
            </label>
            <label>
              Button URL
              <input
                type="url"
                value={home.githubSection.buttonUrl}
                onChange={(event) =>
                  applyDraftUpdate(
                    ["home", "githubSection", "buttonUrl"],
                    () => event.target.value
                  )
                }
              />
            </label>
            <label className="admin-form__full">
              Body
              <input
                type="text"
                value={home.githubSection.body}
                onChange={(event) =>
                  applyDraftUpdate(
                    ["home", "githubSection", "body"],
                    () => event.target.value
                  )
                }
              />
            </label>
          </div>
        </div>
      </section>
    );
  };

  const renderAboutPane = () => {
    const about = draftContent.about;
    return (
      <section className="admin-card">
        <h2>About</h2>
        <div className="admin-form admin-form--two-col">
          <label>
            Heading
            <input
              type="text"
              value={about.heading}
              onChange={(event) =>
                applyDraftUpdate(["about", "heading"], () => event.target.value)
              }
            />
          </label>
          <label>
            Skills Heading
            <input
              type="text"
              value={about.skillsHeading}
              onChange={(event) =>
                applyDraftUpdate(["about", "skillsHeading"], () => event.target.value)
              }
            />
          </label>
          <label className="admin-form__full">
            Paragraphs
            <textarea
              rows="10"
              value={joinParagraphs(about.paragraphs)}
              onChange={(event) =>
                applyDraftUpdate(["about", "paragraphs"], () =>
                  splitParagraphs(event.target.value)
                )
              }
            />
          </label>
        </div>

        <div className="admin-subsection">
          <div className="admin-subsection__head">
            <h3>Skill Bars</h3>
            <button
              className="admin-btn admin-btn--primary"
              type="button"
              onClick={() =>
                applyDraftUpdate(["about", "skills"], (items) => [
                  ...items,
                  createSkill()
                ])
              }
            >
              Add Skill
            </button>
          </div>
          <div className="admin-repeater">
            {about.skills.map((item, index) => (
              <article className="admin-repeater__item" key={`skill-${index}`}>
                <div className="admin-form admin-form--two-col">
                  <label>
                    Label
                    <input
                      type="text"
                      value={item.label}
                      onChange={(event) =>
                        applyDraftUpdate(["about", "skills"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, label: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                  <label>
                    Percent
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={item.percent}
                      onChange={(event) =>
                        applyDraftUpdate(["about", "skills"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? {
                                  ...entry,
                                  percent: Number(event.target.value || 0)
                                }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                </div>
                <RepeaterActions
                  index={index}
                  length={about.skills.length}
                  onMove={(itemIndex, direction) =>
                    applyDraftUpdate(["about", "skills"], (items) =>
                      moveItem(items, itemIndex, direction)
                    )
                  }
                  onRemove={(itemIndex) =>
                    applyDraftUpdate(["about", "skills"], (items) =>
                      items.filter((_, entryIndex) => entryIndex !== itemIndex)
                    )
                  }
                />
              </article>
            ))}
          </div>
        </div>

        <div className="admin-subsection">
          <div className="admin-subsection__head">
            <h3>Info Rows</h3>
            <button
              className="admin-btn admin-btn--primary"
              type="button"
              onClick={() =>
                applyDraftUpdate(["about", "info"], (items) => [
                  ...items,
                  createInfoItem()
                ])
              }
            >
              Add Row
            </button>
          </div>
          <div className="admin-repeater">
            {about.info.map((item, index) => (
              <article className="admin-repeater__item" key={`info-${index}`}>
                <div className="admin-form admin-form--two-col">
                  <label>
                    Label
                    <input
                      type="text"
                      value={item.label}
                      onChange={(event) =>
                        applyDraftUpdate(["about", "info"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, label: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                  <label>
                    Value
                    <input
                      type="text"
                      value={item.value}
                      onChange={(event) =>
                        applyDraftUpdate(["about", "info"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, value: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                </div>
                <RepeaterActions
                  index={index}
                  length={about.info.length}
                  onMove={(itemIndex, direction) =>
                    applyDraftUpdate(["about", "info"], (items) =>
                      moveItem(items, itemIndex, direction)
                    )
                  }
                  onRemove={(itemIndex) =>
                    applyDraftUpdate(["about", "info"], (items) =>
                      items.filter((_, entryIndex) => entryIndex !== itemIndex)
                    )
                  }
                />
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderExperiencePane = () => {
    const experience = draftContent.experience;
    return (
      <section className="admin-card">
        <h2>Experience</h2>
        <div className="admin-form admin-form--two-col">
          <label>
            Heading
            <input
              type="text"
              value={experience.heading}
              onChange={(event) =>
                applyDraftUpdate(["experience", "heading"], () => event.target.value)
              }
            />
          </label>
          <label>
            Background Image
            <input
              type="text"
              value={experience.backgroundImage}
              onChange={(event) =>
                applyDraftUpdate(
                  ["experience", "backgroundImage"],
                  () => event.target.value
                )
              }
            />
          </label>
        </div>

        <div className="admin-subsection">
          <div className="admin-subsection__head">
            <h3>Experience Cards</h3>
            <button
              className="admin-btn admin-btn--primary"
              type="button"
              onClick={() =>
                applyDraftUpdate(["experience", "items"], (items) => [
                  ...items,
                  createExperienceItem()
                ])
              }
            >
              Add Experience
            </button>
          </div>
          <div className="admin-repeater">
            {experience.items.map((item, index) => (
              <article className="admin-repeater__item" key={`experience-${index}`}>
                <div className="admin-form admin-form--two-col">
                  <label>
                    Date
                    <input
                      type="text"
                      value={item.date}
                      onChange={(event) =>
                        applyDraftUpdate(["experience", "items"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, date: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                  <label>
                    Title
                    <input
                      type="text"
                      value={item.title}
                      onChange={(event) =>
                        applyDraftUpdate(["experience", "items"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, title: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                  <label className="admin-form__full">
                    Company
                    <input
                      type="text"
                      value={item.company}
                      onChange={(event) =>
                        applyDraftUpdate(["experience", "items"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, company: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                  <label className="admin-form__full">
                    Bullet Points
                    <textarea
                      rows="6"
                      value={joinLines(item.bullets)}
                      onChange={(event) =>
                        applyDraftUpdate(["experience", "items"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? {
                                  ...entry,
                                  bullets: splitLines(event.target.value)
                                }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                </div>
                <RepeaterActions
                  index={index}
                  length={experience.items.length}
                  onMove={(itemIndex, direction) =>
                    applyDraftUpdate(["experience", "items"], (items) =>
                      moveItem(items, itemIndex, direction)
                    )
                  }
                  onRemove={(itemIndex) =>
                    applyDraftUpdate(["experience", "items"], (items) =>
                      items.filter((_, entryIndex) => entryIndex !== itemIndex)
                    )
                  }
                />
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderProjectsPane = () => {
    const projects = draftContent.projects;
    return (
      <section className="admin-card">
        <h2>Projects</h2>
        <div className="admin-form admin-form--two-col">
          <label>
            Heading
            <input
              type="text"
              value={projects.heading}
              onChange={(event) =>
                applyDraftUpdate(["projects", "heading"], () => event.target.value)
              }
            />
          </label>
          <label>
            Background Image
            <input
              type="text"
              value={projects.backgroundImage}
              onChange={(event) =>
                applyDraftUpdate(
                  ["projects", "backgroundImage"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label>
            More Button Label
            <input
              type="text"
              value={projects.moreButtonLabel}
              onChange={(event) =>
                applyDraftUpdate(
                  ["projects", "moreButtonLabel"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label>
            More Button URL
            <input
              type="url"
              value={projects.moreButtonUrl}
              onChange={(event) =>
                applyDraftUpdate(
                  ["projects", "moreButtonUrl"],
                  () => event.target.value
                )
              }
            />
          </label>
        </div>

        <div className="admin-subsection">
          <div className="admin-subsection__head">
            <h3>Project Cards</h3>
            <button
              className="admin-btn admin-btn--primary"
              type="button"
              onClick={() =>
                applyDraftUpdate(["projects", "items"], (items) => [
                  ...items,
                  createProjectItem()
                ])
              }
            >
              Add Project
            </button>
          </div>
          <div className="admin-repeater">
            {projects.items.map((item, index) => (
              <article className="admin-repeater__item" key={`project-${index}`}>
                <div className="admin-form admin-form--two-col">
                  <label>
                    Year
                    <input
                      type="text"
                      value={item.year}
                      onChange={(event) =>
                        applyDraftUpdate(["projects", "items"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, year: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                  <label>
                    Title
                    <input
                      type="text"
                      value={item.title}
                      onChange={(event) =>
                        applyDraftUpdate(["projects", "items"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, title: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                  <label>
                    Subtitle
                    <input
                      type="text"
                      value={item.subtitle}
                      onChange={(event) =>
                        applyDraftUpdate(["projects", "items"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, subtitle: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                  <label>
                    Link
                    <input
                      type="url"
                      value={item.link}
                      onChange={(event) =>
                        applyDraftUpdate(["projects", "items"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, link: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                </div>
                <RepeaterActions
                  index={index}
                  length={projects.items.length}
                  onMove={(itemIndex, direction) =>
                    applyDraftUpdate(["projects", "items"], (items) =>
                      moveItem(items, itemIndex, direction)
                    )
                  }
                  onRemove={(itemIndex) =>
                    applyDraftUpdate(["projects", "items"], (items) =>
                      items.filter((_, entryIndex) => entryIndex !== itemIndex)
                    )
                  }
                />
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderEducationPane = () => {
    const education = draftContent.education;
    return (
      <section className="admin-card">
        <h2>Education + Certifications</h2>
        <div className="admin-form admin-form--two-col">
          <label>
            Education Heading
            <input
              type="text"
              value={education.heading}
              onChange={(event) =>
                applyDraftUpdate(["education", "heading"], () => event.target.value)
              }
            />
          </label>
          <label>
            Certifications Heading
            <input
              type="text"
              value={education.certificationsHeading}
              onChange={(event) =>
                applyDraftUpdate(
                  ["education", "certificationsHeading"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label>
            Certifications Background
            <input
              type="text"
              value={education.certificationsBackgroundImage}
              onChange={(event) =>
                applyDraftUpdate(
                  ["education", "certificationsBackgroundImage"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label>
            Resume Button Label
            <input
              type="text"
              value={education.resumeButtonLabel}
              onChange={(event) =>
                applyDraftUpdate(
                  ["education", "resumeButtonLabel"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label className="admin-form__full">
            Resume Button URL
            <input
              type="url"
              value={education.resumeButtonUrl}
              onChange={(event) =>
                applyDraftUpdate(
                  ["education", "resumeButtonUrl"],
                  () => event.target.value
                )
              }
            />
          </label>
        </div>

        <div className="admin-subsection">
          <div className="admin-subsection__head">
            <h3>Education Cards</h3>
            <button
              className="admin-btn admin-btn--primary"
              type="button"
              onClick={() =>
                applyDraftUpdate(["education", "items"], (items) => [
                  ...items,
                  createEducationItem()
                ])
              }
            >
              Add Education
            </button>
          </div>
          <div className="admin-repeater">
            {education.items.map((item, index) => (
              <article className="admin-repeater__item" key={`education-${index}`}>
                <div className="admin-form admin-form--two-col">
                  <label>
                    Date
                    <input
                      type="text"
                      value={item.date}
                      onChange={(event) =>
                        applyDraftUpdate(["education", "items"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, date: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                  <label>
                    Title
                    <input
                      type="text"
                      value={item.title}
                      onChange={(event) =>
                        applyDraftUpdate(["education", "items"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, title: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                  <label>
                    Institution
                    <input
                      type="text"
                      value={item.institution}
                      onChange={(event) =>
                        applyDraftUpdate(["education", "items"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, institution: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                  <label>
                    Detail
                    <input
                      type="text"
                      value={item.detail}
                      onChange={(event) =>
                        applyDraftUpdate(["education", "items"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, detail: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                </div>
                <RepeaterActions
                  index={index}
                  length={education.items.length}
                  onMove={(itemIndex, direction) =>
                    applyDraftUpdate(["education", "items"], (items) =>
                      moveItem(items, itemIndex, direction)
                    )
                  }
                  onRemove={(itemIndex) =>
                    applyDraftUpdate(["education", "items"], (items) =>
                      items.filter((_, entryIndex) => entryIndex !== itemIndex)
                    )
                  }
                />
              </article>
            ))}
          </div>
        </div>

        <div className="admin-subsection">
          <div className="admin-subsection__head">
            <h3>Certification Cards</h3>
            <button
              className="admin-btn admin-btn--primary"
              type="button"
              onClick={() =>
                applyDraftUpdate(["education", "certifications"], (items) => [
                  ...items,
                  createCertification()
                ])
              }
            >
              Add Certification
            </button>
          </div>
          <div className="admin-repeater">
            {education.certifications.map((item, index) => (
              <article className="admin-repeater__item" key={`certification-${index}`}>
                <div className="admin-form admin-form--two-col">
                  <label>
                    Title
                    <input
                      type="text"
                      value={item.title}
                      onChange={(event) =>
                        applyDraftUpdate(["education", "certifications"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, title: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                  <label>
                    Image Path
                    <input
                      type="text"
                      value={item.imagePath}
                      onChange={(event) =>
                        applyDraftUpdate(["education", "certifications"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, imagePath: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                  <label className="admin-form__full">
                    Link
                    <input
                      type="url"
                      value={item.link}
                      onChange={(event) =>
                        applyDraftUpdate(["education", "certifications"], (items) =>
                          items.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, link: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </label>
                </div>
                <RepeaterActions
                  index={index}
                  length={education.certifications.length}
                  onMove={(itemIndex, direction) =>
                    applyDraftUpdate(["education", "certifications"], (items) =>
                      moveItem(items, itemIndex, direction)
                    )
                  }
                  onRemove={(itemIndex) =>
                    applyDraftUpdate(["education", "certifications"], (items) =>
                      items.filter((_, entryIndex) => entryIndex !== itemIndex)
                    )
                  }
                />
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderContactPane = () => {
    const contact = draftContent.home.contactSection;
    const meta = draftContent.meta;
    return (
      <section className="admin-card">
        <h2>Contact + Settings</h2>
        <div className="admin-form admin-form--two-col">
          <label>
            Site Title
            <input
              type="text"
              value={meta.siteTitle}
              onChange={(event) =>
                applyDraftUpdate(["meta", "siteTitle"], () => event.target.value)
              }
            />
          </label>
          <label>
            Owner Name
            <input
              type="text"
              value={meta.ownerName}
              onChange={(event) =>
                applyDraftUpdate(["meta", "ownerName"], () => event.target.value)
              }
            />
          </label>
          <label className="admin-form__full">
            Brand Icon Path
            <input
              type="text"
              value={meta.brandIconPath}
              onChange={(event) =>
                applyDraftUpdate(["meta", "brandIconPath"], () => event.target.value)
              }
            />
          </label>
          <label>
            Contact Heading
            <input
              type="text"
              value={contact.heading}
              onChange={(event) =>
                applyDraftUpdate(
                  ["home", "contactSection", "heading"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label>
            Contact Note
            <input
              type="text"
              value={contact.note}
              onChange={(event) =>
                applyDraftUpdate(
                  ["home", "contactSection", "note"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label>
            Form Heading
            <input
              type="text"
              value={contact.formHeading}
              onChange={(event) =>
                applyDraftUpdate(
                  ["home", "contactSection", "formHeading"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label>
            Submit Button Label
            <input
              type="text"
              value={contact.formSubmitLabel}
              onChange={(event) =>
                applyDraftUpdate(
                  ["home", "contactSection", "formSubmitLabel"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label className="admin-form__full">
            Web3Forms Access Key
            <input
              type="text"
              value={contact.web3formsAccessKey}
              onChange={(event) =>
                applyDraftUpdate(
                  ["home", "contactSection", "web3formsAccessKey"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label className="admin-form__full">
            Social Intro
            <input
              type="text"
              value={contact.socialIntro}
              onChange={(event) =>
                applyDraftUpdate(
                  ["home", "contactSection", "socialIntro"],
                  () => event.target.value
                )
              }
            />
          </label>
        </div>

        <div className="admin-subsection">
          <div className="admin-subsection__head">
            <h3>Contact Cards</h3>
            <button
              className="admin-btn admin-btn--primary"
              type="button"
              onClick={() =>
                applyDraftUpdate(["home", "contactSection", "cards"], (items) => [
                  ...items,
                  createContactCard()
                ])
              }
            >
              Add Card
            </button>
          </div>
          <div className="admin-repeater">
            {contact.cards.map((item, index) => (
              <article className="admin-repeater__item" key={`contact-card-${index}`}>
                <div className="admin-form admin-form--two-col">
                  <label>
                    Title
                    <input
                      type="text"
                      value={item.title}
                      onChange={(event) =>
                        applyDraftUpdate(
                          ["home", "contactSection", "cards"],
                          (items) =>
                            items.map((entry, entryIndex) =>
                              entryIndex === index
                                ? { ...entry, title: event.target.value }
                                : entry
                            )
                        )
                      }
                    />
                  </label>
                  <label>
                    Icon Class
                    <input
                      type="text"
                      value={item.iconClass}
                      onChange={(event) =>
                        applyDraftUpdate(
                          ["home", "contactSection", "cards"],
                          (items) =>
                            items.map((entry, entryIndex) =>
                              entryIndex === index
                                ? { ...entry, iconClass: event.target.value }
                                : entry
                            )
                        )
                      }
                    />
                  </label>
                  <label>
                    Value
                    <input
                      type="text"
                      value={item.value}
                      onChange={(event) =>
                        applyDraftUpdate(
                          ["home", "contactSection", "cards"],
                          (items) =>
                            items.map((entry, entryIndex) =>
                              entryIndex === index
                                ? { ...entry, value: event.target.value }
                                : entry
                            )
                        )
                      }
                    />
                  </label>
                  <label>
                    Card Type
                    <select
                      value={item.type}
                      onChange={(event) =>
                        applyDraftUpdate(
                          ["home", "contactSection", "cards"],
                          (items) =>
                            items.map((entry, entryIndex) =>
                              entryIndex === index
                                ? { ...entry, type: event.target.value }
                                : entry
                            )
                        )
                      }
                    >
                      <option value="text">Text</option>
                      <option value="link">Link</option>
                    </select>
                  </label>
                  <label className="admin-form__full">
                    Link URL
                    <input
                      type="url"
                      value={item.href}
                      onChange={(event) =>
                        applyDraftUpdate(
                          ["home", "contactSection", "cards"],
                          (items) =>
                            items.map((entry, entryIndex) =>
                              entryIndex === index
                                ? { ...entry, href: event.target.value }
                                : entry
                            )
                        )
                      }
                    />
                  </label>
                </div>
                <RepeaterActions
                  index={index}
                  length={contact.cards.length}
                  onMove={(itemIndex, direction) =>
                    applyDraftUpdate(["home", "contactSection", "cards"], (items) =>
                      moveItem(items, itemIndex, direction)
                    )
                  }
                  onRemove={(itemIndex) =>
                    applyDraftUpdate(["home", "contactSection", "cards"], (items) =>
                      items.filter((_, entryIndex) => entryIndex !== itemIndex)
                    )
                  }
                />
              </article>
            ))}
          </div>
        </div>

        <div className="admin-subsection">
          <div className="admin-subsection__head">
            <h3>Social Links</h3>
            <button
              className="admin-btn admin-btn--primary"
              type="button"
              onClick={() =>
                applyDraftUpdate(
                  ["home", "contactSection", "socialLinks"],
                  (items) => [...items, createSocialLink()]
                )
              }
            >
              Add Social Link
            </button>
          </div>
          <div className="admin-repeater">
            {contact.socialLinks.map((item, index) => (
              <article className="admin-repeater__item" key={`social-${index}`}>
                <div className="admin-form admin-form--two-col">
                  <label>
                    Label
                    <input
                      type="text"
                      value={item.label}
                      onChange={(event) =>
                        applyDraftUpdate(
                          ["home", "contactSection", "socialLinks"],
                          (items) =>
                            items.map((entry, entryIndex) =>
                              entryIndex === index
                                ? { ...entry, label: event.target.value }
                                : entry
                            )
                        )
                      }
                    />
                  </label>
                  <label>
                    Icon Class
                    <input
                      type="text"
                      value={item.iconClass}
                      onChange={(event) =>
                        applyDraftUpdate(
                          ["home", "contactSection", "socialLinks"],
                          (items) =>
                            items.map((entry, entryIndex) =>
                              entryIndex === index
                                ? { ...entry, iconClass: event.target.value }
                                : entry
                            )
                        )
                      }
                    />
                  </label>
                  <label className="admin-form__full">
                    URL
                    <input
                      type="url"
                      value={item.href}
                      onChange={(event) =>
                        applyDraftUpdate(
                          ["home", "contactSection", "socialLinks"],
                          (items) =>
                            items.map((entry, entryIndex) =>
                              entryIndex === index
                                ? { ...entry, href: event.target.value }
                                : entry
                            )
                        )
                      }
                    />
                  </label>
                </div>
                <RepeaterActions
                  index={index}
                  length={contact.socialLinks.length}
                  onMove={(itemIndex, direction) =>
                    applyDraftUpdate(
                      ["home", "contactSection", "socialLinks"],
                      (items) => moveItem(items, itemIndex, direction)
                    )
                  }
                  onRemove={(itemIndex) =>
                    applyDraftUpdate(
                      ["home", "contactSection", "socialLinks"],
                      (items) =>
                        items.filter((_, entryIndex) => entryIndex !== itemIndex)
                    )
                  }
                />
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderPublishPane = () => {
    const githubPages = draftContent.meta.githubPages;
    return (
      <section className="admin-card">
        <h2>Publish</h2>
        <p className="admin-muted">
          This admin console is GitHub Pages compatible: drafts are stored in your
          browser, and publishing commits the JSON content file back to GitHub.
        </p>

        <div className="admin-form admin-form--two-col">
          <label>
            GitHub Owner
            <input
              type="text"
              value={githubPages.owner}
              onChange={(event) =>
                applyDraftUpdate(
                  ["meta", "githubPages", "owner"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label>
            Repository
            <input
              type="text"
              value={githubPages.repo}
              onChange={(event) =>
                applyDraftUpdate(
                  ["meta", "githubPages", "repo"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label>
            Branch
            <input
              type="text"
              value={githubPages.branch}
              onChange={(event) =>
                applyDraftUpdate(
                  ["meta", "githubPages", "branch"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label>
            Content Path
            <input
              type="text"
              value={githubPages.contentPath}
              onChange={(event) =>
                applyDraftUpdate(
                  ["meta", "githubPages", "contentPath"],
                  () => event.target.value
                )
              }
            />
          </label>
          <label className="admin-form__full">
            Commit Message
            <input
              type="text"
              value={publishMessage}
              onChange={(event) => setPublishMessage(event.target.value)}
            />
          </label>
          <label className="admin-form__full">
            GitHub Token
            <input
              type="password"
              value={publishToken}
              onChange={(event) => setPublishToken(event.target.value)}
              placeholder="Fine-grained PAT with repository contents write access"
            />
          </label>
        </div>

        <div className="admin-actions">
          <button className="admin-btn admin-btn--primary" type="button" onClick={handleSaveDraft}>
            Save Draft
          </button>
          <button className="admin-btn admin-btn--ghost" type="button" onClick={handleExport}>
            Export JSON
          </button>
          <button
            className="admin-btn admin-btn--primary"
            type="button"
            onClick={handlePublish}
            disabled={publishBusy}
          >
            {publishBusy ? "Publishing..." : "Publish to GitHub"}
          </button>
          <button className="admin-btn admin-btn--danger" type="button" onClick={handleReset}>
            Reset to Published
          </button>
        </div>

        {publishResult?.commitUrl ? (
          <p className="admin-muted">
            Latest commit:{" "}
            <a href={publishResult.commitUrl} target="_blank" rel="noreferrer">
              {publishResult.commitSha.slice(0, 7)}
            </a>
          </p>
        ) : null}

        <div className="admin-subsection">
          <h3>Import Content</h3>
          <div className="admin-form">
            <label>
              Upload JSON File
              <input type="file" accept="application/json" onChange={handleImportFromFile} />
            </label>
            <label>
              Paste JSON
              <textarea
                rows="10"
                value={importText}
                onChange={(event) => setImportText(event.target.value)}
              />
            </label>
            <div className="admin-actions">
              <button
                className="admin-btn admin-btn--ghost"
                type="button"
                onClick={handleImportFromText}
              >
                Import From Text
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderPane = () => {
    switch (activePane) {
      case "home":
        return renderHomePane();
      case "about":
        return renderAboutPane();
      case "experience":
        return renderExperiencePane();
      case "projects":
        return renderProjectsPane();
      case "education":
        return renderEducationPane();
      case "contact":
        return renderContactPane();
      case "publish":
        return renderPublishPane();
      default:
        return null;
    }
  };

  return (
    <section className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">Owner Console</p>
          <h1>portfolio-sec-3d admin</h1>
          <p className="admin-muted">
            Drafts stay local until you publish them to GitHub.
          </p>
        </div>
        <div className="admin-actions">
          <button className="admin-btn admin-btn--primary" type="button" onClick={handleSaveDraft}>
            Save Draft
          </button>
          <Link className="admin-btn admin-btn--ghost" to="/">
            Back to site
          </Link>
        </div>
      </header>

      <Notice message={statusMessage} />
      <Notice message={statusError} isError />

      <div className="admin-layout">
        <aside className="admin-sidebar" aria-label="Admin sections">
          {PANE_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`admin-sidebar__item${
                activePane === item.id ? " is-active" : ""
              }`}
              type="button"
              onClick={() => setActivePane(item.id)}
            >
              {item.label}
            </button>
          ))}
        </aside>

        <div className="admin-main">{renderPane()}</div>
      </div>
    </section>
  );
}
