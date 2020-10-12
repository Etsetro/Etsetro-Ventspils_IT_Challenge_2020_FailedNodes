import { useState } from "react";
import styles from "../styles/simulation.module.css";
import Form from "../components/Form";
import Simulation from "../components/Simulation";

export default function Home() {
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [values, setValues] = useState({});
  const [isOpen, setIsOpen] = useState(false);
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
      <Form
        setValues={setValues}
        values={values}
        setSimulationStarted={setSimulationStarted}
      />
      <Simulation
        values={values}
        simulationStarted={simulationStarted}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </section>
  );
}
