'use client';

import Link from 'next/link';
import Image from 'next/image';
import quizmonLogo from 'public/imgs/quizmon-logo.svg';
import BlurBackground from './BlurBackgrond';
import styles from 'app/styles/header.module.scss';
import { useEffect, useState } from 'react';

const Header = (): React.ReactNode => {
  // 반응형(모바일) 웹에서 search 컴포넌트의 노출 여부를 관리하기 위한 useState
  const [mobileSearchView, setMobileSearchView] = useState<boolean>(false);

  // 현재 웹 페이지의 내부 너비 값을 저장하기 위한 useState
  const [windowInnerWidth, setWindowInnerWidth] = useState<number>(0);

  // 반응형(모바일) 웹에서 search 컴포넌트의 노출 여부 상태를 변경하는 핸들러 함수
  const mobileSearchViewHandler = (): void => {
    setMobileSearchView(!mobileSearchView);
  };

  // 컴포넌트가 처음 마운트 될 때 브라우저의 창 크기가 변경되는 이벤트 리스너를 추가하기 위한 useEffect
  useEffect(() => {
    const windowSizeHandler = () => {
      const innerWidth = window.innerWidth;
      setWindowInnerWidth(innerWidth);
    };

    window.addEventListener('resize', windowSizeHandler);

    // 컴포넌트가 언마운트 되기 전에 호출되며 기존에 추가한 이벤트 리스너를 삭제하는 클린업 함수
    return (): void => {
      window.removeEventListener('resize', windowSizeHandler);
    };
  }, []);

  // 반응형(모바일) 웹 환경에서 검색 버튼이 클릭됐을 때 스크롤 기능을 막기 위한 useEffect
  useEffect(() => {
    if (mobileSearchView && windowInnerWidth <= 644) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      document.body.style.overflow = 'hidden';
    } else if (!mobileSearchView || windowInnerWidth > 644) {
      document.body.style.overflow = 'auto';
      setMobileSearchView(false);
    }
  }, [mobileSearchView, windowInnerWidth]);

  return (
    <header className={styles.wrapper}>
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
      {mobileSearchView ? (
        <div className={`${styles.search} ${styles.search_clicked}`}>
          <input
            className={styles.search_text}
            type="text"
            spellCheck="false"
          />
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
      ) : (
        <div className={styles.search}>
          <input
            className={styles.search_text}
            type="text"
            spellCheck="false"
          />
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
      )}
      <div className={styles.user}>
        <div className={styles.mobileSearch}>
          <svg
            className={styles.search_icon}
            onClick={mobileSearchViewHandler}
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <title>검색</title>
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </div>
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
        {false ? (
          <div className={styles.logout}>
            <Link href="/">
              <svg
                className={styles.logout_icon}
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <title>로그아웃</title>
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
              </svg>
            </Link>
          </div>
        ) : (
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
        )}
        {mobileSearchView ? (
          <div onClick={mobileSearchViewHandler}>
            <BlurBackground />
          </div>
        ) : (
          ''
        )}
      </div>
    </header>
  );
};

export default Header;
