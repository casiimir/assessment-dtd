import { useState, useEffect, memo } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { FaExpandAlt } from "react-icons/fa";

import useFetch from "@/hooks/useFetch";
import Comments from "@/components/Comments";
import PhotoDetailHeader from "@/components/PhotoDetailHeader";
import PhotoDetailInfo from "@/components/PhotoDetailInfo";
import PhotoDetailContent from "@/components/PhotoDetailContent";
import PhotoMax from "./PhotoMax";
import { PhotoType } from "@/types/main";
import styles from "@/styles/components/photoDetail.module.scss";

interface FavouriteCheckResponse {
  isPresent: boolean;
}

interface PhotoDetailProps {
  photoData: PhotoType;
}

const PhotoDetail = ({ photoData }: PhotoDetailProps) => {
  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPhotoClicked, setIsPhotoClicked] = useState<boolean>(false);
  const { data, error } = useFetch<FavouriteCheckResponse>({
    url: `/api/favourites?id=${photoData.id}`,
  });

  useEffect(() => {
    if (data && "isPresent" in data) {
      setIsFavourite((data as { isPresent: boolean }).isPresent);
    }
  }, [data]);

  const onHandleFavourite = async () => {
    try {
      if (isFavourite) {
        await axios.delete(`/api/favourites?id=${photoData.id}`);
        setIsFavourite(false);
        router.push("/favourites");
      } else {
        await axios.post(`/api/favourites`, { data: photoData });
        setIsFavourite(true);
        router.push("/favourites");
      }
    } catch (error) {
      console.error("Failed to update favourites:", error);
    }
  };

  if (isPhotoClicked) {
    return (
      <PhotoMax
        photoImage={photoData.urls.full}
        photoAlt={photoData.alt_description}
        closePhotoMax={() => setIsPhotoClicked(false)}
      />
    );
  }

  if (error) {
    console.error("Something went wrong with favourites state:", error);
  }

  return (
    <section className={styles.photoDetail}>
      <PhotoDetailHeader
        photoData={photoData}
        isFavourite={isFavourite}
        onClick={onHandleFavourite}
      />
      {!imageLoaded && <div className={styles.skeleton} />}
      <FaExpandAlt className={styles.expandIcon} />
      <Image
        className={`${styles.image}  ${
          imageLoaded ? styles.show : styles.hide
        }`}
        onClick={() => setIsPhotoClicked(true)}
        src={photoData.urls.regular}
        width={800}
        height={400}
        placeholder="blur"
        blurDataURL={photoData.urls.small}
        priority={true}
        alt={photoData.alt_description}
        onLoad={() => setImageLoaded(true)}
      />
      <PhotoDetailInfo photoData={photoData} />
      <PhotoDetailContent photoData={photoData} />
      <hr />
      <Comments photoId={photoData.id} />
    </section>
  );
};

export default memo(PhotoDetail);
