import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class Test1 {

    static int N, maxCoreCnt, minLineCnt;
    static int[][] map;
    static int[][] backupMap;
    static List<Point> cores;
    static int[] dr = { -1, 1, 0, 0 };
    static int[] dc = { 0, 0, -1, 1 };

    static class Point {
        int r, c;

        public Point(int r, int c) {
            this.r = r;
            this.c = c;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();
        int TC = Integer.parseInt(br.readLine());
        for (int tc = 1; tc <= TC; tc++) {
            maxCoreCnt = 0;
            minLineCnt = Integer.MAX_VALUE;
            N = Integer.parseInt(br.readLine());
            map = new int[N][N];
            backupMap = new int[N][N];
            cores = new ArrayList<>();

            for (int i = 0; i < N; i++) {
                StringTokenizer st = new StringTokenizer(br.readLine());
                for (int j = 0; j < N; j++) {
                    int num = Integer.parseInt(st.nextToken());
                    // 코어인 경우
                    if (num == 1) {
                        // 가장자리인 경우
                        if (i == 0 || i == N - 1 || j == 0 || j == N - 1) {
                            map[i][j] = 3;
                        } else {
                            cores.add(new Point(i, j));
                            map[i][j] = 1;
                        }
                    } else {
                        map[i][j] = 0;
                    }
                }
            }

            recur(0);

            sb.append("#").append(tc).append(" ").append(minLineCnt).append("\n");
        }
        System.out.println(sb);
    }

    private static void recur(int idx) {
        if (idx == cores.size()) {
            calculate();
            return;
        }

        Point core = cores.get(idx);
        for (int d = 0; d < 4; d++) {
            // 해당 방향으로 전선을 만들 수 있다면
            if (isLine(core.r, core.c, d)) {
                makeLine(core.r, core.c, d);

                recur(idx + 1);

                deleteLine(core.r, core.c, d);

            }
        }
        // 전선을 연결하지 않는 선택을 하는 경우
        recur(idx + 1);
    }

    private static void deleteLine(int r, int c, int d) {
        map[r][c] = 2;
        int nr = r;
        int nc = c;
        while (true) {
            nr += dr[d];
            nc += dc[d];
            if (nr < 0 || nc < 0 || nr >= N || nc >= N) {
                return;
            }
            map[nr][nc] = 0;
        }
    }

    private static void makeLine(int r, int c, int d) {
        map[r][c] = 3;
        int nr = r;
        int nc = c;
        while (true) {
            nr += dr[d];
            nc += dc[d];
            if (nr < 0 || nc < 0 || nr >= N || nc >= N) {
                return;
            }
            map[nr][nc] = 2;
        }
    }


    private static boolean isLine(int r, int c, int d) {
        int nr = r;
        int nc = c;
        while (true) {
            nr += dr[d];
            nc += dc[d];
            if (nr < 0 || nc < 0 || nr >= N || nc >= N) {
                return true;
            }
            if (map[nr][nc] != 0) {
                return false;
            }
        }
    }

    private static void calculate() {
        int coreCnt = 0;
        int lineCnt = 0;
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (map[i][j] == 3) {
                    coreCnt++;
                } else if (map[i][j] == 2) {
                    lineCnt++;
                }
            }
        }

        if (coreCnt >= maxCoreCnt) {
            maxCoreCnt = coreCnt;
            minLineCnt = Math.min(lineCnt, minLineCnt);
        }
    }
}
