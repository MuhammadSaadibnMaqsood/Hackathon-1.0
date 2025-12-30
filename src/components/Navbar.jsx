import React, { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import { RxHamburgerMenu } from "react-icons/rx";
import { logout } from "../config/supabasefunctions";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsNavVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isNavVisible]);

  const navItems = ["Get Appointment", "My Appointment", "About"];

  const toggleMobileNav = () => {
    if (mobileNav) {
      // Play slide-out animation before hiding
      setAnimationClass("slide-out-right");
      setTimeout(() => setMobileNav(false), 400); // wait for animation to finish
    } else {
      setMobileNav(true);
      setAnimationClass("slide-in-left");
    }
  };

  async function handleLogout() {
    await logout();
  }
  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex h-16 w-full items-center justify-between rounded-full bg-white/50 px-6 py-2 shadow-xl backdrop-blur-md">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-7">
            <img className="w-10 rounded-full" src="/Logo.png" alt="logo" />

            <Link to="/">NEXUS HEALTH</Link>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex h-full items-center">
            <div className="hidden md:flex items-center space-x-2">
              {user?.session
                ? navItems.map((item) => (
                    <Link
                      className="px-3 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      key={item}
                      to={`/${item.replace(/\s+/g, "").toLowerCase()}`}
                    >
                      {item}
                    </Link>
                  ))
                : navItems.splice(2, 3).map((item) => (
                    <Link
                      className="px-3 py-2 text-sm font-medium text-gray-700 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      key={item}
                      to={`/${item.replace(/\s+/g, "").toLowerCase()}`}
                    >
                      {item}
                    </Link>
                  ))}

              {user?.session ? (
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 cursor-pointer rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to={"/login"}
                  className="px-5 cursor-pointer py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                >
                  Login
                </Link>
              )}
            </div>

            <div className="flex md:hidden">
              {mobileNav ? (
                <RxCross1
                  onClick={toggleMobileNav}
                  className="w-7 h-7 cursor-pointer"
                />
              ) : (
                <RxHamburgerMenu
                  onClick={toggleMobileNav}
                  className="w-7 h-7 cursor-pointer"
                />
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* MOBILE NAV */}
      {mobileNav && (
        <div
          className={`${animationClass} fixed top-0 left-0 z-40 flex flex-col items-center justify-center gap-10 min-h-screen w-80 bg-white shadow-2xl`}
        >
          {navItems.map((item) => (
            <Link
              className="px-3 py-2 text-lg font-medium text-gray-700 rounded-full hover:bg-gray-100 transition-colors duration-200"
              key={item}
              to={`/${item.replace(/\s+/g, "").toLowerCase()}`}
              onClick={toggleMobileNav}
            >
              {item}
            </Link>
          ))}

          {user?.session ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 cursor-pointer rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to={"/login"}
              className="px-5 cursor-pointer py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
