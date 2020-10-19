import styles from "../styles/simulation.module.css";
import Popup from "./Popup";
import { Line } from "react-chartjs-2";

export default function Simulation({
  values,
  isOpen,
  setIsOpen,
  chartData,
  animationComplete,
}) {
  return (
    <section className={styles.simulation}>
      <div className={styles["animation-container"]}></div>
      <div
        style={!chartData.labels ? { display: "none" } : { display: "block" }}
      >
        <Line
          data={chartData}
          options={{
            tooltips: {
              displayColors: false,
              titleFontFamily: "Poppins",
              titleFontStyle: "normal",
              titleFontSize: 14,
              bodyFontFamily: "Poppins",
              bodyFontStyle: "bold",
              bodyFontSize: 16,
              footerFontFamily: "Poppins",
              footerFontSize: 14,
              xPadding: 10,
              yPadding: 10,
              callbacks: {
                title: (tooltipItem, data) =>
                  data["labels"][tooltipItem[0]["index"]] + " days",
                label: (tooltipItem, data) =>
                  data["datasets"][0]["data"][tooltipItem["index"]] + " tons",
              },
            },
            title: {
              text: "Emission in selected time period",
              display: true,
              fontFamily: "Poppins",
              fontSize: 18,
              fontColor: "black",
              padding: 20,
            },
            animation: {
              duration: 500,
              easing: "linear",
            },
            legend: {
              position: "bottom",
              labels: {
                fontColor: "black",
                fontFamily: "Poppins",
                fontStyle: "bold",
                fontSize: 14,
                padding: 20,
              },
            },
          }}
        />
      </div>

      {animationComplete && (
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
