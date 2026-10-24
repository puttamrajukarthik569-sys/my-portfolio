import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {/* Internship 1 — Future Interns */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Machine Learning Intern</h4>
                <h5>Future Interns</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Completed a virtual Machine Learning internship, applying
              supervised learning algorithms and data preprocessing techniques
              to real-world datasets. Explored classification and regression
              models using Python and Scikit-learn.
            </p>
          </div>

          {/* Internship 2 — Bharat Intern */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Development Intern</h4>
                <h5>Bharat Intern</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Currently pursuing a web development internship, building
              responsive web interfaces and strengthening fundamentals in HTML,
              CSS, and front-end development practices.
            </p>
          </div>

          {/* Education — SRM */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech — AI &amp; ML</h4>
                <h5>SRM Institute of Science and Technology</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Pursuing B.Tech in Artificial Intelligence and Machine Learning
              (2024–2028) at SRM IST, Ramapuram.{" "}
              <span className="career-highlight">CGPA: 9.6</span> till date.
              Coursework covers machine learning, databases, data structures,
              OOP, and software engineering.
            </p>
          </div>
        </div>

        {/* Education Timeline — Secondary */}
        <div className="career-edu-strip">
          <div className="career-edu-item">
            <span className="career-edu-year">2022–2024</span>
            <span className="career-edu-name">
              Narayana Junior College
            </span>
            <span className="career-edu-score">877 / 1000</span>
          </div>
          <div className="career-edu-divider"></div>
          <div className="career-edu-item">
            <span className="career-edu-year">2021–2022</span>
            <span className="career-edu-name">
              Sri Chaitanya Educational Institutions
            </span>
            <span className="career-edu-score">535 / 600</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
