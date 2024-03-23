import { useState, useEffect, memo } from "react";
import Image from "next/image";
import axios from "axios";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";

import Comments from "@/components/Comments";
import PhotoDetailHeader from "@/components/PhotoDetailHeader";
import PhotoDetailInfo from "@/components/PhotoDetailInfo";
import PhotoDetailContent from "@/components/PhotoDetailContent";
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
      <Image
        className={styles.image}
        src={photoData.urls.regular}
        width={1024}
        height={1024}
        placeholder="blur"
        blurDataURL={photoData.urls.thumb}
        priority={true}
        alt={photoData.alt_description}
      />
      <PhotoDetailInfo photoData={photoData} />
      <PhotoDetailContent photoData={photoData} />
      <hr />
      <Comments photoId={photoData.id} />
    </section>
  );
};

export default memo(PhotoDetail);
