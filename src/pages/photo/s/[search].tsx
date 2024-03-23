import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import useFetch from "@/hooks/useFetch";
import Gallery from "@/components/Gallery";

import { PhotoType } from "@/types/main";
import styles from "@/styles/pages/photo_search.module.scss";

interface SearchResults {
  results: PhotoType[];
  total_pages: number;
}

export default function PhotoSearch() {
  const router = useRouter();
  const { search } = router.query;

  const [page, setPage] = useState<number>(1);

  const { data, isLoading, error } = useFetch<SearchResults>({
    url: search ? `/api/unsplash?search=${search}&page=${page}` : null,
  });

  const photos = "results" in data ? data.results : [];
  const totalPages = "total_pages" in data ? data.total_pages : 0;

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
      <main className={styles.photoSearch}>
        {search && (
          <h1 className={styles.title}>Risultati per &quot;{search}&quot;</h1>
        )}
        <Gallery
          photos={photos as PhotoType[]}
          totalPages={totalPages as number}
          page={page}
          setPage={setPage}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </>
  );
}
