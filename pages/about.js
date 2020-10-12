import styles from "../styles/about.module.css";

export default function About() {
  return (
    <div className={styles.about}>
      <div className={styles["top-container"]}>
        <img src="/laptop-code-solid.svg" className={styles.computer} />
        <img src="/laptop-code-solid.svg" className={styles.computer} />
        <img src="/laptop-code-solid.svg" className={styles.computer} />
      </div>
      <div className={styles["bottom-container"]}>
        <div className={styles.content}>
          <h1>Our team</h1>
          <ul className={styles.credentials}>
            <li>
              <h2>Kristaps Mihelsons</h2>
              <h3>Lorem ipsum</h3>
            </li>
            <li>
              <h2>Ronalds Palacis</h2>
              <h3>Team leader</h3>
            </li>
            <li>
              <h2>Kristers Dzintars</h2>
              <h3>Lorem ipsum</h3>
            </li>
          </ul>
        </div>
        <div className={styles.content}>
          <h1>Used technologies</h1>
          <div className={styles.images}>
            <img src="nodejs.svg" className={styles.techimg} />
            <img src="nextjs.svg" className={styles.techimg} />
            <img src="react-brands.svg" className={styles.techimg} />
          </div>
        </div>
      </div>
    </div>
  );
}
