import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Gallery from "@/components/Gallery";
import { PhotoType } from "@/types/main";

import styles from "@/styles/pages/photo_s.module.scss";
import axios from "axios";

export default function Photo_d() {
  const router = useRouter();
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);

      try {
        if (router.query.search) {
          const response = await axios.get(
            `/api/unsplash?search=${router.query.search}&page=${page}`
          );
          setTotalPages(response.data.total_pages);
          setPhotos(response.data.results);
          setError("");
        }
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
  }, [page, router.query.search]);

  return (
    <>
      <Head>
        {/* TODO: add SEO title by router.query.search (?) */}
        <title>Cerca Foto - Dipartimento per la Trasformazione Digitale</title>
        <meta
          name="description"
          content="Ricerca la tua immagine perfetta tramite il progetto libero del Dipartimento per la Trasformazione Digitale"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.photo_d}>
        <h1 className={styles.title}>{router.query.search}</h1>
        <Gallery
          photos={photos}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </>
  );
}
