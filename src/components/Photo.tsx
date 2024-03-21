import { memo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { PhotoType } from "@/types/main";
import styles from "@/styles/components/photo.module.scss";

const Photo = ({ photoData }: { photoData: PhotoType }) => {
  const router = useRouter();

  const onHandleZoom = () => router.push(`/photo/${photoData.id}`);

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
        placeholder="blur"
        blurDataURL={photoData.urls.thumb}
        alt={photoData.alt_description}
      />
    </>
  );
};

export default memo(Photo);
