import { useEffect, useState, memo } from "react";
import Image from "next/image";
import { FaRegHeart, FaHeart, FaCalendar, FaCamera } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { PhotoType } from "@/types/main";
import Comments from "@/components/Comments";
import styles from "@/styles/components/photoDetail.module.scss";
import axios from "axios";

interface PhotoDetailProps {
  photoData: PhotoType;
}

const PhotoDetail = ({ photoData }: PhotoDetailProps) => {
  const [isFavourite, setFavourite] = useState<boolean>(false);

  useEffect(() => {
    const checkFavouriteStatus = async () => {
      try {
        const response = await axios.get(`/api/favourites?id=${photoData.id}`);

        setFavourite(response.data.isPresent);
      } catch (err) {
        console.error(err);
      }
    };

    checkFavouriteStatus();
  }, [photoData.id]);

  const onHandleFavourite = async () => {
    try {
      if (isFavourite) {
        await axios.delete(`/api/favourites?id=${photoData.id}`);
        setFavourite(false);
      } else {
        await axios.post(`/api/favourites`, { data: photoData });
        setFavourite(true);
      }
    } catch (err) {
      const error = axios.isAxiosError(err)
        ? err.message
        : "An unexpected error occurred";

      console.error("Failed to add favourites:", error);
    }
  };

  return (
    <section className={styles.photoDetail}>
      <div className={styles.header}>
        <Image
          className={styles.header__icon}
          src={photoData.user.profile_image.medium}
          alt={photoData.user.name}
          width={40}
          height={40}
          priority={true}
        />
        <ul className={styles.header__info}>
          <li className={styles.header__info_name}>{photoData.user.name}</li>
          <li className={styles.header__info_url}>
            <a href={photoData.user.portfolio_url}>
              {photoData.user.portfolio_url}
            </a>
          </li>
        </ul>
        <button
          className={styles.header__favourite}
          onClick={onHandleFavourite}
        >
          {isFavourite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

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
      <ul className={styles.info}>
        <li className={styles.info__views}>
          <p className={styles.info__views_text}>Visualizzazioni</p>
          <p className={styles.info__views_value}>{photoData.views}</p>
        </li>
        <li className={styles.info__downloads}>
          <p className={styles.info__downloads_text}>Downloads</p>
          <p className={styles.info__downloads_value}>{photoData.downloads}</p>
        </li>
      </ul>
      <ul className={styles.content}>
        {photoData.location.name && (
          <li className={styles.content__location}>
            <MdLocationOn />
            <span>{photoData.location.name}</span>
          </li>
        )}
        {photoData.location.created_at && (
          <li className={styles.content__calendar}>
            <FaCalendar />
            <p>{photoData.location.created_at}</p>
          </li>
        )}
        {photoData.exif.name && (
          <li className={styles.content__camera}>
            <FaCamera />
            <p>{photoData.exif.name}</p>
          </li>
        )}
      </ul>
      <hr />
      <Comments photoId={photoData.id} />
    </section>
  );
};

export default memo(PhotoDetail);
