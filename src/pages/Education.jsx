export default function Education() {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <div className="starry-background">
      <section className="ftco-section ftco-no-pb" id="education-section">
        <div className="container">
        <div className="row justify-content-center pb-5">
          <div className="col-md-10 heading-section text-center ftco-animate">
            <h1 className="big big-2">Education</h1>
            <h2 className="mb-4">Education</h2>
            <br />
            <br />
            <div className="row">
              <div className="col-md-4 project-tile">
                <div className="resume-wrap ftco-animate">
                  <span className="date">2023-2024</span>
                  <h3>MSc in Cybersecurity</h3>
                  <span className="position">Swansea University</span>
                  <p className="mt-4">Grade: Distinction</p>
                </div>
              </div>

              <div className="col-md-4 project-tile">
                <div className="resume-wrap ftco-animate">
                  <span className="date">2016-2020</span>
                  <h3>BEng in Electronics and Communication</h3>
                  <span className="position">
                    Vidya Vardhaka College of Engineering
                  </span>
                  <p className="mt-4">Grade: First class distinction.</p>
                </div>
              </div>

              <div className="col-md-4 project-tile">
                <div className="resume-wrap ftco-animate">
                  <span className="date">2014-2016</span>
                  <h3>Higher Secondary School</h3>
                  <span className="position">
                    Expert Pre-University College (PCMB)
                  </span>
                  <p className="mt-4">Grade: First class distinction.</p>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div
              className="ftco-section ftco-hireme img margin-top"
              style={{ backgroundImage: `url('${baseUrl}images/server.png')` }}
            ></div>

            <div className="row justify-content-center pb-5 mt-5">
              <div className="col-md-10 heading-section text-center ftco-animate">
                <h1 className="big big-2">Certifications</h1>
                <h2 className="mb-4">Certifications</h2>
                <br />
                <br />
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 project-tile">
                <a
                  href="https://www.credly.com/badges/cbea159f-fb69-4035-bbb3-5e29eef4bcb7/linked_in_profile"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="resume-wrap ftco-animate text-center">
                    <img
                      src={`${baseUrl}images/networkplus.png`}
                      alt="Network+"
                      style={{ width: "60px", height: "auto", marginBottom: "10px" }}
                    />
                    <h5>CompTIA Network+</h5>
                  </div>
                </a>
              </div>

              <div className="col-md-3 project-tile">
                <a
                  href="https://www.credly.com/badges/9e429443-91ec-4a7e-8caf-f38af95632e5/linked_in_profile"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="resume-wrap ftco-animate text-center">
                    <img
                      src={`${baseUrl}images/securityplus.png`}
                      alt="Security+"
                      style={{ width: "60px", height: "auto", marginBottom: "10px" }}
                    />
                    <h5>CompTIA Security+</h5>
                  </div>
                </a>
              </div>

              <div className="col-md-3 project-tile">
                <a
                  href="https://www.credly.com/badges/f3e7e8c8-816a-4f31-8575-731e85366305/linked_in_profile"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="resume-wrap ftco-animate text-center">
                    <img
                      src={`${baseUrl}images/isc2.png`}
                      alt="ISC2"
                      style={{ width: "60px", height: "auto", marginBottom: "10px" }}
                    />
                    <h5>ISC2 Certified in Cybersecurity</h5>
                  </div>
                </a>
              </div>

              <div className="col-md-3 project-tile">
                <a
                  href="https://learn.microsoft.com/en-us/users/shubodaya-4297/credentials/dec154df18148fe2?ref=https%3A%2F%2Fwww.linkedin.com%2F"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="resume-wrap ftco-animate text-center">
                    <img
                      src={`${baseUrl}images/az900.png`}
                      alt="AZ-900"
                      style={{ width: "60px", height: "auto", marginBottom: "10px" }}
                    />
                    <h5>Microsoft AZ-900</h5>
                  </div>
                </a>
              </div>

              <div className="col-md-3 project-tile">
                <a
                  href="https://www.credly.com/badges/41d5a54b-7a6a-4c52-ae5e-e5d7bd06be7d/linked_in_profile"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="resume-wrap ftco-animate text-center">
                    <img
                      src={`${baseUrl}images/google-cybersecurity.png`}
                      alt="Google Cybersecurity"
                      style={{ width: "60px", height: "auto", marginBottom: "10px" }}
                    />
                    <h5>Google Cybersecurity Professional</h5>
                  </div>
                </a>
              </div>

              <div className="col-md-3 project-tile">
                <a
                  href="https://www.credly.com/badges/f92f11cf-31d7-4f18-84bf-9f013c2c97d5/linked_in_profile"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="resume-wrap ftco-animate text-center">
                    <img
                      src={`${baseUrl}images/google-it.png`}
                      alt="Google IT Support"
                      style={{ width: "60px", height: "auto", marginBottom: "10px" }}
                    />
                    <h5>Google IT Support Professional</h5>
                  </div>
                </a>
              </div>

              <div className="col-md-3 project-tile">
                <a
                  href="https://www.credly.com/badges/961ba799-7e07-4427-bbdc-30e12ee23089/linked_in_profile"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="resume-wrap ftco-animate text-center">
                    <img
                      src={`${baseUrl}images/python.png`}
                      alt="Google Python"
                      style={{ width: "60px", height: "auto", marginBottom: "10px" }}
                    />
                    <h5>Google IT Automation with Python</h5>
                  </div>
                </a>
              </div>
            </div>

            <div className="row justify-content-center mt-5">
              <div className="col-md-6 text-center ftco-animate">
                <p>
                  <a
                    href="https://docs.google.com/document/d/1eO-7W3Sl7e0KSYvtoZzb8vfDJgP5zD4JU41VVvzUFfM/edit?usp=sharing"
                    className="btn btn-success py-4 px-5"
                  >
                    Download Resume
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
