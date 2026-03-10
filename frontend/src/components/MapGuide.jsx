import { useEffect, useRef } from "react";

/* ─── Guide content ──────────────────────────────────────────── */
const GUIDE_ITEMS = [
  {
    id: 1,
    color: "#0e6b99",
    bg: "#dff1fb",
    title: "Move around the map",
    desc: "Use the mouse wheel to zoom and drag to move.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="guide-item__icon-svg" aria-hidden="true">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.75" />
        <path d="m21 21-4.35-4.35M11 8v6m-3-3h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 2,
    color: "#1e7e5e",
    bg: "#dcf4ec",
    title: "Change map layers",
    desc: "Click the layers button to switch between standard, satellite, and terrain views.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="guide-item__icon-svg" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 3,
    color: "#7635b0",
    bg: "#f1e8fc",
    title: "Post to the forum (coming soon)",
    desc: "Click anywhere on the map to create a post about that location.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="guide-item__icon-svg" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ─── Component ──────────────────────────────────────────────── */
export default function MapGuide({ isOpen, onClose }) {
  const closeBtnRef = useRef(null);

  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  /* Move focus to close button when panel opens */
  useEffect(() => {
    if (isOpen) closeBtnRef.current?.focus();
  }, [isOpen]);

  /* Lock body scroll while panel is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className={`guide-overlay${isOpen ? " open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Panel ── */}
      <aside
        className={`guide-panel${isOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Map guide"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="guide-panel__header">
          {/* Decorative compass watermark */}
          <svg
            className="guide-header__watermark"
            viewBox="0 0 120 120"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="60" cy="60" r="52" stroke="white" strokeWidth="1.5" />
            <circle cx="60" cy="60" r="36" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="60" cy="60" r="6" fill="white" />
            <polygon points="60,8 65,52 60,60 55,52" fill="white" />
            <polygon points="60,112 55,68 60,60 65,68" fill="rgba(255,255,255,0.35)" />
            <polygon points="112,60 68,55 60,60 68,65" fill="rgba(255,255,255,0.55)" />
            <polygon points="8,60 52,65 60,60 52,55" fill="rgba(255,255,255,0.35)" />
          </svg>

          {/* Close button */}
          <button
            ref={closeBtnRef}
            className="guide-panel__close"
            onClick={onClose}
          aria-label="Close map guide"
          >
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Title block */}
          <div className="guide-panel__header-text">
            <h2 className="guide-panel__title">Map guide</h2>
            <p className="guide-panel__subtitle">
              Discover the Canary Islands through this interactive map
            </p>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="guide-panel__body">
          <ul className="guide-item-list" role="list">
            {GUIDE_ITEMS.map((item) => (
              <li className="guide-item" key={item.id}>
                <div
                  className="guide-item__icon-wrap"
                  style={{ color: item.color, background: item.bg }}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>
                <div className="guide-item__content">
                  <strong className="guide-item__title">{item.title}</strong>
                  <span className="guide-item__desc">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="guide-panel__footer">
          <p className="guide-panel__footer-note">
            This map uses data from OpenStreetMap and is built with React Leaflet.
          </p>
        </div>
      </aside>
    </>
  );
}


export const Frame = () => {
  const guideItems = [
    {
      id: 1,
      icon: vector,
      text: "Click on the map to see the information of the map",
      iconClass: "w-[20.01px] h-[18.01px]",
      textWidth: "w-[552px]",
    },
    {
      id: 2,
      icon: image,
      text: "You can see the wildlife areas in the map",
      iconClass: "w-[79.17%] h-[91.66%] top-[8.34%] left-[20.83%]",
      textWidth: "w-[611px]",
      containerWidth: "w-[322px]",
      textMargin: "mr-[-324.00px]",
      hasWrapper: true,
    },
    {
      id: 3,
      icon: vector2,
      text: "Post a comment in the forum and use the location of the map",
      iconClass: "w-[90.62%] h-[90.62%] top-[9.38%] left-[9.38%]",
      textWidth: "w-[610px]",
      containerWidth: "w-[643px]",
      textMargin: "mr-[-2.00px]",
      hasWrapper: true,
    },
  ];

  return (
    <div className="flex flex-col w-[794px] h-[477px] items-center gap-[43px] relative">
      <h1 className="relative flex-1 self-stretch mt-[-1.00px] font-desktop-h1 font-[number:var(--desktop-h1-font-weight)] text-transparent text-[length:var(--desktop-h1-font-size)] text-center tracking-[var(--desktop-h1-letter-spacing)] leading-[var(--desktop-h1-line-height)] [font-style:var(--desktop-h1-font-style)]">
        <span className="text-[#1f711e] font-desktop-h1 [font-style:var(--desktop-h1-font-style)] font-[number:var(--desktop-h1-font-weight)] tracking-[var(--desktop-h1-letter-spacing)] leading-[var(--desktop-h1-line-height)] text-[length:var(--desktop-h1-font-size)]">
          Explore areas near you that need extra
        </span>
        <span className="text-black font-desktop-h1 [font-style:var(--desktop-h1-font-style)] font-[number:var(--desktop-h1-font-weight)] tracking-[var(--desktop-h1-letter-spacing)] leading-[var(--desktop-h1-line-height)] text-[length:var(--desktop-h1-font-size)]">
          {" "}
          attention
        </span>
      </h1>

      <section className="relative w-[723px] h-[316px] rounded-[29px] overflow-hidden bg-[linear-gradient(137deg,rgba(0,61,96,1)_7%,rgba(37,206,57,1)_100%)]">
        <header className="w-[731px] justify-center gap-2.5 px-[130px] py-3 top-0 -left-2 bg-[#003d60] flex items-center absolute">
          <h2 className="relative w-fit mt-[-1.00px] font-main-bold font-[number:var(--main-bold-font-weight)] text-white text-[length:var(--main-bold-font-size)] tracking-[var(--main-bold-letter-spacing)] leading-[var(--main-bold-line-height)] [font-style:var(--main-bold-font-style)]">
            Map guide
          </h2>
        </header>

        <div className="w-[657px] gap-[15px] top-[93px] left-[30px] flex items-center absolute">
          <img
            className="relative w-[20.01px] h-[18.01px]"
            alt="Click on map icon"
            src={guideItems[0].icon}
          />
          <p className="relative w-[552px] mt-[-1.00px] font-heading-4-bold font-[number:var(--heading-4-bold-font-weight)] text-white text-[length:var(--heading-4-bold-font-size)] text-center tracking-[var(--heading-4-bold-letter-spacing)] leading-[var(--heading-4-bold-line-height)] [font-style:var(--heading-4-bold-font-style)]">
            {guideItems[0].text}
          </p>
        </div>

        <div className="w-[322px] gap-[11px] top-[168px] left-[27px] flex items-center absolute">
          <div className="relative w-6 h-6 aspect-[1]">
            <img
              className="absolute w-[79.17%] h-[91.66%] top-[8.34%] left-[20.83%]"
              alt="Wildlife areas icon"
              src={guideItems[1].icon}
            />
          </div>
          <p className="relative w-[611px] mt-[-1.00px] mr-[-324.00px] font-heading-4-bold font-[number:var(--heading-4-bold-font-weight)] text-white text-[length:var(--heading-4-bold-font-size)] tracking-[var(--heading-4-bold-letter-spacing)] leading-[var(--heading-4-bold-line-height)] [font-style:var(--heading-4-bold-font-style)]">
            {guideItems[1].text}
          </p>
        </div>

        <div className="w-[643px] gap-[11px] top-[227px] left-[30px] flex items-center absolute">
          <div className="relative w-6 h-6 aspect-[1]">
            <img
              className="absolute w-[90.62%] h-[90.62%] top-[9.38%] left-[9.38%]"
              alt="Post comment icon"
              src={guideItems[2].icon}
            />
          </div>
          <p className="relative w-[610px] mt-[-1.00px] mr-[-2.00px] font-heading-4-bold font-[number:var(--heading-4-bold-font-weight)] text-white text-[length:var(--heading-4-bold-font-size)] tracking-[var(--heading-4-bold-letter-spacing)] leading-[var(--heading-4-bold-line-height)] [font-style:var(--heading-4-bold-font-style)]">
            {guideItems[2].text}
          </p>
        </div>

        <img
          className="top-[152px] w-[702px] object-cover absolute left-0 h-px"
          alt=""
          src={line13}
          role="presentation"
        />

        <img
          className="top-[215px] w-[715px] absolute left-0 h-px"
          alt=""
          src={line14}
          role="presentation"
        />
      </section>
    </div>
  );
};