import Link from "next/link";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <h1 className="text-white font-weight-bold">Demo Client</h1>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto head">
              <li className="nav-item">
                <Link
                  href="/"
                  className="nav-link active text-white font-weight-bold"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/registration"
                  className="nav-link active text-white font-weight-bold"
                >
                  Registration
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
