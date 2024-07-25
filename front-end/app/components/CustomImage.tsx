import Image from "next/image";
import React from "react";
import styles from "@styles/addEvent.module.css"; // Import the new CSS module

interface CustomImageProps {
  imageSrc: string;
  name: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ imageSrc, name }) => {
  return (
    <Image
      src={imageSrc}
      alt={`picture of ${name}`}
      layout="intrinsic"
      width={100}
      height={100}
      className={`${styles.responsiveImage}`} // Apply the custom CSS class
    />
  );
};

export default CustomImage;
