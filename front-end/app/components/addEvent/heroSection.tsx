import React from "react";
import styles from "@styles/addEvent.module.css";
import styles_color from "@styles/custom-colors.module.css";
import CustomImage from "../CustomImage";

const HeroSection: React.FC = () => {
  const handleClick = (name: string) => {
    console.log(`Clicked ${name}`);
  };

  return (
    <section
      className={`d-flex align-items-center m-0 pt-0 ${styles.heroSection}`}
    >
      <div className="container">
        <div className="d-flex justify-content-center flex-wrap py-4">
          <button
            className={`btn btn-link rounded-circle p-2 p-sm-3 p-md-4 ms-3 border ${styles_color.customBrown} ${styles.imagesStyling}`}
            onClick={() => handleClick("Home-Icon")}
          >
            <CustomImage imageSrc={"/add-event/home.png"} name={"Home-Icon"} />
          </button>
          <button
            className={`btn btn-link rounded-circle p-2 p-sm-3 p-md-4 ms-3 border ${styles_color.customLightPurple}   ${styles.imagesStyling}`}
            onClick={() => handleClick("Restaurant-Icon")}
          >
            <CustomImage
              imageSrc={"/add-event/restaurant.png"}
              name={"Restaurant-Icon"}
            />
          </button>
          <button
            className={`btn btn-link rounded-circle p-2 p-sm-3 p-md-4 ms-3 border ${styles_color.customLightPink}  ${styles.imagesStyling}`}
            onClick={() => handleClick("Tray-Icon")}
          >
            <CustomImage imageSrc={"/add-event/tray.png"} name={"Tray-Icon"} />
          </button>
          <button
            className={`btn btn-link rounded-circle p-2 p-sm-3 p-md-4 ms-3 border ${styles_color.customLightGreen}  ${styles.imagesStyling}`}
            onClick={() => handleClick("Camera-Icon")}
          >
            <CustomImage
              imageSrc={"/add-event/camera.png"}
              name={"Camera-Icon"}
            />
          </button>
          <button
            className={`btn btn-link rounded-circle p-2 p-sm-3 p-md-4 ms-3 border ${styles_color.customLightPink}  ${styles.imagesStyling}`}
            onClick={() => handleClick("Flower-Icon")}
          >
            <CustomImage
              imageSrc={"/add-event/flower.png"}
              name={"Flower-Icon"}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
