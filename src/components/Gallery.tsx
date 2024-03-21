import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Photo from "@/components/Photo";
import { PhotoType } from "@/types/main";
import styles from "@/styles/components/gallery.module.scss";

interface GalleryType {
  photos: PhotoType[];
  isLoading: boolean;
  error: string;
}

const Gallery = ({ photos, isLoading, error }: GalleryType) => {
  // TODO: add spinner component
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.gallery}>
      <ResponsiveMasonry columnsCountBreakPoints={{ 576: 1, 656: 2, 992: 3 }}>
        <Masonry gutter="20px">
          {photos.map((photo) => (
            <Photo photoData={photo} key={photo.id} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Gallery;
