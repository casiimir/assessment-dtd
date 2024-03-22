import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";

import { PhotoType } from "@/types/main";
import styles from "@/styles/pages/home.module.scss";

export default function Home() {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`/api/unsplash`);
        setPhotos(response.data);
        setError("");
      } catch (err) {
        const error = axios.isAxiosError(err)
          ? err.message
          : "An unexpected error occurred";

        setError("Failed to fetch photos.");
        console.error("Failed to fetch photos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

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
