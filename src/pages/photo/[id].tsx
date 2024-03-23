import Head from "next/head";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import PhotoDetail from "@/components/PhotoDetail";
import Spinner from "@/components/Spinner";

import { PhotoType } from "@/types/main";
import styles from "@/styles/pages/photo_id.module.scss";

export default function Photo_id() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: photo,
    isLoading,
    error,
  } = useFetch<PhotoType>({
    url: id ? `/api/unsplash?id=${id}` : "",
  });

  if (!id) {
    return <Spinner />;
  }

  if (error || !id) {
    return <div>Errore! Ricaricare la pagina o riprovare. {error}.</div>;
  }

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
      <main className={styles.photo_id}>
        {isLoading ? (
          <Spinner />
        ) : "id" in photo ? (
          <PhotoDetail photoData={photo as any} />
        ) : (
          <p>Foto non trovata...</p>
        )}
      </main>
    </>
  );
}
