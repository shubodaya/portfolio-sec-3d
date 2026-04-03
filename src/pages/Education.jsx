import { resolveAssetUrl } from "../siteContent";

export default function Education({ siteContent }) {
  const education = siteContent.education;

  return (
    <div className="starry-background">
      <section className="ftco-section ftco-no-pb" id="education-section">
        <div className="container">
          <div className="row justify-content-center pb-5">
            <div className="col-md-10 heading-section text-center ftco-animate">
              <h1 className="big big-2">{education.heading}</h1>
              <h2 className="mb-4">{education.heading}</h2>
              <br />
              <br />
              <div className="row">
                {education.items.map((item) => (
                  <div className="col-md-4 project-tile" key={`${item.date}-${item.title}`}>
                    <div className="resume-wrap ftco-animate">
                      <span className="date">{item.date}</span>
                      <h3>{item.title}</h3>
                      <span className="position">{item.institution}</span>
                      <p className="mt-4">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <br />
              <br />
              <div
                className="ftco-section ftco-hireme img margin-top"
                style={{
                  backgroundImage: `url('${resolveAssetUrl(
                    education.certificationsBackgroundImage
                  )}')`
                }}
              ></div>

              <div className="row justify-content-center pb-5 mt-5">
                <div className="col-md-10 heading-section text-center ftco-animate">
                  <h1 className="big big-2">{education.certificationsHeading}</h1>
                  <h2 className="mb-4">{education.certificationsHeading}</h2>
                  <br />
                  <br />
                </div>
              </div>

              <div className="row">
                {education.certifications.map((item) => (
                  <div className="col-md-3 project-tile" key={item.title}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="resume-wrap ftco-animate text-center">
                        <img
                          src={resolveAssetUrl(item.imagePath)}
                          alt={item.title}
                          style={{ width: "60px", height: "auto", marginBottom: "10px" }}
                        />
                        <h5>{item.title}</h5>
                      </div>
                    </a>
                  </div>
                ))}
              </div>

              <div className="row justify-content-center mt-5">
                <div className="col-md-6 text-center ftco-animate">
                  <p>
                    <a
                      href={education.resumeButtonUrl}
                      className="btn btn-success py-4 px-5"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {education.resumeButtonLabel}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
