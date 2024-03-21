import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

import { PhotoType } from "@/types/main";
import styles from "@/styles/pages/photo_d.module.scss";
import PhotoDetail from "@/components/PhotoDetail";

export default function Photo_id() {
  const router = useRouter();
  const [photo, setPhoto] = useState<PhotoType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPhoto = async () => {
      setIsLoading(true);

      try {
        if (router.query.id) {
          const response = await axios.get(
            `/api/unsplash?id=${router.query.id}`
          );
          setPhoto(response.data);
          setError("");
        }
      } catch (err) {
        const error = axios.isAxiosError(err)
          ? err.message
          : "An unexpected error occurred";

        setError("Failed to fetch photo.");
        console.error("Failed to fetch photo:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhoto();
  }, [router.query.id]);

  return (
    <>
      <Head>
        {/* TODO: add SEO title by router.query.id (?) */}
        <title>Cerca Foto - Dipartimento per la Trasformazione Digitale</title>
        <meta
          name="description"
          content="Ricerca la tua immagine perfetta tramite il progetto libero del Dipartimento per la Trasformazione Digitale"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.photo_d}>
        {photo ? <PhotoDetail photoData={photo} /> : <p>Foto non trovata...</p>}
      </main>
    </>
  );
}
