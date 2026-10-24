import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ---------------------------------------------------------------------------
// Manual SplitText replacement — no Club GSAP plugins required.
// ---------------------------------------------------------------------------

interface SplitResult {
  words: HTMLElement[];
  chars: HTMLElement[];
  revert: () => void;
}

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  _splitResult?: SplitResult;
}

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits an element's text content into word/char <span> wrappers
 * and returns arrays of those spans plus a revert() function.
 */
function splitElement(
  el: HTMLElement,
  type: "words" | "chars" | "both"
): SplitResult {
  const original = el.innerHTML;
  const words: HTMLElement[] = [];
  const chars: HTMLElement[] = [];

  // Split by words first
  const wordTokens = el.textContent?.trim().split(/\s+/) ?? [];
  el.innerHTML = wordTokens
    .map((word) => {
      const wSpan = document.createElement("span");
      wSpan.style.cssText = "display:inline-block; overflow:hidden;";
      wSpan.className = "split-word";

      if (type === "chars" || type === "both") {
        word.split("").forEach((ch) => {
          const cSpan = document.createElement("span");
          cSpan.style.cssText = "display:inline-block;";
          cSpan.className = "split-char";
          cSpan.textContent = ch;
          wSpan.appendChild(cSpan);
        });
      } else {
        wSpan.textContent = word;
      }
      // add space after (except last)
      return wSpan.outerHTML + " ";
    })
    .join("");

  el.querySelectorAll<HTMLElement>(".split-word").forEach((w) => words.push(w));
  el.querySelectorAll<HTMLElement>(".split-char").forEach((c) => chars.push(c));

  return {
    words,
    chars,
    revert: () => {
      el.innerHTML = original;
    },
  };
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para._splitResult?.revert();
    }

    const split = splitElement(para, "words");
    para._splitResult = split;

    para.anim = gsap.fromTo(
      split.words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });

  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title._splitResult?.revert();
    }
    const split = splitElement(title, "chars");
    title._splitResult = split;

    title.anim = gsap.fromTo(
      split.chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
