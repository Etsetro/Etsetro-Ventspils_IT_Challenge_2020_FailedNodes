import { useState } from "react";
import styles from "../styles/simulation.module.css";
import Form from "../components/Form";
import Simulation from "../components/Simulation";

export default function Home() {
  const [values, setValues] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
  return (
    <section
      className={isOpen ? styles.noscroll : styles["simulation-section"]}
    >
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={(e) => setIsOpen(!isOpen)}
        ></div>
      )}
      <Form setValues={setValues} values={values} setChartData={setChartData} />
      <Simulation
        values={values}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        chartData={chartData}
      />
    </section>
  );
}
