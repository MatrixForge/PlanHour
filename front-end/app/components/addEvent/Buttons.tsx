import React from "react";
import styles from "@styles/custom-colors.module.css";
import styles_button from "@styles/addEvent.module.css";

const ButtonList: React.FC = () => {
  const buttons = [
    { name: "Venue", color: "customBrown" },
    { name: "Restaurant", color: "customLightPurple" },
    { name: "Catering", color: "customLightPink" },
    { name: "Photographer", color: "customLightGreen" },
    { name: "Florist", color: "customLightPink" },
  ];
  const handleClick = (name: string) => {
    console.log(`Clicked ${name}`);
  };

  return (
    <section className={`d-flex align-items-center m-0 pt-0`}>
      <div className="container">
        {/* {console.log(styles)} */}
        <div className="d-flex justify-content-center flex-wrap py-4">
          {buttons.map((button, index) => {
            console.log(styles[button.color]);
            return (
              <button
                key={index}
                className={`btn rounded-3 px-lg-4 py-2  ms-lg-5 border ${
                  styles[button.color]
                } ${styles_button.btn_responsive} ${
                  styles_button.customize_btns
                }`}
                onClick={() => handleClick(button.color)}
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
