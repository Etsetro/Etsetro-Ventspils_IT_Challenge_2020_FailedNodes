import { useForm } from "react-hook-form";
import styles from "../styles/simulation.module.css";
import { useEffect } from "react";

export default function Form({
  setValues,
  values,
  setChartData,
  setAnimationState,
  animationState,
}) {
  useEffect(() => {
    if (values.realtimeLength) {
      getChartData(values.realtimeLength, values.tYear);
    }
  }, [values]);
  const { register, handleSubmit, errors } = useForm();

  let startYear = 1975;
  const yearsSelect = Array(2019 - startYear)
    .fill(1)
    .map(() => startYear++);

  function getChartData(length, emission) {
    let chart = {
      labels: [],
      datasets: [
        {
          label: "Emission",
          fill: true,
          key: [],
          lineTension: 0.1,
          backgroundColor: "rgba(48, 57, 96, 0.45)",
          borderColor: "#303960",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: " #303960",
          pointBackgroundColor: "#303960",
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#f8b24f",
          pointHoverBorderColor: "#f8b24f",
          pointHoverBorderWidth: 2,
          pointRadius: 2,
          pointHitRadius: 10,
          data: [],
        },
      ],
    };
    const dataIntervalValue = emission / 40;
    const dataIntervalTime = (365 * length) / 40;
    setAnimationState("processing");
    if (!isNaN(emission) && !isNaN(length)) {
      let counter = 0;

      let drawChart = setInterval(() => {
        chart.datasets[0].data.push(
          Math.floor(dataIntervalValue * (counter + 1) * 100) / 100
        );
        chart.labels.push(Math.floor(dataIntervalTime * (counter + 1)));
        counter++;

        setChartData({});
        setChartData(chart);

        if (counter === 40) {
          clearInterval(drawChart);
          setAnimationState("complete");
        }
      }, 1000);
    }
  }

  function calculateEmissions(
    fullData,
    year,
    roadLength,
    realtimeLength,
    carCount
  ) {
    const textLines = fullData.split(/\r\n|\n/);
    let emissionByYear = new Array(textLines.length);
    textLines.forEach((data, index) => {
      let rowValues = data.split(",");
      emissionByYear[index] = [parseInt(rowValues[0]), parseInt(rowValues[2])];
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
          realtimeLength: realtimeLength,
        };
        return dataObj;
      }
    }
  }

  function submitHandler(formData) {
    setAnimationState("null");
    const fetchData = fetch("/data.csv");

    fetchData.then((e) => {
      e.text().then((fullData) => {
        let dataObj = calculateEmissions(
          fullData,
          parseInt(formData.prodDate),
          parseInt(formData.roadLength),
          parseInt(formData.realtimeLength),
          parseInt(formData.carCount)
        );
        setValues(dataObj);
      });
    });
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
      <div className={styles["form-wrapper"]}>
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
            <label className={styles["form-label"]}>
              Real time length (yr)
            </label>
            <input
              name="realtimeLength"
              type="number"
              className={styles["form-widget"]}
              ref={register({ required: true })}
            />
            {errors.realtimeLength && <div className={styles.error}></div>}
          </div>
          <div className={styles["form-widget-container"]}>
            <label className={styles["form-label"]}>Vehicle count (n/h)</label>
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
      </div>
    </section>
  );
}
