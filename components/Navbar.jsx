import Link from "next/link";
import styles from "../styles/navbar.module.css";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  let className;
  if (router.pathname === "/about") {
    className = `${styles.active}`;
  } else if (router.pathname === "/") {
    className = `${styles.active}`;
  }

  return (
    <nav className={styles.navbar}>
      <ul>
        <Link href="/">
          <a className={router.pathname === "/" ? styles.active : ""}>
            Simulation
          </a>
        </Link>
        <Link href="about">
          <a className={router.pathname === "/about" ? styles.active : ""}>
            About us
          </a>
        </Link>
      </ul>
      <p>Developed within Ventspils IT challenge 2020</p>
    </nav>
  );
}
