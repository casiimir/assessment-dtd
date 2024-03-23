import Image from "next/image";
import { PhotoType } from "@/types/main";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "@/styles/components/photoDetailHeaderProps.module.scss";

interface PhotoDetailHeaderProps {
  photoData: PhotoType;
  isFavourite: boolean;
  onClick: () => void;
}

const PhotoDetailHeader = ({
  photoData,
  isFavourite,
  onClick,
}: PhotoDetailHeaderProps) => {
  const {
    user: { profile_image, name, portfolio_url },
  } = photoData;

  return (
    <div className={styles.photoDetailHeader}>
      <Image
        className={styles.photoDetailHeader__icon}
        src={profile_image.small}
        alt={name}
        width={40}
        height={40}
      />
      <ul className={styles.photoDetailHeader__info}>
        <li className={styles.photoDetailHeader__info_name}>{name}</li>
        <li className={styles.photoDetailHeader__info_url}>
          <a href={portfolio_url}>{portfolio_url}</a>
        </li>
      </ul>
      <button className={styles.photoDetailHeader__favourite} onClick={onClick}>
        {isFavourite ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  );
};

export default PhotoDetailHeader;
