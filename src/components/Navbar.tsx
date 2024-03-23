import { useState, FormEvent, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaImage, FaHeart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

import { randWordGen } from "@/utils";
import styles from "@/styles/components/navbar.module.scss";

const Navbar = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string | string[]>(
    router.query.search || ""
  );

  const isFavouritesPage = router.pathname.includes("favourites");

  useEffect(() => {
    if (router.query.search) {
      setInputValue(router.query.search);
    }
  }, [router.query.search]);

  const onHandleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const searchQuery = inputValue || randWordGen();

    router.push(`/photo/s/${searchQuery}`);
  };

  const onHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const onHandleClearButton = () => setInputValue("");

  const onClickPhoto = () => router.push("/");

  const onClickFavourites = () => {
    router.push("/favourites");
    setInputValue("");
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" passHref>
        <Image
          className={styles.logo}
          src="/images/logo.svg"
          width={200}
          height={200}
          alt="Cerca Foto logo"
          priority={true}
        />
      </Link>
      <form onSubmit={onHandleSubmit}>
        <button
          type="reset"
          className={styles.searchIcon}
          onClick={onHandleClearButton}
        >
          <IoSearch />
        </button>
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          onChange={onHandleInputChange}
          placeholder="Cerca..."
        />
        {inputValue && (
          <button
            type="reset"
            className={styles.clearButton}
            onClick={onHandleClearButton}
          >
            x
          </button>
        )}
      </form>
      <ul className={styles.category}>
        <li
          className={`${styles.item} ${
            !isFavouritesPage ? styles.activeItem : ""
          }`}
          onClick={onClickPhoto}
        >
          <FaImage />
          <p>Foto</p>
        </li>
        <li
          className={`${styles.item} ${
            isFavouritesPage ? styles.activeItem : ""
          }`}
          onClick={onClickFavourites}
        >
          <FaHeart />
          <p>Preferiti</p>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
