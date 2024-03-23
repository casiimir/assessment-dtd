import { useCallback } from "react";
import Head from "next/head";

import { PhotoType, FavouriteType } from "@/types/main";
import useFetch from "@/hooks/useFetch";
import Gallery from "@/components/Gallery";
import styles from "@/styles/pages/favourites.module.scss";

export default function Favourites() {
  const transform = useCallback(
    (data: FavouriteType[]) =>
      data
        .map((fav: FavouriteType) => fav.data)
        .slice()
        .reverse(),
    []
  );

  const {
    data: favourites,
    isLoading,
    error,
  } = useFetch<PhotoType>({
    url: "/api/favourites",
    transform,
  });

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
