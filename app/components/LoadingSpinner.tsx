'use client';

import styles from 'app/styles/loadingSpinner.module.scss';
import Image from 'next/image';
import spinnerIcon from 'public/imgs/spinner-icon.svg';

const LoadingSpinner = (): React.ReactNode => {
  return (
    <>
      <div className={styles.wrapper}>
        <Image className={styles.spinner_img} src={spinnerIcon} alt="스피너" />
      </div>
    </>
  );
};

export default LoadingSpinner;
