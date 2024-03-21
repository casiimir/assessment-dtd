import { useState, useEffect } from "react";
import axios from "axios";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Photo from "@/components/Photo";
import { PhotoType } from "@/types/main";
import styles from "@/styles/components/gallery.module.scss";

const Gallery = () => {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get("/api/unsplash");

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
