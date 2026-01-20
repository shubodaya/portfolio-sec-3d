export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ftco-footer ftco-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <p style={{ display: "none" }}>
              Copyright &copy;{year} All rights reserved | This template is
              made with <i className="icon-heart color-danger" aria-hidden="true"></i>{" "}
              by{" "}
              <a href="https://colorlib.com" target="_blank" rel="noreferrer">
                Colorlib
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
