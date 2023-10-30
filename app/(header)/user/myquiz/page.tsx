'use client';

import { useEffect, useState } from 'react';
import styles from 'app/styles/myQuiz.module.scss';
import Filter from 'app/components/Filter';
import QuizCard from 'app/components/QuizCard';
import LoadingSpinner from 'app/components/LoadingSpinner';
import { useRouter, useSearchParams } from 'next/navigation';
import { useNewQuizList } from 'app/hooks/useNewQuizList';
import { useAllHotQuizList } from 'app/hooks/useAllHotQuizList';
import { useRTHotQuizList } from 'app/hooks/useRTHotQuizList';
import Image from 'next/image';
import noneQuizImg from 'public/imgs/none-quiz.svg';

export interface QuizListArray {
  comment: string;
  limitTime: number;
  playCount: number;
  quizId: string;
  reportCount: number;
  thumbnailUrl: string;
  timeStamp: string;
  title: string;
  type: string;
  urlId: string;
}

const Home = (): React.ReactNode => {
  // 페이지 이동을 위한 useRouter
  const router = useRouter();

  // 쿼리 파라미터 값을 사용하기 위한 useSearchParams
  const params = useSearchParams();

  // 메인 페이지의 마운트 상태를 관리하기 위한 useState
  const [mounted, setMounted] = useState<boolean>(false);

  // 퀴즈 필터 상태를 관리하기 위한 useState
  const [quizFilter1, setQuizFilter1] = useState<number>(1); // (1 : 최신순, 2 : 인기순)
  const [quizFilter2, setQuizFilter2] = useState<number>(1); // (1 : 누적(인기), 2 : 실시간(인기))

  // 관리자 필터 상태를 관리하기 위한 useState
  const [adminQuizFilter1, setAdminQuizFilter1] = useState<number>(2); // (1 : 신고순 ON, 2 : 신고순 OFF)
  const [adminQuizFilter2, setAdminQuizFilter2] = useState<number>(2); // (1 : 전체 공개글, 2 : 공개 퀴즈, 3 : 비공개 퀴즈)

  // 필터에 따른 정렬 상태을 관리하기 위한 useState
  const [filterState, setFilterState] = useState<number[]>([1, 2]); // (1 : 최신순, 2 : 실시간 인기순, 3 : 누적 인기순, 4 : 신고순 / 1 : 전체, 2 : 공개, 3 : 비공개)

  // 퀴즈 목록 데이터 요청 여부를 관리하기 위한 useState
  const [queAPI, setQueAPI] = useState<boolean>(false);

  // 다음 퀴즈 목록 최신순 데이터 요청 시 필요한 가장 마지막 퀴즈의 생성 시간을 관리하기 위한 useState
  const [timeStamp, setTimeStamp] = useState<string | null>(null);

  // 다음 퀴즈 목록 인기순 데이터 요청 시 필요한 가장 마지막 퀴즈의 순번을 관리하기 위한 useState
  const [seqNum, setSeqNum] = useState<number>(0);

  // 불러온 퀴즈 데이터가 없을 경우 나타낼 이미지 노출을 관리하기 위한 useState
  const [showNoneImg, setShowNoneImg] = useState<boolean>(false);

  // 불러온 퀴즈 목록 데이터를 관리하기 위한 useState
  const [quizListArray, setQuizListArray] = useState<QuizListArray[]>([]);

  // 메인 페이지에서 발생하는 모달 메시지를 관리하기 위한 useState
  const [modalMsg, setModalMsg] = useState<string>('');

  // 메인 페이지에서 발생하는 인포 모달의 노출 여부를 관리하는 useState
  const [viewInfoModal, setViewInfoModal] = useState<boolean>(false);

  // 메인 페이지에서 발생하는 관리자 모달의 노출 여부를 관리하는 useState
  const [viewAdminModal, setViewAdminModal] = useState<boolean>(false);

  // 최신순 퀴즈 목록 불러오기 관련 useQuery
  const {
    newQuizListData,
    newQuizListRefetch,
    isNewQuizListLoading,
    isNewQuizListSuccess,
    isNewQuizListError,
    newQuizListError,
  } = useNewQuizList(filterState, params.get('keyword'), timeStamp);

  // 누적 인기순 퀴즈 목록 불러오기 관련 useQuery
  const {
    allHotQuizListData,
    allHotQuizListRefetch,
    isAllHotQuizListLoading,
    isAllHotQuizListSuccess,
    isAllHotQuizListError,
    allHotQuizListError,
  } = useAllHotQuizList(filterState, params.get('keyword'), seqNum);

  // 실시간 인기순 퀴즈 목록 불러오기 관련 useQuery
  const {
    rtHotQuizListData,
    rtHotQuizListRefetch,
    isRTHotQuizListLoading,
    isRTHotQuizListSuccess,
    isRTHotQuizListError,
    rtHotQuizListError,
  } = useRTHotQuizList(filterState, params.get('keyword'), seqNum);

  // 스크롤 이벤트가 발생했을 때 실행할 핸들러 함수
  const scrollHandler = (): void => {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const bodyHeight = document.body.offsetHeight;

    // 현재 스크롤 위치 + 창의 높이 >= 문서의 전체 높이일 때 최하단에 도착
    if (scrollY + windowHeight + 32 >= bodyHeight) {
      setQueAPI(true);
    } else {
      setQueAPI(false);
    }
  };

  // 내가 만든 퀴즈 버튼이 클릭되었을 때 동작하는 myQuizBtnHandler 함수
  const backBtnHandler = (): void => {
    router.push('/user');
  };

  // 모달 창을 닫기 위한 핸들러 함수
  const modalCloseHandler = (): void => {
    setViewAdminModal(false);
    setViewInfoModal(false);
    setModalMsg('');
  };

  // 최초 회원정보 페이지 마운트 과정을 관리하기 위한 useEffect
  useEffect(() => {
    setMounted(true);

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', scrollHandler);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  // 퀴즈 필터와 관리자 필터의 조작을 관리하기 위한 useEffect
  useEffect(() => {
    if (quizFilter1 === 1 || quizFilter1 === 2) {
      setAdminQuizFilter1(2);
    }
  }, [quizFilter1]);

  useEffect(() => {
    if (adminQuizFilter1 === 1) {
      setQuizFilter1(3);
    } else if (adminQuizFilter1 === 2) {
      setQuizFilter1(1);
    }
  }, [adminQuizFilter1]);

  // 퀴즈 필터의 변경 시 일어나는 과정을 관리하기 위한 useEffect
  useEffect(() => {
    setSeqNum(0);
    setTimeStamp(null);

    if (quizFilter1 === 1) {
      if (adminQuizFilter2 === 1) {
        setFilterState([1, 1]);
      } else if (adminQuizFilter2 === 2) {
        setFilterState([1, 2]);
      } else {
        setFilterState([1, 3]);
      }
    } else if (quizFilter1 === 2 && quizFilter2 === 1) {
      if (adminQuizFilter2 === 1) {
        setFilterState([3, 1]);
      } else if (adminQuizFilter2 === 2) {
        setFilterState([3, 2]);
      } else {
        setFilterState([3, 3]);
      }
    } else if (quizFilter1 === 2 && quizFilter2 === 2) {
      if (adminQuizFilter2 === 1) {
        setFilterState([2, 1]);
      } else if (adminQuizFilter2 === 2) {
        setFilterState([2, 2]);
      } else {
        setFilterState([2, 3]);
      }
    } else if (adminQuizFilter1 === 1) {
      if (adminQuizFilter2 === 1) {
        setFilterState([4, 1]);
      } else if (adminQuizFilter2 === 2) {
        setFilterState([4, 2]);
      } else {
        setFilterState([4, 3]);
      }
    }
  }, [quizFilter1, quizFilter2, adminQuizFilter1, adminQuizFilter2]);

  // 정렬 상태에 따라 데이터를 요청하는 과정을 관리하기 위한 useEffect
  useEffect(() => {
    if (filterState[0] === 1) {
      newQuizListRefetch();
    } else if (filterState[0] === 2) {
      rtHotQuizListRefetch();
    } else if (filterState[0] === 3) {
      allHotQuizListRefetch();
    }
  }, [
    filterState,
    newQuizListRefetch,
    allHotQuizListRefetch,
    rtHotQuizListRefetch,
  ]);

  // 페이지 하단에서의 무한 스크롤 과정을 관리하기 위한 useEffect
  useEffect(() => {
    if (queAPI) {
      if (filterState[0] === 1) {
        newQuizListRefetch();
      } else if (filterState[0] === 3) {
        allHotQuizListRefetch();
      } else if (filterState[0] === 2) {
        rtHotQuizListRefetch();
      }
    }
  }, [
    queAPI,
    filterState,
    newQuizListRefetch,
    allHotQuizListRefetch,
    rtHotQuizListRefetch,
  ]);

  // 퀴즈 목록을 불러오는 과정을 관리하기 위한 useEffect
  useEffect(() => {
    !queAPI ? setQuizListArray([]) : '';
    setShowNoneImg(false);

    if (newQuizListData && filterState[0] === 1) {
      setQuizListArray((quizListArray) => [
        ...quizListArray,
        ...newQuizListData.quizArray,
      ]);
      setShowNoneImg(true);
    } else if (allHotQuizListData && filterState[0] === 3) {
      setQuizListArray((quizListArray) => [
        ...quizListArray,
        ...allHotQuizListData.quizArray,
      ]);
      setShowNoneImg(true);
    } else if (rtHotQuizListData && filterState[0] === 2) {
      setQuizListArray((quizListArray) => [
        ...quizListArray,
        ...rtHotQuizListData.quizArray,
      ]);
      setShowNoneImg(true);
    }
  }, [filterState, newQuizListData, allHotQuizListData, rtHotQuizListData]);

  // 무한 스크롤에 사용되는 정보를 관리하기 위한 useEffect
  useEffect(() => {
    if (
      filterState[0] === 1 &&
      newQuizListData &&
      newQuizListData.quizArray.length >= 20
    ) {
      setTimeStamp(newQuizListData.quizArray[19].timeStamp);
    } else if (
      filterState[0] === 3 &&
      allHotQuizListData &&
      allHotQuizListData.quizArray.length >= 20
    ) {
      setSeqNum((seqNum) => seqNum + allHotQuizListData.quizArray.length + 1);
    } else if (
      filterState[0] === 2 &&
      rtHotQuizListData &&
      rtHotQuizListData.quizArray.length >= 20
    ) {
      setSeqNum((seqNum) => seqNum + rtHotQuizListData.quizArray.length + 1);
    }
  }, [filterState, newQuizListData, allHotQuizListData, rtHotQuizListData]);

  return (
    <>
      {isNewQuizListLoading ||
      isAllHotQuizListLoading ||
      isRTHotQuizListLoading ? (
        <LoadingSpinner />
      ) : (
        ''
      )}
      <main className={styles.container}>
        <div className={styles.contents}>
          <div className={styles.title}>
            <p className={styles.title_text}>내가 만든 퀴즈</p>
            <div className={styles.back}>
              <svg
                className={styles.back_icon}
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
                onClick={backBtnHandler}
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
            </div>
          </div>
          <div className={styles.filterMore}>
            <div className={styles.quizFilter}>
              <div className={styles.quizFilterSet}>
                <Filter
                  op1="최신순"
                  op2="인기순"
                  filterFocused={quizFilter1}
                  setFilterFocused={setQuizFilter1}
                />
                {quizFilter1 === 2 ? (
                  <Filter
                    op1="누적"
                    op2="실시간"
                    filterFocused={quizFilter2}
                    setFilterFocused={setQuizFilter2}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className={styles.more}></div>
          </div>

          <div className={styles.quizList}>
            {!showNoneImg ? (
              ''
            ) : quizListArray.length > 0 ? (
              quizListArray.map((data) => {
                return <QuizCard key={data.quizId} data={data} />;
              })
            ) : (
              <div className={styles.noneQuiz}>
                <Image
                  className={styles.noneQuiz_img}
                  src={noneQuizImg}
                  alt="none"
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
