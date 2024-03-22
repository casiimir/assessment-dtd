import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";

import { PhotoType, FavouriteType } from "@/types/main";
import styles from "@/styles/pages/favourites.module.scss";
import Gallery from "@/components/Gallery";

export default function Favourites() {
  const [favourites, setFavourites] = useState<PhotoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchFavourites = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get("/api/favourites");
        const parsedResponse = response.data.map(
          (favourite: FavouriteType) => favourite.data
        );

        setFavourites(parsedResponse);
        setError("");
      } catch (err) {
        const error = axios.isAxiosError(err)
          ? err.message
          : "An unexpected error occurred";

        setError("Failed to fetch favourites.");
        console.error("Failed to fetch favourites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  return (
    <>
      <Head>
        <title>Preferiti - Dipartimento per la Trasformazione Digitale</title>
        <meta
          name="description"
          content="Ricerca la tua immagine perfetta tramite il progetto libero del Dipartimento per la Trasformazione Digitale"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.favourites}>
        <h1>Preferiti</h1>
        {favourites.length ? (
          <Gallery photos={favourites} isLoading={isLoading} error={error} />
        ) : (
          <h4>Aggiungi le tue foto ai preferiti.</h4>
        )}
      </main>
    </>
  );
}
