package day0310;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/*
괄호 ( ) 사이에 0 or 1을 넣는다
1x1 이 될 때까지 쪼개야한다 쪼갤때마다 좌상, 우상, 좌하, 우하 순서로 다시 괄호 처리한다
1x1 일때만 괄호 붙이지 않는다
recur(N) => 4가지로 나누어서 recur(N/2) => ... recur(1) 까지 진행
1. 현재의 NxN이 모두 0이나 1로 이루어져 있는지 확인
2. 4등분했을때의 시작 인덱스 필요
 */
public class BOJ1992_쿼드트리 {

    static int N;
    static char[][] map;
    static StringBuilder sb;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        N = Integer.parseInt(br.readLine());
        map = new char[N][];
        for (int i = 0; i < N; i++) {
            map[i] = br.readLine().toCharArray();
        }
        sb = new StringBuilder();

        recur(0, 0, N);

        System.out.println(sb);
    }

    private static void recur(int r, int c, int n) {
        // 1. 현재 NxN이 모두 0으로 되어있는지 1로 되어있는지 확인하기
        if (checkCompress(r, c, n)) {
            // 모두 같으면 sb 에 append 후 return
            sb.append(map[r][c]);
            return;
        }

        // 2. 같지 않은 경우 4등분해서 다시 돌리기
        sb.append("(");
        recur(r, c, n/2);
        recur(r, c + n/2, n/2);
        recur(r + n/2, c, n/2);
        recur(r + n/2, c + n/2, n/2);
        sb.append(")");
    }

    private static boolean checkCompress(int r, int c, int n) {
        char num = map[r][c];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                int nr = i + r;
                int nc = j + c;
                if (map[nr][nc] != num) {
                    return false;
                }
            }
        }
        return true;
    }
}
