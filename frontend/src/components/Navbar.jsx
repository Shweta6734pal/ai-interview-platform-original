import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const styles = {
  navWrap: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    padding: "18px 24px 0",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
  },
  nav: {
    maxWidth: "1180px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "18px",
    padding: "14px 18px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.72)",
    border: "1px solid rgba(255,255,255,0.9)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 14px 40px rgba(15,23,42,0.08)",
    flexWrap: "wrap",
  },
  brand: {
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
    color: "#0f172a",
    fontWeight: 800,
    fontSize: "18px",
    letterSpacing: "-0.4px",
  },
  logoDot: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #2563eb, #14b8a6)",
    boxShadow: "0 0 20px rgba(37,99,235,0.35)",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  link: {
    padding: "10px 14px",
    borderRadius: "14px",
    textDecoration: "none",
    color: "#334155",
    fontWeight: 600,
    fontSize: "14px",
    transition: "all 0.2s ease",
  },
  activeLink: {
    background: "#e0f2fe",
    color: "#0f172a",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  userPill: {
    padding: "9px 14px",
    borderRadius: "999px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    color: "#334155",
    fontSize: "14px",
    fontWeight: 600,
  },
  primaryBtn: {
    padding: "11px 16px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 12px 24px rgba(37,99,235,0.2)",
  },
  ghostBtn: {
    padding: "11px 16px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    color: "#0f172a",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
  },
};

const responsiveCss = `
  @media (max-width: 760px) {
    .pp-nav {
      justify-content: center !important;
    }
    .pp-brand {
      width: 100% !important;
      justify-content: center !important;
    }
    .pp-links {
      width: 100% !important;
      justify-content: center !important;
    }
    .pp-right {
      width: 100% !important;
      justify-content: center !important;
    }
  }
`;

const navItems = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard", protected: true },
  { label: "Interview", to: "/interview", protected: true },
];

const Navbar = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <style>{responsiveCss}</style>

      <div style={styles.navWrap}>
        <nav className="pp-nav" style={styles.nav}>
          <Link className="pp-brand" to="/" style={styles.brand}>
            <span style={styles.logoDot} />
            PrepPilot AI
          </Link>

          <div className="pp-links" style={styles.links}>
            {navItems
              .filter((item) => !item.protected || token)
              .map((item) => {
                const isActive =
                  item.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.to);

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    style={{
                      ...styles.link,
                      ...(isActive ? styles.activeLink : {}),
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
          </div>

          <div className="pp-right" style={styles.right}>
            {!token ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  style={styles.ghostBtn}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  style={styles.primaryBtn}
                >
                  Get Started
                </button>
              </>
            ) : (
              <>
                <span style={styles.userPill}>{user?.name}</span>
                <button onClick={handleLogout} style={styles.ghostBtn}>
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
