package Boj;

import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;

public class Boj_1697_숨바꼭질 {
	
	static int subin, target;
	static int sec;
	static boolean[] visit;
	static Queue<Integer> queue;
	
	public static void main(String[] args) {
		
		Scanner sc = new Scanner(System.in);
		
		subin = sc.nextInt();
		target = sc.nextInt();
		
		queue = new LinkedList<>();
		visit = new boolean[100001];

		bfs();
		System.out.println(sec);
		
	}

	private static void bfs() {
		
		queue.add(subin);
		visit[subin] = true;
		
		while(!queue.isEmpty()) {
			
			int qSize = queue.size();
			
			for(int s=0; s<qSize; s++) {
				
				int current = queue.poll();
				
				if(current == target) return;
				
				if(0 <= current-1 && !visit[current-1]) {
					visit[current-1] = true;
					queue.add(current-1);
				}
				if(current+1 <= 100000 && !visit[current+1]) {
					visit[current+1] = true;
					queue.add(current+1);
				}
				if(current*2 <= 100001 && !visit[current*2]) {
					visit[current*2] = true;
					queue.add(current*2);
				}
				
			}
			
			sec++;
		}
		
	}
	
}
