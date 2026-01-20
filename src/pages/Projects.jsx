export default function Projects() {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <div className="starry-background">
      <br />
      <section className="ftco-section ftco-no-pb" id="projects-section">
        <div className="container">
          <div
            className="ftco-section ftco-hireme img margin-top"
            style={{ backgroundImage: `url('${baseUrl}images/serverblue.png')` }}
          ></div>
          <div className="row justify-content-center pb-5">
            <div className="col-md-10 heading-section text-center ftco-animate">
              <h1 className="big big-2">Projects</h1>
              <h2 className="mb-4">Projects</h2>
              <br />
              <br />

              <div className="d-flex flex-wrap justify-content-center">
                <div className="col-md-4 project-tile">
                  <a
                    href="https://github.com/shubodaya/HomeSOC"
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="resume-wrap ftco-animate">
                      <span className="date">2025</span>
                      <h3>Cloud based SOC lab</h3>
                      <span className="position">Personal Project</span>
                    </div>
                  </a>
                </div>

                <div className="col-md-4 project-tile">
                  <a
                    href="https://github.com/shubodaya/SD-Firewall-for-Automotive-Network"
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="resume-wrap ftco-animate">
                      <span className="date">2024</span>
                      <h3>SD Firewall for Automobiles</h3>
                      <span className="position">Masters Project</span>
                    </div>
                  </a>
                </div>

                <div className="col-md-4 project-tile">
                  <a
                    href="https://github.com/shubodaya/Dam-Safety-Control-System"
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="resume-wrap ftco-animate">
                      <span className="date">2024</span>
                      <h3>Dam Safety Control System</h3>
                      <span className="position">Maven Silicon</span>
                    </div>
                  </a>
                </div>

                <div className="col-md-4 project-tile">
                  <a
                    href="https://github.com/shubodaya/3D-Portfolio"
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="resume-wrap ftco-animate">
                      <span className="date">2023</span>
                      <h3>3D Portfolio Website</h3>
                      <span className="position">Personal Project</span>
                    </div>
                  </a>
                </div>

                <div className="col-md-4 project-tile">
                  <div className="resume-wrap ftco-animate">
                    <span className="date">2022</span>
                    <h3>Knowledge Based Articles</h3>
                    <span className="position">SonicWall</span>
                  </div>
                </div>

                <div className="col-md-4 project-tile">
                  <a
                    href="https://github.com/shubodaya/1x3-Router"
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="resume-wrap ftco-animate">
                      <span className="date">2021</span>
                      <h3>Router Design and Verification</h3>
                      <span className="position">Maven Silicon</span>
                    </div>
                  </a>
                </div>

                <div className="col-md-4 project-tile">
                  <a
                    href="https://github.com/shubodaya/Emergency-Activation-in-Automobiles-Using-IOT"
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="resume-wrap ftco-animate">
                      <span className="date">2020</span>
                      <h3>Emergency Activation in Automobiles</h3>
                      <span className="position">Bachelors Project</span>
                    </div>
                  </a>
                </div>

                <div className="d-flex justify-content-center mt-5">
                  <div className="col-md-6 text-center ftco-animate">
                    <p>
                      <a
                        href="https://github.com/shubodaya?tab=repositories"
                        className="btn btn-success py-4 px-5"
                      >
                        More Projects
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
