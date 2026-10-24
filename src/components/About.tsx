import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I'm Karthik — a{" "}
          <span className="about-accent">Full Stack Developer</span> and B.Tech
          student in{" "}
          <span className="about-accent">
            Artificial Intelligence &amp; Machine Learning
          </span>{" "}
          at SRM Institute of Science and Technology, Ramapuram. I build
          end-to-end applications using{" "}
          <span className="about-accent">Java</span>,{" "}
          <span className="about-accent">Python</span>, HTML &amp; CSS, and
          databases like MySQL and MongoDB — while exploring machine learning
          and NLP to add intelligence to the software I build.
        </p>
        <div className="about-edu">
          <span className="about-edu-label">B.Tech · AI &amp; ML · 2024–2028</span>
          <span className="about-edu-college">SRM IST, Ramapuram</span>
        </div>
      </div>
    </div>
  );
};

export default About;
