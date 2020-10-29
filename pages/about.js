import styles from "../styles/about.module.css";

export default function About() {
  return (
    <div className={styles.about}>
      <div className={styles["top-container"]}>
        <img src="/icons/laptop-code-solid.svg" className={styles.computer} />
        <img src="/icons/laptop-code-solid.svg" className={styles.computer} />
        <img src="/icons/laptop-code-solid.svg" className={styles.computer} />
      </div>
      <div className={styles["bottom-container"]}>
        <div className={styles.content}>
          <h1>Team "Failed Nodes"</h1>
          <h2 className={styles.mentor}>Lienīte Zorģe</h2>
          <h3 className={styles.mentor}>Mentor</h3>
          <ul className={styles.credentials}>
            <li>
              <h2>Kristaps Mihelsons</h2>
              <h3>3,987^12 + 4,365^12 = 4,472^12</h3>
            </li>
            <li>
              <h2>Ronalds Palacis</h2>
              <h3>Team leader</h3>
            </li>
            <li>
              <h2>Kristers Dzintars</h2>
              <h3>Simulation creator</h3>
            </li>
          </ul>
        </div>
        <div className={styles.content}>
          <h1>Used technologies</h1>
          <div className={styles.images}>
            <img src="/icons/nodejs.svg" className={styles.techimg} />
            <img src="/icons/nextjs.svg" className={styles.techimg} />
            <img src="/icons/react-brands.svg" className={styles.techimg} />
          </div>
        </div>
      </div>
    </div>
  );
}
