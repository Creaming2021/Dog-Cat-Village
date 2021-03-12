import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class Main {

    static int N, M, totalCnt = 0, ans = Integer.MAX_VALUE;
    static int[][] room;
    static int[][] dt = {{-1, 0}, {0, -1}, {1, 0}, {0, 1}};
    static ArrayList<CCTV> cctvList = new ArrayList<>();

    public static void main(String[] args) throws IOException {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        StringTokenizer st = new StringTokenizer(br.readLine());
        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());
        room = new int[N][M];
        
        for (int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 0; j < M; j++) {
                room[i][j] = Integer.parseInt(st.nextToken());
                if (room[i][j] > 0) {
                    if (room[i][j] != 6) cctvList.add(new CCTV(i, j, room[i][j]));
                    continue;
                }
                totalCnt++;
            }
        }

        start(0);

        System.out.println(ans);
        br.close();
    }

    static void start(int depth) {

        // 모든 cctv 확인 완료
        if (depth == cctvList.size()) {
            ans = Math.min(ans, totalCnt);
            return;
        }

        CCTV cctv = cctvList.get(depth);

        for (int i = 0; i < cctv.count; i++) {
            // 채우기
            check(cctv, true);
            // 재귀
            start(depth + 1);
            // 돌려놓기
            check(cctv, false);
            cctv.way++;
        }
    }


    static void check(CCTV cctv, boolean order) {
        if (order) {
            add(cctv.x, cctv.y, cctv.way);
        } else {
            sub(cctv.x, cctv.y, cctv.way);
        }
        if (cctv.type == 1) return;
        if (cctv.type != 2) {
            if (order) {
                add(cctv.x, cctv.y, cctv.way + 1);
            } else {
                sub(cctv.x, cctv.y, cctv.way + 1);
            }
        }
        if (cctv.type != 3) {
            if (order) {
                add(cctv.x, cctv.y, cctv.way + 2);
            } else {
                sub(cctv.x, cctv.y, cctv.way + 2);
            }
        }
        if (cctv.type == 5) {
            if (order) {
                add(cctv.x, cctv.y, cctv.way + 3);
            } else {
                sub(cctv.x, cctv.y, cctv.way + 3);
            }
        }
    }

    static void sub(int x, int y, int way) {
        way %= 4;
        int dx = x;
        int dy = y;
        while (true) {
            // 현재 위치
            dx += dt[way][0];
            dy += dt[way][1];

            // 범위를 벗어나거나 벽을 만나면 return
            if (dx < 0 || dx >= N || dy < 0 || dy >= M || room[dx][dy] == 6) return;
            else if (room[dx][dy] > 0) continue;    // 그냥 CCTV 이면 continue

            // 복구시키기
            room[dx][dy]++;
            // 완전 사각지대가 되면 카운트
            if (room[dx][dy] == 0) totalCnt++;
        }
    }

    static void add(int x, int y, int way) {
        way %= 4;
        int dx = x;
        int dy = y;
        while (true) {
            // 현재 위치
            dx += dt[way][0];
            dy += dt[way][1];

            // 범위를 벗어나거나 벽을 만나면 return
            if (dx < 0 || dx >= N || dy < 0 || dy >= M || room[dx][dy] == 6) return;
            else if (room[dx][dy] > 0) continue;    // 그냥 CCTV 이면 continue

            // 처음 보는 곳이면 사각지대 줄이기
           if (room[dx][dy] == 0) totalCnt--;
           // 일단 표시는 해놓기
            room[dx][dy]--;
        }
    }

    static class CCTV {
        int x, y, type, way, count; // 0 상 1 좌 2 하 3 우

        public CCTV(int x, int y, int type) {
            this.x = x;
            this.y = y;
            this.type = type;
            this.way = 0;

            // 타입 별 횟수
            if (type == 1) count = 4;
            else if (type == 2) count = 2;
            else if (type == 3) count = 4;
            else if (type == 4) count = 4;
            else count = 1;
        }
    }
}

