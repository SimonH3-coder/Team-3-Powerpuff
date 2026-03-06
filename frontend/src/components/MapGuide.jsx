import image from "./image.svg";
import line13 from "./line-13.svg";
import line14 from "./line-14.svg";
import vector2 from "./vector-2.svg";
import vector from "./vector.svg";

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