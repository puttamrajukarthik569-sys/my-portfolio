import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./styles/Certifications.css";

gsap.registerPlugin(ScrollTrigger);

interface Cert {
  issuer: string;
  title: string;
  category: string;
  icon: string;
}

const certifications: Cert[] = [
  {
    issuer: "NPTEL",
    title: "Database Management Systems",
    category: "Computer Science",
    icon: "🗄️",
  },
  {
    issuer: "HackerRank",
    title: "Python",
    category: "Programming",
    icon: "🐍",
  },
  {
    issuer: "Accenture",
    title: "Introduction to Machine Learning",
    category: "Artificial Intelligence",
    icon: "🤖",
  },
  {
    issuer: "Great Learning",
    title: "Core Java",
    category: "Programming",
    icon: "☕",
  },
  {
    issuer: "HP",
    title: "Certification",
    category: "Professional",
    icon: "🏅",
  },
  {
    issuer: "Deloitte",
    title: "Certification",
    category: "Professional",
    icon: "🏆",
  },
];

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".cert-card");

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Use 'h2' — scoped to sectionRef, so this correctly targets the heading
      gsap.fromTo(
        "h2",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <div className="cert-section section-container" id="certifications" ref={sectionRef}>
      <div className="cert-container">
        <h2>
          My <span>Certifications</span>
        </h2>
        <div className="cert-grid">
          {certifications.map((cert, index) => (
            <div className="cert-card" key={index}>
              <div className="cert-card-inner">
                <div className="cert-glow"></div>
                <div className="cert-icon">{cert.icon}</div>
                <div className="cert-badge-line">
                  <span className="cert-number">0{index + 1}</span>
                  <span className="cert-category">{cert.category}</span>
                </div>
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">
                  <span className="cert-issuer-label">Issued by</span>
                  <span className="cert-issuer-name">{cert.issuer}</span>
                </p>
                <div className="cert-border-bottom"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
