import styles from "../styles/popup.module.css";

export default function Popup({ values, setIsOpen, isOpen }) {
  let newChart = new Chart();
  return (
    <div className={styles.popup}>
      <div className="row">
        <h3>Grams of CO2 per year(mi)</h3>
        <h4>{values.gMiYear} g/mi</h4>
      </div>
      <div className="row">
        <h3>Grams of CO2 per year(km)</h3>
        <h4>{Math.round(values.gKmYear * 100) / 100} g/km</h4>
      </div>
      <div className="row">
        <h3>Tons of CO2 per year</h3>
        <h4>{Math.round(values.tYear * 100) / 100}</h4>
      </div>
      <div className="row">
        <h3>Tons of CO2 in selected period</h3>
        <h4>{Math.round(values.total * 100) / 100}</h4>
      </div>
      <div className="row">
        <h3>Grown trees required to completely compensate yearly emissions</h3>
        <h4>~{Math.round(values.treesRequired)} trees</h4>
      </div>
      <div className="row">
        <h3>Space the trees would need</h3>
        <h4>~{Math.round(values.treeSpaceRequired)} ha</h4>
      </div>
    </div>
  );
}
