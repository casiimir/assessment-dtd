import styles from "@/styles/components/hero.module.scss";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Cerca Foto</h1>
      <p className={styles.description}>
        Qui puoi cercare qualunque foto presente nei database di Unsplash,
        scattate da creativi di tutto il mondo.
      </p>
    </section>
  );
};

export default Hero;
