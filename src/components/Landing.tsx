import { PropsWithChildren } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import "./styles/Landing.css";
import { smoother } from "./Navbar";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hi, I'm</h2>
            <h1>
              KARTHIK
              <br />
              <span>PUTTAMRAJU</span>
            </h1>
            <div className="landing-social-row">
              <a
                href="https://github.com/karthikputtamraju"
                target="_blank"
                rel="noopener noreferrer"
                className="landing-social-icon"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/karthik-puttamraju"
                target="_blank"
                rel="noopener noreferrer"
                className="landing-social-icon"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          <div className="landing-info">
            <h3>Full Stack Developer</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Java Dev</div>
              <div className="landing-h2-2">AI/ML</div>
            </h2>
            <h2>
              <div className="landing-h2-info">AI/ML</div>
              <div className="landing-h2-info-1">Java Dev</div>
            </h2>
            <p className="landing-tagline">
              Full stack apps · Machine learning · Java &amp; Python
              <br />
              turning ideas into shipped software.
            </p>
            <div className="landing-cta">
              <a
                href="#work"
                className="landing-btn landing-btn-primary"
                data-cursor="disable"
                onClick={(e) => {
                  if (window.innerWidth > 1024 && smoother) {
                    e.preventDefault();
                    smoother.scrollTo("#work", true, "top top");
                  }
                }}
              >
                View My Projects
              </a>
              <a
                href="#contact"
                className="landing-btn landing-btn-outline"
                data-cursor="disable"
                onClick={(e) => {
                  if (window.innerWidth > 1024 && smoother) {
                    e.preventDefault();
                    smoother.scrollTo("#contact", true, "top top");
                  }
                }}
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
        <div className="landing-scroll-indicator">
          <MdKeyboardArrowDown />
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
