import styles from "../styles/simulation.module.css";
import Popup from "./Popup";
import { Line } from "react-chartjs-2";
import { useState } from "react";

export default function Simulation({ values, isOpen, setIsOpen, chartData }) {
  return (
    <section className={styles.simulation}>
      <Line data={chartData}></Line>
      {!isNaN(values.gMiYear) && (
        <button
          className={styles["btn-submit"]}
          onClick={() => {
            setIsOpen(!isOpen);
            console.log(isOpen);
          }}
        >
          Show results
        </button>
      )}

      {isOpen && (
        <Popup values={values} setIsOpen={setIsOpen} isOpen={isOpen} />
      )}
    </section>
  );
}
