import { resolveAssetUrl } from "../siteContent";

export default function Projects({ siteContent }) {
  const projects = siteContent.projects;

  return (
    <div className="starry-background">
      <br />
      <section className="ftco-section ftco-no-pb" id="projects-section">
        <div className="container">
          <div
            className="ftco-section ftco-hireme img margin-top"
            style={{
              backgroundImage: `url('${resolveAssetUrl(projects.backgroundImage)}')`
            }}
          ></div>
          <div className="row justify-content-center pb-5">
            <div className="col-md-10 heading-section text-center ftco-animate">
              <h1 className="big big-2">{projects.heading}</h1>
              <h2 className="mb-4">{projects.heading}</h2>
              <br />
              <br />

              <div className="d-flex flex-wrap justify-content-center">
                {projects.items.map((item) => {
                  const card = (
                    <div className="resume-wrap ftco-animate">
                      <span className="date">{item.year}</span>
                      <h3>{item.title}</h3>
                      <span className="position">{item.subtitle}</span>
                    </div>
                  );

                  return (
                    <div className="col-md-4 project-tile" key={`${item.year}-${item.title}`}>
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {card}
                        </a>
                      ) : (
                        card
                      )}
                    </div>
                  );
                })}

                <div className="d-flex justify-content-center mt-5">
                  <div className="col-md-6 text-center ftco-animate">
                    <p>
                      <a
                        href={projects.moreButtonUrl}
                        className="btn btn-success py-4 px-5"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {projects.moreButtonLabel}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
