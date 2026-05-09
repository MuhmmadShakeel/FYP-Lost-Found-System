import React, { useEffect, useState } from "react";
import Logo from "../../../assets/images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/ContextApi";
import UserAccount from "../useraccount/UserAccount.jsx";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const closeMenu = () => setAccountOpen(false);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full bg-[#1E3A8A] text-[#F8FAFC] shadow-lg fixed top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center p-1 shadow-md hover:scale-105 transition">
            <img
              src={Logo}
              alt="Logo"
              className="h-10 w-10 object-contain rounded-full"
            />
          </div>
          <span className="font-semibold text-lg tracking-wide">
            Lost & Found
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex gap-2 items-center">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Services", path: "/services" },
            { name: "Contact", path: "/contact" },
            { name: "Report Lost", path: "/report-lost" },
            { name: "Report Found", path: "/report-found" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="px-4 py-2 rounded-lg hover:bg-white hover:text-[#1E3A8A] transition font-medium"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE (AUTH) */}
        <div className="hidden lg:flex items-center gap-3 relative" onClick={(event) => event.stopPropagation()}>

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-white text-[#1E3A8A] font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-white text-[#1E3A8A] font-semibold"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setAccountOpen((prev) => !prev);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1E3A8A] font-bold shadow-sm"
              >
                P
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                  <button
                    onClick={() => {
                      setAccountOpen(false);
                      setDrawerOpen(true);
                    }}
                    className="block w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    Account
                  </button>
                  <button
                    onClick={() => {
                      setAccountOpen(false);
                      handleLogout();
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-slate-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="lg:hidden flex flex-col gap-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden bg-[#1E3A8A] transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-2">

          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Services", path: "/services" },
            { name: "Contact", path: "/contact" },
            { name: "Report Lost", path: "/report-lost" },
            { name: "Report Found", path: "/report-found" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded-lg hover:bg-white hover:text-[#1E3A8A]"
              >
                {item.name}
              </Link>
            </li>
          ))}

          {/* MOBILE AUTH */}
          <div className="flex flex-col gap-2 mt-3">

            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-white text-[#1E3A8A] text-center font-semibold"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-white text-[#1E3A8A] text-center font-semibold"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="px-4 py-2 rounded-lg bg-white text-[#1E3A8A] text-center font-semibold"
                >
                  Profile
                </Link>

                <Link
                  to="/account"
                  className="px-4 py-2 rounded-lg bg-white text-[#1E3A8A] text-center font-semibold"
                >
                  Account
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold"
                >
                  Logout
                </button>
              </>
            )}

          </div>
        </ul>
      </div>

      {/* USER ACCOUNT DRAWER */}
      {isLoggedIn && <UserAccount open={drawerOpen} setOpen={setDrawerOpen} />}
    </header>
  );
}

export default Navbar;