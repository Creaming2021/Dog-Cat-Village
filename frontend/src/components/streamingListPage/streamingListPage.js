import React, { useState } from 'react';
import styles from './streamingListPage.module.css';
import StreamingListItem from './streamingListItem';
import { Search } from '../common/common';


const streamingList = [
  {
    img: "https://picsum.photos/440/250",
    streamingName: "후원은 사랑입니다",
    shelterName: "동렬 아저씨의 동물농장",
    viewer: "123" 
  },
  {
    img: "https://picsum.photos/440/251",
    streamingName: "후원은 사랑입니다",
    shelterName: "해피 도그",
    viewer: "1233" 
  },
  {
    img: "https://picsum.photos/440/252",
    streamingName: "후원은 사랑입니다",
    shelterName: "캣 하우스",
    viewer: "7544"
  },
  {
    img: "https://picsum.photos/441/250",
    streamingName: "후원은 사랑입니다",
    shelterName: "몽키 몽키",
    viewer: "75123"
  },
  {
    img: "https://picsum.photos/441/251",
    streamingName: "후원은 사랑입니다",
    shelterName: "돼지 피그",
    viewer: "286123"
  },
  {
    img: "https://picsum.photos/441/252",
    streamingName: "후원은 사랑입니다",
    shelterName: "냥냥이 커넥트",
    viewer: "235"
  },
  {
    img: "https://picsum.photos/442/250",
    streamingName: "후원은 사랑입니다",
    shelterName: "고양이는 귀엽다",
    viewer: "6123"
  },
  {
    img: "https://picsum.photos/442/251",
    streamingName: "후원은 사랑입니다",
    shelterName: "매니 도네이션",
    viewer: "889"
  },
]

const StreamingListPage = () => {
  const [values, setValues] = useState({ first: 'shelterName', input: ''});
  return (
    <>
      <div>
        {/* 로고 */}
        {/*  네브바 */}
        {/* 마이페이지 아이콘  */}
      </div>
      <div className={styles['search-container']}>
        <Search
          selectList={[{ name: 'type', options: [
            { value: "shelterName", option: "보호소 이름"}
          ]
          }]}
          selectValue={values.first}
          inputValue={values.input}
          inputName={'keyword'}
          onSearch={() => {

          }}
          onChange={(e) => {

          }}
          placeholder={'검색어'}
          inputSize={'input-medium'}
        />
      </div>
      <div className={styles['main-container']}>
        {
          streamingList.map((data) => {
            return (
              <div className={styles['streaming-item-container']}>
                <StreamingListItem data={data} />
              </div>
            )
          })
        }
      </div>
    </>
  );
};

export default StreamingListPage;