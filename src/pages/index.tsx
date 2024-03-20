import Head from "next/head";
import styles from "@/styles/pages/home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cerca Foto - Dipartimento per la Trasformazione Digitale</title>
        <meta
          name="description"
          content="Ricerca la tua immagine perfetta tramite il progetto libero del Dipartimento per la Trasformazione Digitale"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.Homepage}></main>
    </>
  );
}
