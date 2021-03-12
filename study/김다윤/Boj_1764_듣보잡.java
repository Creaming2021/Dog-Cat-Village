package Boj;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.StringTokenizer;

public class Boj_1764_듣보잡 {
	
	public static void main(String[] args) throws IOException {
		
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		int N = Integer.parseInt(st.nextToken());
		int M = Integer.parseInt(st.nextToken());
		
		HashSet<String> set = new HashSet<>();
		ArrayList<String> ans = new ArrayList<>();
		
		// 듣도 못한 사람을 입력받는다.
		for(int i=0; i<N; i++) {
			String name = br.readLine();
			set.add(name);
		}
		
		// 보도 못한 사람을 입력받으면서, 듣도 못한 사람이 존재하면 ans에 담는다.
		int k = 0;
		for(int i=0; i<M; i++) {
			String name = br.readLine();
			if(set.contains(name)) {
				ans.add(name);
			}
		}
		
		// ans 배열을 사전 순으로 정렬한다.
		Collections.sort(ans);
		
		// 정답을 출력한다.
		System.out.println(ans.size());
		for(String s : ans) {
			System.out.println(s);
		}
		
	}
	
}
