'use client';

import styles from 'app/styles/infomation.module.scss';
import { useState } from 'react';

// Infomation 컴포넌트의 props 타입 interface
export interface Options {
  infomation: string;
}

const Infomation = (props: Options): React.ReactNode => {
  // 설명창의 노출 여부를 관리하는 useState
  const [viewInfoBox, setViewInfoBox] = useState<boolean>(false);

  const iconMouseEventHandler = (): void => {
    setViewInfoBox(!viewInfoBox);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <svg
          className={styles.info_icon}
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
        <div className={styles.infoBox}>{props.infomation}</div>
      </div>
    </>
  );
};

export default Infomation;
