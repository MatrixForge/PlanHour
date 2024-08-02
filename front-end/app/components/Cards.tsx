// components/Cards.tsx
import React, { forwardRef } from "react";
import styles from "@styles/custom-colors.module.css";
import styles1 from "@styles/navbar.module.css";
import Link from "next/link";
import Image from "next/image";

const Cards = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className={`bg-brown p-4 ${styles.customBrown}`}>
      <div className="d-flex justify-content-center">
        {/* Card 1 */}
        <div
          className="card rounded-pill mx-3 shadow-lg"
          style={{ width: "18rem" }}
        >
          <Link href="/eventify">
            <Image
              src="/1.png"
              alt="Card 1"
              className={styles1.customImg}
              width={500}
              height={300}
              layout="responsive"
            />
          </Link>
        </div>

        {/* Card 2 */}
        <div
          className={`card rounded-pill mx-3 shadow-lg ${styles.customBrown}`}
          style={{ width: "18rem" }}
        >
          <Image
            src="/2.png"
            alt="Card 1"
            className={styles1.customImg}
            width={500}
            height={300}
            layout="responsive"
          />{" "}
        </div>

        {/* Card 3 */}
        <div
          className="card rounded-pill mx-3 shadow-lg"
          style={{ width: "18rem" }}
        >
          <Image
            src="/3.png"
            alt="Card 1"
            className={styles1.customImg}
            width={500}
            height={300}
            layout="responsive"
          />
        </div>

        {/* Card 4 */}

        <div
          className="card rounded-pill mx-3 shadow-lg"
          style={{ width: "18rem" }}
        >
          <Image
            src="/4.png"
            alt="Card 1"
            className={styles1.customImg}
            width={500}
            height={300}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
});
Cards.displayName = "Cards"
export default Cards;
