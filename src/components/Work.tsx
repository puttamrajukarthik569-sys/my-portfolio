import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface Project {
  num: string;
  name: string;
  category: string;
  algorithm: string;
  accuracy: string;
  description: string;
  tools: string;
  image: string;
  link?: string;
}

const projects: Project[] = [
  {
    num: "01",
    name: "Advanced Fake News Detection",
    category: "NLP · Machine Learning",
    algorithm: "Naive Bayes Classifier",
    accuracy: "91.36%",
    description:
      "Distinguishes misinformation from authentic content using natural language processing. Implements text preprocessing, TF-IDF vectorisation, and a Naive Bayes classifier trained on labelled news datasets.",
    tools: "Python · NLP · Naive Bayes · Scikit-learn · TF-IDF",
    image: "/images/fake-news-detection.png",
  },
  {
    num: "02",
    name: "Tech-Driven Farming Sustainability",
    category: "ML · Agriculture · Data Science",
    algorithm: "Random Forest Classifier",
    accuracy: "89.34%",
    description:
      "A sustainability advocate for farming that uses predictive modelling to analyse soil, crop, and environmental data — helping farmers make smarter, data-driven decisions.",
    tools: "Python · Random Forest · Scikit-learn · Pandas · NumPy",
    image: "/images/placeholder.webp",
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX =
        rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.num}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <p className="work-desc">{project.description}</p>
                <div className="work-meta-row">
                  <span className="work-meta-label">Algorithm</span>
                  <span className="work-meta-value">{project.algorithm}</span>
                </div>
                <div className="work-meta-row">
                  <span className="work-meta-label">Accuracy</span>
                  <span className="work-accuracy">{project.accuracy}</span>
                </div>
                <h4 className="work-tools-label">Tools &amp; Technologies</h4>
                <p className="work-tools-text">{project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.name}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
