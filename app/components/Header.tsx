'use client';

import Link from 'next/link';
import Image from 'next/image';
import quizmonLogo from 'public/imgs/quizmon-logo.svg';
import styles from 'app/styles/header.module.scss';

const Header = (): React.ReactNode => {
  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            className={styles.logo_img}
            src={quizmonLogo}
            alt="quizmon"
            title="퀴즈몬"
            priority={true}
          />
        </Link>
      </div>
      <div className={styles.search}>
        <input className={styles.search_text} type="text" spellCheck="false" />
        <svg
          className={styles.search_icon}
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <title>검색</title>
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
      </div>
      <div className={styles.user}>
        <div className={styles.info}>
          <Link href="/user">
            <svg
              className={styles.info_icon}
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <title>회원정보</title>
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
          </Link>
        </div>
        <div className={styles.login}>
          <Link href="/login">
            <svg
              className={styles.login_icon}
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <title>로그인</title>
              <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
