// components/Cards.tsx
import React, { forwardRef } from "react";
import styles from "@styles/custom-colors.module.css";
import styles1 from "@styles/navbar.module.css";
import cardStyles from "@styles/landingPageCard.module.css";
import Link from "next/link";
import Image from "next/image";

const Cards = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className={`bg-brown p-4 ${styles.customBrown}`}>
      <div className="d-flex justify-content-between">
        {/* Card 1 */}
        <Link href="/eventify" className=" mx-3">
          <Image
            src="/1.png"
            alt="Card 1"
            className={styles1.customImg}
            width={500}
            height={300}
            layout="responsive"
          />
        </Link>
        {/* Card 2 */}
        <Link href="/" className=" mx-3">
          <Image
            src="/2.png"
            alt="Card 1"
            className={styles1.customImg}
            width={500}
            height={300}
            layout="responsive"
          />{" "}
        </Link>
        {/* Card 3 */}
        <Link href="/" className=" mx-3">
          <Image
            src="/3.png"
            alt="Card 1"
            className={styles1.customImg}
            width={500}
            height={300}
            layout="responsive"
          />
        </Link>
        {/* Card 4 */}
        <Link href="/" className=" mx-3">
          <Image
            src="/4.png"
            alt="Card 1"
            className={styles1.customImg}
            width={500}
            height={300}
            layout="responsive"
          />
        </Link>
      </div>
    </div>
  );
});
Cards.displayName = "Cards";
export default Cards;
