import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { resolveAssetUrl } from "../siteContent";

export default function Home({ siteContent }) {
  const home = siteContent.home;
  const contact = home.contactSection;
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const element = document.getElementById("typing-animation");
    if (!element) {
      return;
    }

    const text = `${home.typingText || ""}     `;
    let index = 0;
    let timeoutId;
    let cancelled = false;

    const type = () => {
      if (cancelled) {
        return;
      }
      element.textContent = text.slice(0, index + 1);
      index += 1;
      if (index < text.length) {
        timeoutId = setTimeout(type, 10);
      } else {
        timeoutId = setTimeout(() => {
          index = 0;
          element.textContent = "";
          type();
        }, 5000);
      }
    };

    type();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [home.typingText]);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 280);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroBackground = resolveAssetUrl(home.heroBackgroundImage);
  const heroPortrait = resolveAssetUrl(home.heroPortraitImage);
  const resumeBackground = resolveAssetUrl(home.resumeSection.backgroundImage);
  const githubBackground = resolveAssetUrl(home.githubSection.backgroundImage);

  return (
    <>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        style={{
          position: "fixed",
          right: "24px",
          bottom: "24px",
          width: "46px",
          height: "46px",
          borderRadius: "50%",
          background: "transparent",
          border: "2px solid rgba(64, 170, 255, 1)",
          color: "rgba(64, 170, 255, 1)",
          fontSize: "20px",
          fontWeight: 600,
          cursor: "pointer",
          opacity: showScrollTop ? 1 : 0,
          pointerEvents: showScrollTop ? "auto" : "none",
          transform: showScrollTop ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          boxShadow:
            "0 0 8px rgba(64, 170, 255, 0.35), 0 0 16px rgba(64, 170, 255, 0.2)",
          zIndex: 60
        }}
      >
        {"\u2191"}
      </button>
      <div
        className="ftco-section ftco-hireme img margin-top"
        style={{
          background: `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 10%), url('${heroBackground}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          position: "relative",
          zIndex: 0
        }}
      >
        <section
          id="home-section"
          className="hero"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-md-6 d-flex flex-column justify-content-center">
                <span className="subheading" style={{ fontWeight: "bold" }}>
                  {home.greeting}
                </span>
                <h1 className="mb-4 mt-3">
                  {home.headlinePrefix} <span>{home.headlineName}</span>
                </h1>

                <span id="typing-animation"></span>

                <div className="mt-4">
                  <a
                    href={home.primaryButtonUrl}
                    className="btn btn-success py-3 px-4 mr-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {home.primaryButtonLabel}
                  </a>
                  <a
                    href={home.secondaryButtonUrl}
                    className="btn btn-dark py-3 px-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {home.secondaryButtonLabel}
                  </a>
                </div>
              </div>

              <div
                id="bg-img-col"
                className="col-md-6 scroll-animate"
                style={{
                  backgroundImage: `url('${heroPortrait}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "500px",
                  pointerEvents: "none"
                }}
              ></div>
            </div>
          </div>
        </section>
      </div>

      <div className="binary-bg-container starry-background" style={{ position: "relative" }}>
        <section className="ftco-section ftco-no-pb" id="quick-links-section">
          <div className="container">
            <div className="row justify-content-center pb-5">
              <div className="col-md-10 heading-section text-center ftco-animate">
                <h1 className="big big-2">Navigate</h1>
                <h2 className="mb-4">{home.quickLinksHeading}</h2>
                <br />
              </div>
            </div>

            <div className="row">
              {home.quickLinks.map((item) => (
                <div className="col-md-6 col-lg-3 project-tile" key={item.to || item.label}>
                  <Link to={item.to} className="text-decoration-none">
                    <div className="resume-wrap ftco-animate text-center">
                      <h4>{item.label}</h4>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div id="gaming-interaction-hint">
            <span>{home.gamingHintText}</span>
            <div className="arrow">{"\u2193"}</div>
          </div>
          <div
            className="container d-flex justify-content-center align-items-center"
            style={{ padding: "10px 0" }}
          >
            <div className="text-center">
              <div id="progress-container-gaming" className="mb-3">
                <div id="progress">Loading Gaming Setup...</div>
              </div>
              <div id="gaming-model-container"></div>
            </div>
          </div>
        </section>
      </div>

      <br />
      <br />

      <div className="starry-background">
        <section className="ftco-section ftco-no-pb" id="resume-section">
          <div className="container">
            <div
              className="ftco-section ftco-hireme img margin-top"
              style={{ backgroundImage: `url('${resumeBackground}')` }}
            ></div>
            <div className="row justify-content-center pb-5">
              <div className="col-md-10 heading-section text-center ftco-animate">
                <h1 className="big big-2">{home.resumeSection.heading}</h1>
                <h2 className="mb-4">{home.resumeSection.heading}</h2>
                <br />
                <br />
                <p>{home.resumeSection.body}</p>
              </div>
            </div>
            <div className="counter-wrap ftco-animate d-flex mt-md-3 justify-content-center">
              <div className="text">
                <p>
                  <a
                    href={home.resumeSection.buttonUrl}
                    className="btn btn-success py-3 px-4"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {home.resumeSection.buttonLabel}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <br />
      <br />
      <br />

      <section
        className="ftco-section ftco-no-pt ftco-no-pb ftco-counter img"
        id="section-counter"
      >
        <div className="hid" style={{ visibility: "hidden" }}>
          <div className="container">
            <div className="row d-md-flex align-items-center">
              <div className="col-md d-flex justify-content-center counter-wrap ftco-animate">
                <div className="block-18">
                  <div className="text">
                    <strong className="number" data-number="20">
                      0
                    </strong>
                    <span>Achievements</span>
                  </div>
                </div>
              </div>
              <div className="col-md d-flex justify-content-center counter-wrap ftco-animate">
                <div className="block-18">
                  <div className="text">
                    <strong className="number" data-number="10">
                      0
                    </strong>
                    <span>Artworks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section ftco-no-pb" id="github-section">
        <div
          className="ftco-section ftco-hireme img margin-top"
          style={{
            backgroundImage: `url('${githubBackground}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            position: "relative",
            zIndex: 10
          }}
        >
          <div className="row justify-content-center">
            <div className="col-md-7 ftco-animate text-center">
              <h2>
                {home.githubSection.headingPrefix}{" "}
                <span>
                  <a
                    href={home.githubSection.buttonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-white py-3 px-4"
                  >
                    {home.githubSection.buttonLabel}
                  </a>
                </span>
              </h2>
              <div className="heading">
                <h4>{home.githubSection.body}</h4>
                <br />
              </div>
            </div>
          </div>
        </div>
      </section>

      <br />
      <br />
      <br />

      <div className="starry-background" data-shooting="true">
        <section
          className="ftco-section contact-section ftco-no-pb"
          id="contact-section"
        >
          <div className="container">
            <div className="row justify-content-center mb-5 pb-3">
              <div className="col-md-7 heading-section text-center ftco-animate">
                <h1 className="big big-2">Contact</h1>
                <h2 className="mb-4">{contact.heading}</h2>
                <br />
                <br />
                <p>{contact.note}</p>
              </div>
            </div>

            <div className="row d-flex contact-info mb-5">
              {contact.cards.map((card) => (
                <div
                  className="col-md-6 col-lg-3 d-flex ftco-animate"
                  key={`${card.title}-${card.value}`}
                >
                  <div className="align-self-stretch box p-4 text-center">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className={card.iconClass}></span>
                    </div>
                    <h3 className="mb-4">{card.title}</h3>
                    {card.type === "link" ? (
                      <a
                        className="contact-pill"
                        href={card.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {card.value}
                      </a>
                    ) : (
                      <div className="contact-pill">{card.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="ftco-section message-section ftco-no-pb"
          id="message-section"
        >
          <div className="container">
            <div className="row align-items-start">
              <div className="col-12 col-lg-6 ftco-animate order-lg-1">
                <h2 style={{ textAlign: "center" }}>{contact.formHeading}</h2>
                <div className="que" id="send-message">
                  <form action="https://formsubmit.co/contact@shubodaya.dev" method="POST">
                    <input type="hidden" name="_subject" value="3D security portfolio contact form" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_captcha" value="false" />
                    <div className="row gy-4 gy-xl-5 p-4 p-xl-5">
                      <div className="col-12">
                        <label htmlFor="fullname" className="form-label">
                          Full Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="fullname"
                          name="fullname"
                          required
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="email" className="form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-envelope"
                              viewBox="0 0 16 16"
                            >
                              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                            </svg>
                          </span>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="phone" className="form-label">
                          Phone Number
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-telephone"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                            </svg>
                          </span>
                          <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <label htmlFor="subject" className="form-label">
                          Subject <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          name="subject"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="message" className="form-label">
                          Message <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          id="message"
                          name="message"
                          rows="3"
                          required
                        ></textarea>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <br />
                          <button
                            className="btn btn-success py-3 px-5"
                            type="submit"
                          >
                            {contact.formSubmitLabel}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <ul className="ftco-footer-social list-unstyled d-flex justify-content-center align-items-center mt-4">
                  <li className="ftco-animate normal-txt">{contact.socialIntro}</li>
                  {contact.socialLinks.map((item) => (
                    <li className="ftco-animate" key={item.label}>
                      <a href={item.href} target="_blank" rel="noreferrer">
                        <span className={item.iconClass}></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-12 col-lg-6 ftco-animate order-lg-2">
                <div
                  id="model3-container"
                  style={{
                    width: "100%",
                    height: "520px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <div id="progress3-container" style={{ display: "none" }}>
                    <div id="progress">Loading Model...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
