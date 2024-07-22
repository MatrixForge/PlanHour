import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../../styles/custom-colors.module.css";
import styles_button from "../../../styles/addEvent.module.css";

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
    <section
      className={`d-flex align-items-center m-0 pt-0`}
    >
      <div className="container">
        <div className="d-flex justify-content-center flex-wrap py-4">
            {buttons.map((button)=>{
                return (
                  <button
                    className={`btn rounded-3 px-lg-4 py-2  ms-lg-5 border ${styles[button.color]} ${styles_button.btn_responsive}`}
                    onClick={() => handleClick(button.name)}
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
