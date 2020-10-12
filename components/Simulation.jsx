import styles from "../styles/simulation.module.css";
import Popup from "./Popup";

export default function Simulation({
  values,
  simulationStarted,
  isOpen,
  setIsOpen,
}) {
  return (
    <section className={styles.simulation}>
      <div></div>

      {!isNaN(values.gMiYear) && (
        <button
          className={styles["btn-submit"]}
          onClick={(e) => {
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
