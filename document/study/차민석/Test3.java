import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class Test3 {

    static int N, M, ans;
    static int[][] map;
    static List<Rect> rectList;
    static int minK, maxK;

    static class Rect {
        int x1, x2, y1, y2;

        public Rect(int x1, int x2, int y1, int y2) {
            this.x1 = x1;
            this.x2 = x2;
            this.y1 = y1;
            this.y2 = y2;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();
        int TC = Integer.parseInt(br.readLine());
        for (int tc = 1; tc <= TC; tc++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            ans = 0;
            N = Integer.parseInt(st.nextToken());
            M = Integer.parseInt(st.nextToken());
            map = new int[301][301]; // 종양의 좌표 범위는 0 이상 300 이하의 정수
            rectList = new ArrayList<>();
            for (int i = 0; i < N; i++) {
                st = new StringTokenizer(br.readLine());
                int a1 = Integer.parseInt(st.nextToken());
                int b1 = Integer.parseInt(st.nextToken());
                int a2 = Integer.parseInt(st.nextToken());
                int b2 = Integer.parseInt(st.nextToken());
                addRect(a1, a2, b1, b2);
            }

            calcKPoint();

            play();

            sb.append("#").append(tc).append(" ").append(ans).append("\n");
        }
        System.out.println(sb);
    }

    private static void play() {
        // K 가 1일 때부터 X까지 범위를 늘려가면서 N - M 개의 종양을 없앨 수 있는지 확인한다
        int size = maxK - minK;
        for (int k = size; k >= 0; k--) {

            // k=2 인 경우 (i, i) 부터 (i+2, i+2) 정사각형에 종양이 얼마나 있는지 확인해보기
            if(!isOk(k)) {
                ans = k + 1;
                return;
            }
        }
    }

    private static boolean isOk(int k) {
        for (int i = minK; i <= maxK - k; i++) {
            for (int j = minK; j <= maxK - k; j++) {

                int killRectCnt = 0;
                int minX = i;
                int minY = j;
                int maxX = i + k;
                int maxY = j + k;

                for (Rect rect : rectList) {
                    if (rect.x1 >= minX && rect.y1 >= minY && rect.x2 <= maxX && rect.y2 <= maxY) {
                        killRectCnt++;
                    }
                }

                if (killRectCnt >= N - M) {
                    return true;
                }
            }
        }
        return false;
    }

    private static void calcKPoint() {
        int min = Math.min(rectList.get(0).x1, rectList.get(0).y1);
        int max = Math.max(rectList.get(0).x2, rectList.get(0).y2);
        for (Rect rect : rectList) {
            min = Math.min(rect.x1, min);
            min = Math.min(rect.y1, min);
            max = Math.max(rect.x2, max);
            max = Math.max(rect.y2, max);
        }
        minK = min;
        maxK = max;
    }

    private static void addRect(int a1, int a2, int b1, int b2) {
        int x1, x2, y1, y2;
        if (a1 >= a2) {
            x1 = a2;
            x2 = a1;
        } else {
            x1 = a1;
            x2 = a2;
        }
        if (b1 >= b2) {
            y1 = b2;
            y2 = b1;
        } else {
            y1 = b1;
            y2 = b2;
        }
        rectList.add(new Rect(x1, x2, y1, y2));
    }
}
