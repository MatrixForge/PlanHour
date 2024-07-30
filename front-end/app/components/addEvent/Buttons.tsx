import React, { useState } from "react";
import styles from "@styles/custom-colors.module.css";
import styles_button from "@styles/addEvent.module.css";
import useVenueStore from "@/store/venueStore";
const ButtonList: React.FC = () => {
  const { setFilter } = useVenueStore();
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const buttons = [
    { name: "Venue", color: "customBrown" },
    { name: "Restaurant", color: "customLightPurple" },
    { name: "Catering", color: "customLightPink" },
    { name: "Photographer", color: "customLightGreen" },
    { name: "Decor", color: "customLightPink" },
  ];
  const handleClick = (filter: string, index: number) => {
    setFilter(filter === "All" ? "" : filter);
    setActiveButton(buttons[index].name);
  };
  return (
    <section className={`d-flex align-items-center m-0 pt-0`}>
      <div className="container">
        {/* {console.log(styles)} */}
        <div className="d-flex justify-content-center flex-wrap py-4">
          {buttons.map((button, index) => {
            return (
              <button
                key={index}
                className={`btn rounded-3 px-lg-4 py-2 ms-lg-5 ${
                  activeButton === button.name
                    ? "transparent-bg"
                    : styles[button.color]
                } ${styles_button.btn_responsive} ${
                  styles_button.customize_btns
                }`}
                onClick={() => handleClick(button.name.toLowerCase(), index)}
              >
                {button.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ButtonList;
