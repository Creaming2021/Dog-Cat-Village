package BOJ;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main_13459_구슬탈출 {

    static int N, M;
    static char[][] toy;
    static boolean[][][][] visit;
    static Loc hole;

    public static void main(String[] args) throws IOException {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());
        toy = new char[N][M];
        visit = new boolean[N][M][N][M];

        Loc blue = null;
        Loc red = null;

        for (int i = 0; i < N; i++) {
            char[] input = br.readLine().toCharArray();
            for (int j = 0; j < M; j++) {
                if (input[j] == 'B') blue = new Loc(i, j);
                else if (input[j] == 'R') red = new Loc(i, j);
                else if (input[j] == 'O') hole = new Loc(i, j);
                else {
                    toy[i][j] = input[j];
                }
            }
        }

        System.out.println(bfs(blue, red));
        br.close();
    }

    static int bfs(Loc b, Loc r) {

        Queue<Loc[]> q = new LinkedList<>();
        // 방문처리
        visit[b.x][b.y][r.x][r.y] = true;
        q.add(new Loc[] {b, r});

        int cnt = 1;
        while (!q.isEmpty() && cnt <= 10) {
            int size = q.size();
            for (int s = 0; s < size; s++) {
                Loc[] loc = q.poll();
                Loc blue = loc[0];
                Loc red = loc[1];
                Loc tempBlue, tempRed;

                // 상 0 하 1 좌 2 우 3
                for (int i = 0; i < 4; i++) {
                    tempBlue = new Loc(blue.x, blue.y);
                    tempRed = new Loc(red.x, red.y);
                    int upResult = check(tempBlue, tempRed, i);
                    if (upResult == 1) {                        // 그냥 진행
                        q.add(new Loc[]{tempBlue, tempRed});
                        visit[tempBlue.x][tempBlue.y][tempRed.x][tempRed.y] = true;
                    }
                    else if (upResult == 2) return 1;           // 빨간 구슬이 구멍에 들어갔을 때
                }
            }
            // 횟수 증가
            cnt++;
        }

        return 0;
    }


    static int check(Loc b, Loc r, int type) {

        Loc first, second;
        boolean moveCheck = true;
        boolean isRedHole = false;

        if (type == 0) {        // 상
            // 먼저 이동할 구슬 선택
            if (b.x < r.x) {
                first = b;
                second = r;
            } else {
                first = r;
                second = b;
            }
        } else if (type == 1) { // 하
            if (b.x > r.x) {
                first = b;
                second = r;
            } else {
                first = r;
                second = b;
            }
        } else if (type == 2) { // 좌
            if (b.y < r.y) {
                first = b;
                second = r;
            } else {
                first = r;
                second = b;
            }
        } else {                // 우
            if (b.y > r.y) {
                first = b;
                second = r;
            } else {
                first = r;
                second = b;
            }
        }

        while(first.isMove || second.isMove) {
            // 구슬 이동
            if (first.isMove) {
                first.isMove = first.move(type);
            }
            if (second.isMove) {
                second.isMove = second.move(type, first);
            }

            // 한번이라도 움직였는지 확인
            if (moveCheck && (first.isMove || second.isMove)) moveCheck = false;
            // 한번도 안 움직이면 탈출
            if (moveCheck) return -1;

            // 구멍에 들어갔는지 확인하기
            // 파랑이 구멍에 들어가면 그냥 끝
            if (b.x == hole.x && b.y == hole.y) return -1;
            if (r.x == hole.x && r.y == hole.y) {
                r.isMove = false;
                isRedHole = true;
                // 사라지게 처리
                r.x = -100;
                r.y = -100;
            }
        }

        return isRedHole ? 2 : 1;
    }

    static class Loc {
        int x, y;
        boolean isMove;

        public Loc(int x, int y) {
            this.x = x;
            this.y = y;
            this.isMove = true;
        }

        public boolean move(int type) {
            // 이동 가능 여부 확인 후 이동
            if (type == 0) {
                if (x - 1 >= 0 && toy[x-1][y] != '#') this.x--;
                else return false;
            } else if (type == 1) {
                if (x + 1 < N && toy[x+1][y] != '#') this.x++;
                else return false;
            } else if (type == 2) {
                if (y - 1 >= 0 && toy[x][y-1] != '#') this.y--;
                else return false;
            } else {
                if (y + 1 < M && toy[x][y+1] != '#') this.y++;
                else return false;
            }

            return true;
        }

        public boolean move(int type, Loc loc) {
            // 이동 가능 여부 확인 후 이동
            if (type == 0) {
                if (x - 1 >= 0 && toy[x-1][y] != '#' && (x - 1 != loc.x || y != loc.y)) this.x--;
                else return false;
            } else if (type == 1) {
                if (x + 1 < N && toy[x+1][y] != '#' && (x + 1 != loc.x || y != loc.y)) this.x++;
                else return false;
            } else if (type == 2) {
                if (y - 1 >= 0 && toy[x][y-1] != '#' && (x != loc.x || y - 1 != loc.y)) this.y--;
                else return false;
            } else {
                if (y + 1 < M && toy[x][y+1] != '#' && (x != loc.x || y + 1 != loc.y)) this.y++;
                else return false;
            }

            return true;
        }
    }
}
