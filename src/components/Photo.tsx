import { memo } from "react";
import Image from "next/image";
import { PhotoType } from "@/types/main";
import styles from "@/styles/components/photo.module.scss";

const onHandleZoom = () => {
  // TODO: open the detail page
};

const Photo = ({ photoData }: { photoData: PhotoType }) => {
  return (
    <>
      <Image
        className={styles.photo}
        onClick={onHandleZoom}
        src={photoData.urls.regular}
        width={photoData.width / 10}
        height={photoData.height / 10}
        priority={true}
        role="button"
        alt={photoData.alt_description}
      />
    </>
  );
};

export default memo(Photo);
