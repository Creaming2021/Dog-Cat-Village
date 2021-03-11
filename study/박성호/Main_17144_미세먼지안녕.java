import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class Main_17144_미세먼지안녕 {
    
    static int R, C, T, ans = 0;
    static int[][] room, tempRoom;
    static int[][] dt = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    static Queue<Loc> q = new LinkedList<>();
    static ArrayList<Loc> puri = new ArrayList<>();

    public static void main(String[] args) throws IOException {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // R, C, T
        StringTokenizer st = new StringTokenizer(br.readLine());
        R = Integer.parseInt(st.nextToken());
        C = Integer.parseInt(st.nextToken());
        T = Integer.parseInt(st.nextToken());

        room = new int[R][C];
        tempRoom = new int[R][C];

        for (int i = 0; i < R; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 0; j < C; j++) {
                room[i][j] = Integer.parseInt(st.nextToken());
                if (room[i][j] == -1) puri.add(new Loc(i, j));
            }
        }

        for (int t = 0; t < T; t++) {
            // 미세먼지 퍼지기
            spread();
            // 미세먼지 이동
            move();

            room[puri.get(0).x][puri.get(0).y] = -1;
            room[puri.get(1).x][puri.get(1).y] = -1;
        }

        for (int i = 0; i < R; i++) {
            for (int j = 0; j < C; j++) {
                ans += room[i][j];
            }
        }

        System.out.println(ans + 2);
        br.close();
    }

    static void move() {
        int ux = puri.get(0).x;
        // 위에 이동
        // v
        for (int i = ux - 1; i >= 0; i--) room[i+1][0] = room[i][0];
        // <
        for (int i = 1; i < C; i++) room[0][i-1] = room[0][i];
        // ^
        for (int i = 1; i <= ux; i++) room[i-1][C-1] = room[i][C-1];
        // >
        for (int i = C - 2; i >= 1; i--) room[ux][i+1] = room[ux][i];
        room[ux][1] = 0;

        int dx = puri.get(1).x;
        // 아래 이동
        // ^
        for (int i = dx + 1; i < R; i++) room[i-1][0] = room[i][0];
        // <
        for (int i = 1; i < C; i++) room[R-1][i-1] = room[R-1][i];
        // v
        for (int i = R - 2; i >= dx; i--) room[i+1][C-1] = room[i][C-1];
        // >
        for (int i = C - 2; i >= 1; i--) room[dx][i+1] = room[dx][i];
        room[dx][1] = 0;
    }

    static void spread() {
        for (int i = 0; i < R; i++) Arrays.fill(tempRoom[i], 0);

        for (int i = 0; i < R; i++) {
            for (int j = 0; j < C; j++) {
                if (room[i][j] < 5)  {
                    // 먼지 양이 5 미만이면 continue
                    tempRoom[i][j] += room[i][j];
                    continue;
                }

                int sub = room[i][j] / 5;

                // 상하좌우 확인하고 계산하기
                for (int d = 0; d < 4; d++) {
                    int dx = i + dt[d][0];
                    int dy = j + dt[d][1];
                    // 확산 가능
                    if (dx >= 0 && dx < R && dy >= 0 && dy < C && room[dx][dy] != -1) {
                        // 원래 먼지 감소
                        room[i][j] -= sub;
                        // 확산 먼지 증가
                        tempRoom[dx][dy] += sub;
                    }
                }
                tempRoom[i][j] += room[i][j];
            }
        }

        for (int i = 0; i < R; i++) room[i] = tempRoom[i].clone();
    }

    static class Loc {
        int x, y;

        public Loc(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }
}
