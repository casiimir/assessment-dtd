import styles from "@/styles/components/spinner.module.scss";

const Spinner = () => (
  <div className={styles.spinnerOverlay}>
    <div className={styles.spinner}></div>
  </div>
);

export default Spinner;
