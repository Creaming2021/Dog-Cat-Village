# AWS 서버 접속

1. CMD, Bash 등

    `ssh -i J4B106T.pem ubuntu@j4b106.p.ssafy.io`

2. putty 등 접속 프로그램 **(mobaXterm 사용)**

    1) puttygen으로 pem 파일을 ppk로 변환

    **[PEM ↔ PPK 포맷 변경하기](https://thekoguryo.github.io/oci/chapter03/5/3/)**

    2) ppk를 이용하여 접속 `ubuntu@j4b106.p.ssafy.io`

    - **🤬 Failed to** connect to http://changelogs.ubuntu.com/meta-release.... **ERROR**

# Docker 설치하기

1. 자동 설치 스크립트로 docker 설치하기

    ```
    curl -fsSL https://get.docker.com/ | sudo sh
    ```

2. docker version 확인

    ```
    docker version
    ```

3. sudo 없이 사용하자

    docker는 기본적으로 root 권한이 필요

    ```
    $ sudo usermod -aG docker $USER
    $ sudo su - $USER
    ```

# Docker MariaDB 설치하기

1. MariaDB 이미지 다운로드

    : 접속 후, 이미지 다운로드

    ```
    docker pull mariadb
    ```

2. MariaDB 컨테이너 추가 및 구동

    ```
    docker run —-name mariadb -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=yourpassword mariadb
    ```
    - `—name mariadb` : 컨테이너 이름을 mariadb로 지정
    - `-d` : 컨테이너를 백그라운드로 실행
    - `-p 3306:3306` : 호스트-컨테이너 간 포트 연결.
    - `-e MYSQL_ROOT_PASSWORD=yourpassword` : 컨테이너 내 환경변수 설정. root 계정의 패스워드를 yourpassword로 변경
    - `mariadb` : 다운로드 받은 이미지 이름

3. MariaDB 컨테이너와 MariaDB 접속

    : 컨테이너의 bash로 접속

    ```
    docker exec -it mariadb /bin/bash
    ```

    - 정상적으로 접속되면 root 계정으로 컨테이너의 bash에 접속이 된다.

    : 아래 커맨드로 MariaDB에 접속

    ```
    mysql -u root -p
    ```

    - 패스워드는 앞에서 입력한 MYSQL_ROOT_PASSWORD 값

    **‼️Characterset 변경 :** 한글을 쓰므로 Characterset을 지정해야한다.

    `status` : MariaDB 접속 후, MariaDB 상태 확인
    `exit` : MariaDB 접속 종료

    1. 파일 열기

        `vim /etc/mysql/my.cnf`

        **[🤬 vim command not found 오류](https://logical-code.tistory.com/122)**

    2. 내용 추가

        ```
        [client]
        default-character-set = utf8mb4

        [mysql]
        default-character-set = utf8mb4

        [mysqld]
        collation-server = utf8_unicode_ci
        init-connect='SET NAMES utf8'
        character-set-server = utf8
        ```

        - 저장 후 나가기 (Esc 누르기 + :wq!)
    3. 컨테이너 재가동 후 확인

        `docker restart mariadb`

        `docker exec -it mariadb /bin/bash`

        `mysql -u root -p` ⇒ 패스워드 입력

        `status`