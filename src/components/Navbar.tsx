import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Lenis-based smooth scroller — exposes an API compatible with the old
// ScrollSmoother usage so all downstream call-sites stay unchanged.
// ---------------------------------------------------------------------------
interface SmootherLike {
  scrollTo: (target: string | number | Element, immediate?: boolean, position?: string) => void;
  scrollTop: (value?: number) => number;
  paused: (value?: boolean) => void;
  refresh: () => void;
  lenis: Lenis | null;
}

let lenisInstance: Lenis | null = null;

export const smoother: SmootherLike = {
  lenis: null,
  scrollTo(target, _immediate = true, _position = "top top") {
    if (!lenisInstance) return;
    if (typeof target === "number") {
      lenisInstance.scrollTo(target, { immediate: _immediate });
    } else {
      // target is a CSS selector string like "#work"
      const el =
        typeof target === "string" ? document.querySelector(target) : target;
      if (el) lenisInstance.scrollTo(el as HTMLElement, { immediate: _immediate });
    }
  },
  scrollTop(value) {
    if (!lenisInstance) return 0;
    if (value !== undefined) {
      lenisInstance.scrollTo(value, { immediate: true });
    }
    return lenisInstance.scroll;
  },
  paused(value) {
    if (!lenisInstance) return;
    if (value === true) lenisInstance.stop();
    else if (value === false) lenisInstance.start();
  },
  refresh() {
    ScrollTrigger.refresh(true);
  },
};

const Navbar = () => {
  useEffect(() => {
    // Create Lenis instance
    lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });
    smoother.lenis = lenisInstance;

    // Wire Lenis RAF to GSAP ticker so ScrollTrigger stays in sync
    gsap.ticker.add((time) => {
      lenisInstance?.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Pause until loading screen dismisses (initialFX calls smoother.paused(false))
    lenisInstance.stop();

    // Wire nav links to Lenis scrollTo on desktop
    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const section = element.getAttribute("data-href");
          if (section) smoother.scrollTo(section, true, "top top");
        }
      });
    });

    window.addEventListener("resize", () => {
      ScrollTrigger.refresh(true);
    });

    return () => {
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);

  return (
    <>
      <div className="header">
        <a
          href="#"
          className="navbar-title"
          data-cursor="disable"
          onClick={(e) => {
            if (window.innerWidth > 1024 && lenisInstance) {
              e.preventDefault();
              smoother.scrollTo(0, true);
            }
          }}
        >
          KK.
        </a>
        <a
          href="mailto:Kp7272@srmist.edu.in"
          className="navbar-connect"
          data-cursor="disable"
        >
          Kp7272@srmist.edu.in
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#certifications" href="#certifications">
              <HoverLinks text="CERTS" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
