import gsap from "gsap";
import { smoother } from "../Navbar";

// ---------------------------------------------------------------------------
// Manual char-split helper — replaces gsap-trial/SplitText
// ---------------------------------------------------------------------------
interface SplitResult {
  chars: HTMLElement[];
  revert: () => void;
}

function splitChars(selector: string | string[]): SplitResult {
  const selectors = Array.isArray(selector) ? selector : [selector];
  const chars: HTMLElement[] = [];
  const originals: { el: HTMLElement; html: string }[] = [];

  selectors.forEach((sel) => {
    document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
      originals.push({ el, html: el.innerHTML });
      const text = el.textContent ?? "";
      el.innerHTML = text
        .split("")
        .map((ch) => {
          if (ch === " ") return "<span style='display:inline-block'>&nbsp;</span>";
          return `<span class="split-char" style="display:inline-block">${ch}</span>`;
        })
        .join("");
      el.querySelectorAll<HTMLElement>(".split-char").forEach((c) =>
        chars.push(c)
      );
    });
  });

  return {
    chars,
    revert: () => {
      originals.forEach(({ el, html }) => {
        el.innerHTML = html;
      });
    },
  };
}

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  const landingText = splitChars([
    ".landing-info h3",
    ".landing-intro h2",
    ".landing-intro h1",
  ]);
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  const TextProps = { type: "chars,lines", linesClass: "split-h2" };
  void TextProps; // kept for reference parity, unused in manual split

  const landingText2 = splitChars(".landing-h2-info");
  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  const landingText3 = splitChars(".landing-h2-info-1");
  const landingText4 = splitChars(".landing-h2-1");
  const landingText5 = splitChars(".landing-h2-2");

  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

function LoopText(Text1: SplitResult, Text2: SplitResult) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1.chars,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1.chars,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      Text2.chars,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
