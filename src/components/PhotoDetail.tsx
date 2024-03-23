import { useState, useEffect, memo } from "react";
import Image from "next/image";
import axios from "axios";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { MdLocationOn } from "react-icons/md";
import { FaRegHeart, FaHeart, FaCalendar, FaCamera } from "react-icons/fa";
import Comments from "@/components/Comments";
import { PhotoType } from "@/types/main";

import styles from "@/styles/components/photoDetail.module.scss";
import PhotoDetailHeader from "./PhotoDetailHeader";
import PhotoDetailInfo from "./PhotoDetailInfo";
import PhotoDetailContent from "./PhotoDetailContent";

interface PhotoDetailProps {
  photoData: PhotoType;
}

const PhotoDetail = ({ photoData }: PhotoDetailProps) => {
  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const { data, isLoading, error } = useFetch<{ isPresent: boolean }>({
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
