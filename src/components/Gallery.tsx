import { memo } from "react";
import { useRouter } from "next/router";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Pagination from "rc-pagination";

import Spinner from "@/components/Spinner";
import Photo from "@/components/Photo";
import { PhotoType } from "@/types/main";
import styles from "@/styles/components/gallery.module.scss";
import "rc-pagination/assets/index.css";

interface GalleryType {
  photos: PhotoType[];
  totalPages?: number;
  page?: number;
  setPage?: Function;
  isLoading: boolean;
  error: string | null;
}

const Gallery = ({
  photos,
  totalPages = 0,
  page = 0,
  setPage = () => {},
  isLoading,
  error,
}: GalleryType) => {
  const router = useRouter();

  const updatePage = (page: number) => {
    setPage(page);
  };

  if (error) {
    return <div>Errore! Ricaricare la pagina o riprovare.{error}</div>;
  }

  return (
    <div
      className={`${styles.gallery} ${
        !router.route.includes("/photo/s/") && styles.noPaginationGrid
      }`}
    >
      <ResponsiveMasonry
        className={styles.grid}
        columnsCountBreakPoints={{ 576: 1, 656: 2, 992: 3 }}
      >
        <Masonry gutter="20px">
          {isLoading ? (
            <Spinner />
          ) : (
            photos.map((photo) => <Photo photoData={photo} key={photo.id} />)
          )}
        </Masonry>
      </ResponsiveMasonry>
      {totalPages > 0 && (
        <Pagination
          className={styles.pagination}
          current={page}
          pageSize={10}
          onChange={updatePage}
          total={totalPages}
        />
      )}
    </div>
  );
};

export default memo(Gallery);
