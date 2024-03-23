import Head from "next/head";
import useFetch from "@/hooks/useFetch";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import { PhotoType } from "@/types/main";
import styles from "@/styles/pages/home.module.scss";

export default function Home() {
  const {
    data: photos,
    isLoading,
    error,
  } = useFetch<PhotoType>({ url: "/api/unsplash" });

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
      <main className={styles.Homepage}>
        <Hero />
        <Gallery photos={photos} isLoading={isLoading} error={error} />
      </main>
    </>
  );
}
