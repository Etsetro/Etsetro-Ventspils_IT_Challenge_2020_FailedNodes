import { useForm } from "react-hook-form";
import styles from "../styles/simulation.module.css";

export default function Form({ setValues, values, setSimulationStarted }) {
  const { register, handleSubmit, errors } = useForm();

  let startYear = 1975;
  const yearsSelect = Array(2019 - startYear)
    .fill(1)
    .map(() => startYear++);

  function calculateEmissions(year, roadLength, realtimeLength, carCount) {
    fetch("/data.csv").then((e) => {
      e.text().then((e) => {
        const textLines = e.split(/\r\n|\n/);
        let emissionByYear = new Array(textLines.length);
        textLines.forEach((data, index) => {
          let rowValues = data.split(",");
          emissionByYear[index] = [
            parseInt(rowValues[0]),
            parseInt(rowValues[2]),
          ];
        });
        for (let i = 0; i < emissionByYear.length; i++) {
          if (emissionByYear[i][0] === year) {
            const gramsKmYear = emissionByYear[i][1] * 1.609344 * carCount;
            const tonPerYear = (gramsKmYear * roadLength * 365 * 24) / 1000000;
            const totalEmissionTons = tonPerYear * realtimeLength;
            const treesRequired = (totalEmissionTons * 1000000) / 21;
            const dataObj = {
              gMiYear: emissionByYear[i][1],
              gKmYear: gramsKmYear,
              tYear: tonPerYear,
              total: totalEmissionTons,
              treesRequired: treesRequired,
              treeSpaceRequired: (treesRequired * 27) / 10000,
            };
            setValues(dataObj);
          }
        }
      });
    });
  }

  function submitHandler(e) {
    calculateEmissions(
      parseInt(e.prodDate),
      parseInt(e.roadLength),
      parseInt(e.realtimeLength),
      parseInt(e.carCount)
    );
    console.log(values);
  }

  return (
    <section className={styles.form}>
      <h1>What is this simulation for?</h1>
      <p>
        Despite all the good intentions and the signing of the Paris Agreement
        in 2016 with the purpose of reducing CO2-emissions, emissions are still
        going up. A large part of these emissions comes from transport. This
        simulation was made to raise awareness for the CO2 emitted from
        transport.
      </p>
      <form className={styles["form-grid"]}>
        <div className={styles["form-widget-container"]}>
          <label className={styles["form-label"]}>
            Vehicle production year
          </label>
          <select
            className={`${styles["form-dropdown"]} ${styles["form-widget"]}`}
            name="prodDate"
            ref={register}
          >
            {yearsSelect.map((year, index) => (
              <option value={year} key={index}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className={styles["form-widget-container"]}>
          <label className={styles["form-label"]}>Road length (km)</label>
          <input
            name="roadLength"
            type="number"
            className={styles["form-widget"]}
            ref={register({ required: true })}
          />
          {errors.roadLength && <div className={styles.error}></div>}
        </div>
        <div className={styles["form-widget-container"]}>
          <label className={styles["form-label"]}>Real time length (yr.)</label>
          <input
            name="realtimeLength"
            type="number"
            className={styles["form-widget"]}
            ref={register({ required: true })}
          />
          {errors.realtimeLength && <div className={styles.error}></div>}
        </div>
        <div className={styles["form-widget-container"]}>
          <label className={styles["form-label"]}>Vehicle count (n/km)</label>
          <input
            name="carCount"
            type="number"
            className={styles["form-widget"]}
            ref={register({ required: true })}
          />
          {errors.carCount && <div className={styles.error}></div>}
        </div>
      </form>

      <button
        type="submit"
        className={styles["btn-submit"]}
        onClick={handleSubmit(submitHandler)}
      >
        Start
      </button>
    </section>
  );
}
