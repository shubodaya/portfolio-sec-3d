export default function Experience() {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <div className="starry-background">
      <br />
      <section className="ftco-section ftco-no-pb" id="experience-section">
        <div className="container">
          <div
            className="ftco-section ftco-hireme img margin-top"
            style={{ backgroundImage: `url('${baseUrl}images/third.png')` }}
          ></div>
          <div className="row justify-content-center pb-5">
            <div className="col-md-10 heading-section text-center ftco-animate">
              <h1 className="big big-2">Experience</h1>
              <h2 className="mb-4">Experience</h2>
              <br />
              <div className="row">
                <br />
                <br />
                <div className="row">
                  <div className="col-md-6 project-tile">
                    <div className="resume-wrap ftco-animate">
                      <span className="date">2021-2023</span>
                      <h3>Network Engineer</h3>
                      <span className="position">SonicWall</span>
                      <ul className="mt-4">
                        <li>
                          Provided expert support on configuring gateway
                          antivirus, content filtering, application control,
                          Geo-IP, Botnet filtering, and Anti-Spam.
                        </li>
                        <li>
                          Assisted customers in setting up firewalls, switches,
                          access points, and endpoint security.
                        </li>
                        <li>
                          Collaborated with development teams to fix bugs in
                          network devices and deliver firmware updates.
                        </li>
                        <li>
                          Supported VPNs, SD-WAN, and OSPF routing across global
                          networks.
                        </li>
                        <li>
                          Worked with IPS teams to add signatures and resolve
                          false positives.
                        </li>
                        <li>
                          Managed escalations, created knowledge articles, and
                          tested customer support portals.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-6 project-tile">
                    <div className="resume-wrap ftco-animate">
                      <span className="date">2020</span>
                      <h3>Graduate Trainee</h3>
                      <span className="position">Maven Silicon</span>
                      <ul className="mt-4">
                        <li>
                          Designed and verified a 1x3 router, focusing on RTL
                          design and UVM verification using Verilog and
                          SystemVerilog.
                        </li>
                        <li>
                          Developed the AHB-APB bridge project, ensuring
                          efficient protocol conversion and system integration.
                        </li>
                        <li>
                          Implemented a FIFO depth calculation project to
                          optimize buffer sizes and enhance data flow
                          efficiency.
                        </li>
                        <li>
                          Gained expertise in data integrity, error correction,
                          and secure hardware design across multiple projects.
                        </li>
                        <li>
                          Acquired skills in advanced SystemVerilog and UVM for
                          hardware verification.
                        </li>
                      </ul>
                    </div>
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
