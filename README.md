# 특화 프로젝트 Sub2
### 21.03.08 - 21.03.19

1. 아이디어 기획 회의
2. 블록체인 사용 방향 확정
3. 블록체인 사용 기술 선정 및 공부 진행

## 이더리움 공식문서
[https://ethereum.org/ko/](https://ethereum.org/ko/)

## 공부 방법
[좀비게임] (https://cryptozombies.io/ko/)   
[인프런 lottery 강의] (https://www.inflearn.com/course/ethereum-dapp)

# 마블 - 엔드게임 (B106)

# 👪팀원 소개

- 성진옥
- 김다윤
- 박성호
- 박지영
- 차민석

# 📅 프로젝트 개요

- **진행기간** : 2021.3.2 ~ 2021.4.9
- **목표**
    - 유기동물 보호소에 기부를 하고 싶은 사람,
    - 기부금의 사용내역을 투명하게 확인하고 싶은 사람,
    - 기부를 받고 싶은 유기동물 보호소,
    - 유기동물들의 랜선 집사가 되고 싶은 사람,
    - 유기동물을 입양 하고 싶은 사람,
    - 이 모든 사람들을 위한 웹 사이트 만들기
- **웹사이트 이름** :
    - 유기동물 보호소 후원 & 입양 매칭 서비스
- **마스코트 : 김쿠로, 3살**

    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5e0cb30a-a20e-4521-93c1-4e466ef83469/F353704C-2D78-4D56-BB06-8A4D408A168A.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5e0cb30a-a20e-4521-93c1-4e466ef83469/F353704C-2D78-4D56-BB06-8A4D408A168A.jpeg)

# 📘 Tech Log

- 1주차
- 2주차
- 3주차
- 4주차
- 5주차
- 6주차
- Convention

# 🖥 코딩 스타일 컨벤션

**자바** : [https://google.github.io/styleguide/javaguide.html](https://google.github.io/styleguide/javaguide.html)

(번역본 : [https://myeonguni.tistory.com/1596](https://myeonguni.tistory.com/1596))

**자바스크립트** : [https://google.github.io/styleguide/jsguide.html](https://google.github.io/styleguide/jsguide.html)

(번역본 : [https://velog.io/@cada/series/자바스크립트](https://velog.io/@cada/series/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8))

**HTML / CSS** : [https://google.github.io/styleguide/htmlcssguide.html](https://google.github.io/styleguide/htmlcssguide.html)

(번역본 : [https://velog.io/@rlatmdgns94/guide](https://velog.io/@rlatmdgns94/guide))

```
class 네이밍 - kebab-case 케밥 케이스 사용
id 네이밍 - camelCase 사용

네이밍은 목적가 형식에 맞게 작성한다. / Bad / masseages -> msg
네이밍의 조합은 '형태-의미-순서-상태'을 기본 순서로 사용한다.
네이밍 규칙의 언더스코어(_) 조합은 파일, 폴더, 이미지에 사용한다.

.btn-cancle-01-off{...}
```

**Jira atlassian** : [https://www.atlassian.com/ko/agile/project-management/epics-stories-themes](https://www.atlassian.com/ko/agile/project-management/epics-stories-themes)

**GitFlow :** [https://woowabros.github.io/experience/2017/10/30/baemin-mobile-git-branch-strategy.html](https://woowabros.github.io/experience/2017/10/30/baemin-mobile-git-branch-strategy.html)

**Commit 작성방법 :** [https://djkeh.github.io/articles/How-to-write-a-git-commit-message-kor/](https://djkeh.github.io/articles/How-to-write-a-git-commit-message-kor/)

**Commit 템플릿 만들어보기 :** [https://junwoo45.github.io/2020-02-06-commit_template/](https://junwoo45.github.io/2020-02-06-commit_template/)

```bash
// 템플릿 적용 시키기
git config commit.template .gittemplate

// 템플릿 이용해서 commit 하기
git commit

a 누르고 나오는 템플릿 양식에 맞춰서 
작성하여 esc -> :wq! 치고 저장하면 완료
저장 없이 취소 하고 싶을 때는 :q!
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6aeffd4d-bea0-45bb-a2a8-be2b34df9080/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6aeffd4d-bea0-45bb-a2a8-be2b34df9080/Untitled.png)

```jsx
[타입] 제목
제목은 최대 50 글자까지만 입력
#####################################

본문은 한 줄에 최대 72 글자까지만 입력
#####################################

꼬릿말은 아래에 작성: ex) 이슈 번호
#####################################

--- COMMIT END ---
[타입] 리스트
feat : 기능 (새로운 기능)
fix : 버그 (버그 수정)
refactor: 리팩토링
style : 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없음)
docs : 문서 (문서 추가, 수정, 삭제)
test : 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없음)
chore : 기타 변경사항 (빌드 스크립트 수정 등)
------------------
제목 첫 글자를 대문자로
제목은 명령문으로
제목 끝에 마침표(.) 금지
제목과 본문을 한 줄 띄워 분리하기
본문은 "어떻게" 보다 "무엇을", "왜"를 설명한다.
본문에 여러줄의 메시지를 작성할 땐 "-"로 구분
------------------
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a650df94-5b22-435d-bb85-745a324815cf/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a650df94-5b22-435d-bb85-745a324815cf/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7b90053b-588c-4d77-98b0-d63d727fe924/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7b90053b-588c-4d77-98b0-d63d727fe924/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5b427aeb-7e14-4843-aae8-4dc0b46d1e2a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5b427aeb-7e14-4843-aae8-4dc0b46d1e2a/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/53e5f766-4f48-4fe3-bf1d-4a76cbbe5dfe/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/53e5f766-4f48-4fe3-bf1d-4a76cbbe5dfe/Untitled.png)

- Proposal
- Wireframe
- Video Plan & Proposal

# ❗기술 흐름도

# 🔗Tech Stack

- **BlockChain**
- **Backend**

- **Frontend**
    - React
    - Redux
    - Typescript
    - Axios
    - Figma
- **협업툴**
    - GitLab
    - Jira
    - Swagger
    - Webex
    - Mattermost

# ⚙️Install and Usage

### Frontend

- frontend 폴더로 들어와 필요한 패키지를 설치합니다.

    ```java
    npm i
    ```

- frontend 폴더 (react 프로젝트)를 실행합니다.

    ```bash
    npm start
    ```

### Backend

# 📕 파일 구조

# ⭐주요 기능

### 개인 유저 Profile

- 회원 정보 RUD
- 내 지갑 주소, 금액, 내역 확인
- 내가 후원하고 있는 보호소 목록

### 보호소 유저 Profile

- 회원 정보 RUD
- 내 지갑 주소, 금액, 내역 확인
- 월별 후원 받은 금액 확인
- 월별 입양 보낸 동물 수 확인

### 보호소 유저 메인 페이지

- 소개글
- 사이트 링크
- 메인 배너 이미지
- 보호소 전화번호
- 보호소 이메일
- 후원 누적 금액
- 후원 사람 수 / 명단
- 보호 하고 있는 동물 CRUD
- 보호소 평가 내용 ( 별점, 글 등등 )

    ⇒ 작성 조건 미정

- 공지사항 / 게시판 + 댓글 기능

### 보호소 스트리밍

- 실시간 영상 송출
- 실시간 채팅
- 실시간 후원
- 정기 후원 신청
- 시청자 수, 좋아요, 방송 시작 후 모금 금액
- 방송 시간

### 보호소 검색

- 검색 필터 :  보호소 이름, 지역
- 정렬 필터 : 랜덤화 (default), 보호소 이름 순
- 이름, 썸네일, 소개글, 후원하고 있는 사람 수, 보호하고 있는 동물 수, 현재 라이브 진행 여부 정보 제공
- 클릭시 보호소 메인 페이지로 이동

### 유기 동물 검색

- 검색 필터 : 개 / 고양이, 지역
- 정렬 필터 : 랜덤 (default), 안락사 시기 순
- 이름, 썸네일, 성별, 나이, 보호소 이름 정보 제공
- 클릭시 동물 상세 페이지로 이동

### 유기 동물

- 이름, 이미지, 성별, 나이, 안락사 예정 날짜, 성격, 특징, 발견 장소 정보 조회
- 보호소 유저가 소개글 CRUD

# 👀페이지 소개

# 🎞️최종 산출물

- **최종 발표 UCC**
- **최종 발표 pdf**
- **시연 영상**