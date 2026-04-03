export default function About({ siteContent }) {
  const about = siteContent.about;

  return (
    <div className="starry-background">
      <section className="ftco-section ftco-no-pb" id="about-section">
        <div className="container-fluid px-4 px-lg-5">
          <div className="row justify-content-center pb-5">
            <div className="col-md-10 heading-section text-center ftco-animate">
              <h1 className="big big-2">About</h1>
              <h2 className="mb-4">{about.heading}</h2>
              <br />
              <br />
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-11 col-xl-10">
              <div className="row align-items-start">
                <div className="col-md-5 mb-5">
                  <div className="p-3 bg-dark text-white rounded shadow">
                    <h4 className="mb-3 text-center">{about.skillsHeading}</h4>
                    <div className="skill-mf">
                      {about.skills.map((skill) => (
                        <div key={skill.label}>
                          <span>{skill.label}</span>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{ width: `${skill.percent}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-md-7">
                  <div className="p-3 text-white rounded">
                    {about.paragraphs.map((paragraph) => (
                      <p key={paragraph} style={{ textAlign: "justify" }}>
                        {paragraph}
                      </p>
                    ))}

                    <ul className="about-info mt-4 px-md-0 px-2">
                      {about.info.map((item) => (
                        <li className="d-flex mb-2" key={item.label}>
                          <strong className="me-2 w-25 text-success">
                            {item.label}:
                          </strong>
                          <span>{item.value}</span>
                        </li>
                      ))}
                    </ul>
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
