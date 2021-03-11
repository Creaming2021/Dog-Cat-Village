package day0311;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

/*
값: 각 행에 있는 모든 수의 합 중 최솟값
회전 연산의 순서에 따라 값이 달라진다 => K개 중 K개를 뽑는 순열
 */
public class BOJ17406_배열돌리기4 {

    static int N, M, K, ans;
    static int[][] map;
    static int[][] backupMap;
    static int[] select;
    static boolean[] check;
    static List<Rotation> rotations;

    static class Rotation {
        int r, c, s;

        public Rotation(int r, int c, int s) {
            this.r = r;
            this.c = c;
            this.s = s;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());
        K = Integer.parseInt(st.nextToken());
        ans = Integer.MAX_VALUE;
        map = new int[N][M];
        backupMap = new int[N][M];
        rotations = new ArrayList<>();
        select = new int[K];
        check = new boolean[K];

        for (int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 0; j < M; j++) {
                backupMap[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        for (int i = 0; i < K; i++) {
            st = new StringTokenizer(br.readLine());
            int r = Integer.parseInt(st.nextToken());
            int c = Integer.parseInt(st.nextToken());
            int s = Integer.parseInt(st.nextToken());
            rotations.add(new Rotation(r, c, s));
        }

        // 1. 순열
        perm(0);

        System.out.println(ans);

    }

    private static void perm(int idx) {
        if (idx == K) {
            // 2. 배열 최솟값 구하기
            calculate();
            return;
        }

        for (int i = 0; i < K; i++) {
            if (!check[i]) {
                select[idx] = i;
                check[i] = true;
                perm(idx + 1);
                check[i] = false;
            }
        }
    }

    private static void calculate() {
        initMap();

        for (int idx : select) {
            Rotation rotation = rotations.get(idx);
            rotate(rotation.r - 1, rotation.c - 1, rotation.s);
        }

        int tempAns = Integer.MAX_VALUE;
        for (int i = 0; i < N; i++) {
            int sum = 0;
            for (int j = 0; j < M; j++) {
                sum += map[i][j];
            }
            tempAns = Math.min(sum, tempAns);
        }

        ans = Math.min(tempAns, ans);

    }

    private static void rotate(int r, int c, int S) {
        for (int s = 0; s <= S; s++) {
            int nr = r - s;
            int nc = c - s;
            int temp = map[nr][nc];

            // 좌
            while (nr < r + s) {
                map[nr][nc] = map[++nr][nc];
            }

            // 하
            while (nc < c + s) {
                map[nr][nc] = map[nr][++nc];
            }

            // 우
            while (nr > r - s) {
                map[nr][nc] = map[--nr][nc];
            }

            // 상
            while (nc > c - s + 1) {
                map[nr][nc] = map[nr][--nc];
            }
            map[nr][nc] = temp;

        }

    }

    private static void initMap() {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                map[i][j] = backupMap[i][j];
            }
        }
    }
}