import { resolveAssetUrl } from "../siteContent";

export default function Experience({ siteContent }) {
  const experience = siteContent.experience;

  return (
    <div className="starry-background">
      <br />
      <section className="ftco-section ftco-no-pb" id="experience-section">
        <div className="container">
          <div
            className="ftco-section ftco-hireme img margin-top"
            style={{
              backgroundImage: `url('${resolveAssetUrl(experience.backgroundImage)}')`
            }}
          ></div>
          <div className="row justify-content-center pb-5">
            <div className="col-md-10 heading-section text-center ftco-animate">
              <h1 className="big big-2">{experience.heading}</h1>
              <h2 className="mb-4">{experience.heading}</h2>
              <br />
              <div className="row">
                <br />
                <br />
                <div className="row">
                  {experience.items.map((item) => (
                    <div className="col-md-6 project-tile" key={`${item.date}-${item.title}`}>
                      <div className="resume-wrap ftco-animate">
                        <span className="date">{item.date}</span>
                        <h3>{item.title}</h3>
                        <span className="position">{item.company}</span>
                        <ul className="mt-4">
                          {item.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
