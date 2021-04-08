## Convention

### Code Convention
- [Java](https://google.github.io/styleguide/javaguide.html )
    - [Java 번역본](https://myeonguni.tistory.com/1596 ) 
- [JavaScript](https://google.github.io/styleguide/jsguide.html)
    - [JavaScript 번역본](https://velog.io/@cada/series/자바스크립트)
- [HTML/CSS](https://google.github.io/styleguide/htmlcssguide.html)
    - [HTML/CSS 번역본](https://velog.io/@rlatmdgns94/guide)

### Git Commit Template
+ Template
```
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
+ Template 만들기
    ```
    // 템플릿 적용 시키기
    git config commit.template .gittemplate
    git config --global core.commentChar ';'

    // 템플릿 이용해서 commit 하기
    git commit

    a 누르고 나오는 템플릿 양식에 맞춰서 
    작성하여 esc -> :wq! 치고 저장하면 완료
    저장 없이 취소 하고 싶을 때는 :q!
    ```

### Git Flow
![gitflow](./document/img/gitflow.png)

> 참고
+ [Commit 작성방법](https://djkeh.github.io/articles/How-to-write-a-git-commit-message-kor/)
+ [Commit 템플릿 만들어보기](https://junwoo45.github.io/2020-02-06-commit_template/)