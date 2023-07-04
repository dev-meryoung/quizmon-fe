'use client';

import Image from 'next/image';
import styles from 'app/styles/policy.module.scss';
import Link from 'next/link';
import quizmonLogo from 'public/imgs/quizmon-logo.svg';

const Policy = (): React.ReactNode => {
  return (
    <div className={styles.container}>
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
      <div className={styles.contents}>
        <p className={styles.mainTitle}>[ 개인정보처리방침 ]</p>
        <p className={styles.subTitle}>1. 수집하는 개인정보의 항목 </p>
        <p className={styles.text}>
          퀴즈몬은 서비스 제공을 위해 필요한 범위 내에서 최소한의 개인정보를
          수집합니다. 다음은 주로 수집하는 개인정보의 항목입니다. <br />- 신규
          회원 가입 시 : 아이디, 비밀번호 <br />- 서비스 이용 과정에서 생성되는
          정보 : IP 주소, 쿠키, 서비스 이용 기록
        </p>
        <p className={styles.subTitle}>2. 개인정보의 수집 및 이용 목적</p>
        <p className={styles.text}>
          퀴즈몬은 수집한 개인정보를 다음과 같은 목적으로 이용합니다.
          <br />- 서비스 제공 및 운영 : 이용자와의 원활한 커뮤니케이션, 서비스
          제공, 문제 해결
          <br />- 이용자 식별 및 회원 관리 : 회원 서비스 이용에 따른 개인 식별,
          부정 사용 방지, 가입 처리
        </p>
        <p className={styles.subTitle}>3. 개인정보의 보유 및 이용 기간</p>
        <p className={styles.text}>
          퀴즈몬은 개인정보 보유 및 이용 기간을 명확히 정하고, 기간이 경과하거나
          목적이 달성된 경우 지체 없이 파기합니다. 단, 관련 법규에 의해 보존할
          필요성이 있는 경우에는 해당 법령에서 정한 기간 동안 보관됩니다.
        </p>
        <p className={styles.subTitle}>4. 개인정보의 제공 및 공유</p>
        <p className={styles.text}>
          퀴즈몬은 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 다만,
          다음과 같은 경우에는 예외적으로 개인정보를 제공할 수 있습니다.
          <br />- 이용자가 사전에 동의한 경우 <br />- 법령에 따라 제공이
          요구되는 경우
        </p>
        <p className={styles.subTitle}> 5. 개인정보의 안전성과 보호조치</p>
        <p className={styles.text}>
          퀴즈몬은 이용자의 개인정보를 안전하게 보호하기 위해 필요한 기술적,
          관리적, 물리적 보호조치를 취하고 있습니다. 개인정보 처리 시스템에 대한
          접근 제한, 권한 관리, 암호화 등을 통해 이용자의 개인정보를 안전하게
          보호하고 있습니다.
        </p>
        <p className={styles.subTitle}>6. 이용자의 권리와 행사 방법</p>
        <p className={styles.text}>
          퀴즈몬은 법령이나 정책 변경에 따라 개인정보처리방침을 업데이트할 수
          있습니다. 개인정보처리방침의 변경 사항은 웹사이트를 통해 공지됩니다.
          변경 사항이 중요한 내용 변경이거나 이용자의 권리에 중대한 영향을
          미치는 경우에는 별도의 추가 공지사항을 통해 알립니다.
        </p>
        <p className={styles.subTitle}>7. 개인정보 관련 문의</p>
        <p className={styles.text}>
          개인정보 처리에 관한 문의사항이 있을 경우, 아래 이메일로 문의해 주시기
          바랍니다. <br />
          - 이메일: quizmon.main@gmail.com <br />
          개인정보 처리에 대한 자세한 내용은 개인정보처리방침 전문을 참고해
          주시기 바랍니다.
        </p>
      </div>
    </div>
  );
};

export default Policy;
