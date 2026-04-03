import { Link } from "react-router-dom";
import { resolveAssetUrl } from "../siteContent";

export default function Navbar({ siteContent }) {
  const ownerName = siteContent?.meta?.ownerName || "Portfolio";
  const brandIcon = resolveAssetUrl(siteContent?.meta?.brandIconPath);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark ftco_navbar ftco-navbar-light site-navbar-target"
      id="ftco-navbar"
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          {brandIcon ? (
            <img
              src={brandIcon}
              alt={ownerName}
              className="brand-icon"
              width="20"
              height="20"
              loading="eager"
            />
          ) : null}
          <span>{ownerName}</span>
        </Link>
        <button
          className="navbar-toggler js-fh5co-nav-toggle fh5co-nav-toggle"
          type="button"
          data-toggle="collapse"
          data-target="#ftco-nav"
          aria-controls="ftco-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="icon-menu"></span>
          Menu
        </button>

        <div className="collapse navbar-collapse" id="ftco-nav">
          <ul className="navbar-nav nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <span>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <span>About</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/experience">
                <span>Experience</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects">
                <span>Projects</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/education">
                <span>Education</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/#resume-section">
                <span>Resume</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/#contact-section">
                <span>Contact</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/#send-message">
                <span>Message me</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
