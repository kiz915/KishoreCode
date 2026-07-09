// Representative first batch of problems (~110), spread across both tracks,
// weighted toward Track 2 (patterns) per spec (~40% easy / 40% medium / 20% hard
// overall). Each problem is matched to a lesson by (trackSlug, moduleTitle, lessonTitle).
//
// TO SCALE TO 500+: this array is the extension point. Add more ProblemSeed
// objects following the same shape — group them by lessonTitle so the seed
// script's lookup keeps working. A generator stub is provided at the bottom
// for mechanically-variable problems (e.g. "sum of subarray of size K = ...")
// if you want to bulk-fill easy tiers quickly.

export type ProblemSeed = {
  trackSlug: "cpp_language" | "problem_solving";
  moduleTitle: string;
  lessonTitle: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  statement: string;
  constraints?: string;
  sample_input?: string;
  sample_output?: string;
  hints?: string[];
  tags?: string[];
  pattern_tags?: string[];
};

export const problemsSeed: ProblemSeed[] = [
  // ================= TRACK 2: PROBLEM SOLVING =================
  // -- Two Pointers --
  {
    trackSlug: "problem_solving", moduleTitle: "2. Two Pointers", lessonTitle: "Opposite-End Two Pointers",
    title: "Pair with Target Sum (Sorted Array)", difficulty: "easy",
    statement: "Given a sorted array of integers and a target value, determine whether any two elements sum to the target.",
    constraints: "2 <= n <= 10^5", sample_input: "[1,3,5,7,9], target=12", sample_output: "true (3+9 or 5+7)",
    hints: ["Start pointers at both ends.", "Move the pointer that gets you closer to target."],
    tags: ["array"], pattern_tags: ["two-pointer"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "2. Two Pointers", lessonTitle: "Opposite-End Two Pointers",
    title: "Container With Most Water", difficulty: "medium",
    statement: "Given heights of vertical lines at each index, find two lines that together with the x-axis form the container holding the most water.",
    constraints: "2 <= n <= 10^5", sample_input: "[1,8,6,2,5,4,8,3,7]", sample_output: "49",
    hints: ["Move the pointer at the shorter line inward."], tags: ["array", "greedy-ish"], pattern_tags: ["two-pointer"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "2. Two Pointers", lessonTitle: "Opposite-End Two Pointers",
    title: "3Sum Closest", difficulty: "hard",
    statement: "Given an array, find three numbers whose sum is closest to a given target; return that sum.",
    constraints: "3 <= n <= 5000", sample_input: "[-1,2,1,-4], target=1", sample_output: "2",
    hints: ["Sort first, fix one element, two-pointer the rest."], tags: ["array"], pattern_tags: ["two-pointer"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "2. Two Pointers", lessonTitle: "Same-Direction (Fast/Slow) Pointers",
    title: "Remove Duplicates from Sorted Array", difficulty: "easy",
    statement: "Given a sorted array, remove duplicates in place so each element appears once, and return the new length.",
    sample_input: "[1,1,2,2,3]", sample_output: "3 -> [1,2,3]",
    hints: ["Slow pointer marks the write position; fast pointer scans ahead."], tags: ["array", "in-place"], pattern_tags: ["two-pointer"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "2. Two Pointers", lessonTitle: "Same-Direction (Fast/Slow) Pointers",
    title: "Move Zeroes to End", difficulty: "easy",
    statement: "Given an array, move all zeroes to the end while keeping the relative order of non-zero elements, in place.",
    sample_input: "[0,1,0,3,12]", sample_output: "[1,3,12,0,0]",
    hints: ["Slow pointer tracks next non-zero write position."], tags: ["array", "in-place"], pattern_tags: ["two-pointer"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "2. Two Pointers", lessonTitle: "Two Pointers on Two Different Arrays",
    title: "Merge Two Sorted Arrays", difficulty: "medium",
    statement: "Merge two sorted arrays into one sorted array without using extra sort calls.",
    sample_input: "[1,3,5], [2,4,6]", sample_output: "[1,2,3,4,5,6]",
    hints: ["Walk both arrays with one pointer each, take the smaller."], tags: ["array"], pattern_tags: ["two-pointer"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "2. Two Pointers", lessonTitle: "Two Pointers on Two Different Arrays",
    title: "Intersection of Two Sorted Arrays", difficulty: "medium",
    statement: "Given two sorted arrays, return their intersection (common elements) in sorted order.",
    sample_input: "[1,2,4,5,6], [2,3,5,7]", sample_output: "[2,5]",
    hints: ["Advance the pointer pointing at the smaller value."], tags: ["array"], pattern_tags: ["two-pointer"],
  },

  // -- Sliding Window --
  {
    trackSlug: "problem_solving", moduleTitle: "3. Sliding Window", lessonTitle: "Fixed-Size Window",
    title: "Maximum Sum Subarray of Size K", difficulty: "easy",
    statement: "Given an array and integer k, find the maximum sum of any contiguous subarray of size k.",
    sample_input: "[2,1,5,1,3,2], k=3", sample_output: "9",
    hints: ["Subtract the outgoing element, add the incoming one — don't resum every window."], tags: ["array"], pattern_tags: ["sliding-window"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "3. Sliding Window", lessonTitle: "Fixed-Size Window",
    title: "First Negative Number in Every Window of Size K", difficulty: "medium",
    statement: "For every contiguous window of size k, output the first negative number, or 0 if none exists.",
    sample_input: "[12,-1,-7,8,-15,30], k=3", sample_output: "[-1,-1,-7,-15,-15]",
    hints: ["Maintain a queue/deque of negative indices within the window."], tags: ["array"], pattern_tags: ["sliding-window"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "3. Sliding Window", lessonTitle: "Variable-Size Window (Expand/Shrink)",
    title: "Smallest Subarray with Sum >= Target", difficulty: "medium",
    statement: "Given an array of positive integers and a target sum, find the length of the smallest contiguous subarray whose sum is >= target.",
    sample_input: "[2,1,5,2,3,2], target=7", sample_output: "2",
    hints: ["Expand right to grow sum; shrink left while the condition still holds."], tags: ["array"], pattern_tags: ["sliding-window"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "3. Sliding Window", lessonTitle: "Variable-Size Window (Expand/Shrink)",
    title: "Longest Substring Without Repeating Characters", difficulty: "medium",
    statement: "Given a string, find the length of the longest substring without repeating characters.",
    sample_input: "\"abcabcbb\"", sample_output: "3",
    hints: ["Shrink the window from the left whenever a duplicate enters."], tags: ["string"], pattern_tags: ["sliding-window"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "3. Sliding Window", lessonTitle: "Window + Frequency Map Combo",
    title: "Minimum Window Substring", difficulty: "hard",
    statement: "Given strings s and t, find the smallest substring of s containing all characters of t (with multiplicity).",
    sample_input: "s=\"ADOBECODEBANC\", t=\"ABC\"", sample_output: "\"BANC\"",
    hints: ["Track how many required characters are currently satisfied; shrink when fully satisfied."], tags: ["string"], pattern_tags: ["sliding-window"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "3. Sliding Window", lessonTitle: "Window + Frequency Map Combo",
    title: "Longest Substring with At Most K Distinct Characters", difficulty: "medium",
    statement: "Given a string and integer k, find the length of the longest substring with at most k distinct characters.",
    sample_input: "\"eceba\", k=2", sample_output: "3",
    hints: ["Frequency map size tells you distinct-char count in the current window."], tags: ["string"], pattern_tags: ["sliding-window"],
  },

  // -- Prefix Sum --
  {
    trackSlug: "problem_solving", moduleTitle: "4. Prefix Sum & Difference Arrays", lessonTitle: "1D Prefix Sums",
    title: "Range Sum Query - Immutable", difficulty: "easy",
    statement: "Given an array, answer multiple range sum queries [i, j] in O(1) each after preprocessing.",
    sample_input: "[-2,0,3,-5,2,-1], query(0,2)", sample_output: "1",
    hints: ["prefix[i] = sum of first i elements; range sum = prefix[j+1]-prefix[i]."], tags: ["array"], pattern_tags: ["prefix-sum"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "4. Prefix Sum & Difference Arrays", lessonTitle: "1D Prefix Sums",
    title: "Subarray Sum Equals K", difficulty: "medium",
    statement: "Given an array and integer k, count the number of contiguous subarrays whose sum equals k.",
    sample_input: "[1,1,1], k=2", sample_output: "2",
    hints: ["Store prefix-sum frequencies in a hash map as you scan."], tags: ["array", "hashmap"], pattern_tags: ["prefix-sum"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "4. Prefix Sum & Difference Arrays", lessonTitle: "2D Prefix Sums",
    title: "Range Sum Query 2D - Immutable", difficulty: "medium",
    statement: "Given a 2D matrix, answer multiple rectangle-sum queries efficiently after preprocessing.",
    hints: ["Build a 2D prefix sum with inclusion-exclusion on the four corners."], tags: ["matrix"], pattern_tags: ["prefix-sum"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "4. Prefix Sum & Difference Arrays", lessonTitle: "Difference Arrays",
    title: "Range Addition", difficulty: "medium",
    statement: "Given an array of zeros and a list of [start, end, value] updates, apply all range increments efficiently and return the final array.",
    hints: ["diff[start]+=value, diff[end+1]-=value, then prefix-sum the diff array."], tags: ["array"], pattern_tags: ["prefix-sum", "difference-array"],
  },

  // -- Binary Search on Answer --
  {
    trackSlug: "problem_solving", moduleTitle: "5. Binary Search on Answer", lessonTitle: "Classic Binary Search Recap",
    title: "Search in Rotated Sorted Array", difficulty: "medium",
    statement: "Given a rotated sorted array with no duplicates, search for a target value in O(log n).",
    sample_input: "[4,5,6,7,0,1,2], target=0", sample_output: "index 4",
    hints: ["One half is always sorted — decide which half to search."], tags: ["array"], pattern_tags: ["binary-search"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "5. Binary Search on Answer", lessonTitle: "Recognizing Monotonic Feasibility",
    title: "Koko Eating Bananas", difficulty: "medium",
    statement: "Given piles of bananas and h hours, find the minimum eating speed k such that Koko can eat all bananas within h hours.",
    hints: ["feasible(k) is monotonic: if k works, any speed > k also works."], tags: ["greedy"], pattern_tags: ["binary-search-on-answer"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "5. Binary Search on Answer", lessonTitle: "Binary Search on the Answer Space",
    title: "Split Array Largest Sum", difficulty: "hard",
    statement: "Split an array into m non-empty contiguous subarrays to minimize the largest sum among them.",
    hints: ["Binary search the answer (max subarray sum); check feasibility with a greedy partition count."], tags: ["array"], pattern_tags: ["binary-search-on-answer", "greedy"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "5. Binary Search on Answer", lessonTitle: "Binary Search on the Answer Space",
    title: "Minimum Number of Days to Make Bouquets", difficulty: "hard",
    statement: "Given bloom days for flowers, find the minimum number of days to be able to make a required number of bouquets, each needing k adjacent bloomed flowers.",
    hints: ["Binary search the day; feasibility check scans for adjacent-bloomed runs."], tags: ["array"], pattern_tags: ["binary-search-on-answer"],
  },

  // -- Recursion & Backtracking --
  {
    trackSlug: "problem_solving", moduleTitle: "6. Recursion & Backtracking Patterns", lessonTitle: "Subsets & Combinations",
    title: "Subsets", difficulty: "easy",
    statement: "Given an array of unique integers, return all possible subsets (the power set).",
    sample_input: "[1,2,3]", sample_output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
    hints: ["At each element, branch into include / exclude."], tags: ["recursion"], pattern_tags: ["backtracking"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "6. Recursion & Backtracking Patterns", lessonTitle: "Subsets & Combinations",
    title: "Combination Sum", difficulty: "medium",
    statement: "Given candidate numbers (reusable) and a target, find all unique combinations summing to the target.",
    hints: ["Sort candidates; prune branches once running sum exceeds target."], tags: ["recursion"], pattern_tags: ["backtracking"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "6. Recursion & Backtracking Patterns", lessonTitle: "Permutations",
    title: "Permutations", difficulty: "medium",
    statement: "Given an array of distinct integers, return all possible permutations.",
    hints: ["Use a used[] array or swap-in-place to build each permutation."], tags: ["recursion"], pattern_tags: ["backtracking"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "6. Recursion & Backtracking Patterns", lessonTitle: "Backtracking with Pruning",
    title: "N-Queens", difficulty: "hard",
    statement: "Place N queens on an N x N chessboard so that no two queens attack each other; return all distinct solutions.",
    hints: ["Track attacked columns/diagonals as you place queens row by row."], tags: ["recursion"], pattern_tags: ["backtracking"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "6. Recursion & Backtracking Patterns", lessonTitle: "Backtracking with Pruning",
    title: "Sudoku Solver", difficulty: "hard",
    statement: "Fill a 9x9 Sudoku board so that it satisfies all Sudoku rules, given a partially filled board.",
    hints: ["Try digits 1-9 per empty cell, validate row/col/box, backtrack on failure."], tags: ["recursion"], pattern_tags: ["backtracking"],
  },

  // -- Greedy --
  {
    trackSlug: "problem_solving", moduleTitle: "7. Greedy Thinking", lessonTitle: "Interval Scheduling & Sorting-Based Greedy",
    title: "Activity Selection (Non-overlapping Intervals)", difficulty: "easy",
    statement: "Given start/end times of activities, select the maximum number of non-overlapping activities.",
    hints: ["Sort by end time; greedily take the earliest-ending activity that doesn't conflict."], tags: ["greedy", "intervals"], pattern_tags: ["greedy"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "7. Greedy Thinking", lessonTitle: "Interval Scheduling & Sorting-Based Greedy",
    title: "Merge Intervals", difficulty: "medium",
    statement: "Given a collection of intervals, merge all overlapping intervals.",
    sample_input: "[[1,3],[2,6],[8,10],[15,18]]", sample_output: "[[1,6],[8,10],[15,18]]",
    hints: ["Sort by start time, then sweep and merge."], tags: ["intervals"], pattern_tags: ["greedy"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "7. Greedy Thinking", lessonTitle: "Greedy vs DP: Telling Them Apart",
    title: "Jump Game", difficulty: "medium",
    statement: "Given an array where each element is the max jump length from that position, determine if you can reach the last index.",
    hints: ["Track the farthest reachable index greedily as you scan left to right."], tags: ["array"], pattern_tags: ["greedy"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "7. Greedy Thinking", lessonTitle: "Greedy vs DP: Telling Them Apart",
    title: "Gas Station", difficulty: "medium",
    statement: "Given gas and cost arrays around a circular route, find the starting station index from which you can complete the circuit, or -1.",
    hints: ["If total gas >= total cost a solution exists; track running tank to find the start."], tags: ["greedy"], pattern_tags: ["greedy"],
  },

  // -- Divide and Conquer --
  {
    trackSlug: "problem_solving", moduleTitle: "8. Divide and Conquer", lessonTitle: "D&C Recap via Merge Sort / Quick Sort",
    title: "Kth Largest Element (Quickselect)", difficulty: "medium",
    statement: "Find the kth largest element in an unsorted array without fully sorting it.",
    hints: ["Quickselect: partition like quicksort, recurse into only the needed half."], tags: ["array"], pattern_tags: ["divide-and-conquer"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "8. Divide and Conquer", lessonTitle: "D&C Beyond Sorting",
    title: "Count of Smaller Numbers After Self", difficulty: "hard",
    statement: "Given an array, for each element count how many elements to its right are smaller than it.",
    hints: ["Merge sort while counting cross-inversions during the merge step."], tags: ["array"], pattern_tags: ["divide-and-conquer"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "8. Divide and Conquer", lessonTitle: "D&C Beyond Sorting",
    title: "Closest Pair of Points", difficulty: "hard",
    statement: "Given n points on a plane, find the pair with the smallest Euclidean distance in better than O(n^2).",
    hints: ["Split by x-coordinate, recurse, then check a thin strip around the midline."], tags: ["geometry"], pattern_tags: ["divide-and-conquer"],
  },

  // -- DP --
  {
    trackSlug: "problem_solving", moduleTitle: "9. Dynamic Programming Patterns", lessonTitle: "DP Foundations: Memoization vs Tabulation",
    title: "Fibonacci with Memoization", difficulty: "easy",
    statement: "Compute the nth Fibonacci number efficiently using memoization instead of naive recursion.",
    hints: ["Cache results keyed by n to avoid recomputation."], tags: ["dp"], pattern_tags: ["dynamic-programming"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "9. Dynamic Programming Patterns", lessonTitle: "DP Foundations: Memoization vs Tabulation",
    title: "Climbing Stairs", difficulty: "easy",
    statement: "You can climb 1 or 2 steps at a time; count the distinct ways to reach the top of n stairs.",
    hints: ["ways(n) = ways(n-1) + ways(n-2) — same recurrence as Fibonacci."], tags: ["dp"], pattern_tags: ["dynamic-programming"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "9. Dynamic Programming Patterns", lessonTitle: "0/1 Knapsack Family",
    title: "0/1 Knapsack", difficulty: "medium",
    statement: "Given item weights, values, and a capacity, maximize total value without exceeding capacity, each item used at most once.",
    hints: ["dp[i][w] = best value using first i items with capacity w."], tags: ["dp"], pattern_tags: ["dynamic-programming", "0-1-knapsack"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "9. Dynamic Programming Patterns", lessonTitle: "0/1 Knapsack Family",
    title: "Partition Equal Subset Sum", difficulty: "medium",
    statement: "Determine if an array can be partitioned into two subsets with equal sum.",
    hints: ["Equivalent to a 0/1 knapsack: can we hit target = totalSum/2?"], tags: ["dp"], pattern_tags: ["dynamic-programming", "0-1-knapsack"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "9. Dynamic Programming Patterns", lessonTitle: "Unbounded Knapsack Family",
    title: "Coin Change (Minimum Coins)", difficulty: "medium",
    statement: "Given coin denominations and a target amount, find the minimum number of coins needed, or -1 if impossible.",
    hints: ["dp[amount] = min over coins of dp[amount-coin] + 1."], tags: ["dp"], pattern_tags: ["dynamic-programming", "unbounded-knapsack"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "9. Dynamic Programming Patterns", lessonTitle: "Unbounded Knapsack Family",
    title: "Rod Cutting", difficulty: "medium",
    statement: "Given a rod of length n and prices for each cut length, maximize revenue from cutting the rod into pieces.",
    hints: ["Unbounded knapsack: each cut-length can be reused any number of times."], tags: ["dp"], pattern_tags: ["dynamic-programming", "unbounded-knapsack"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "9. Dynamic Programming Patterns", lessonTitle: "LCS-Family (String DP)",
    title: "Longest Common Subsequence", difficulty: "medium",
    statement: "Given two strings, find the length of their longest common subsequence.",
    hints: ["dp[i][j] depends on whether the current characters match."], tags: ["dp", "string"], pattern_tags: ["dynamic-programming", "lcs"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "9. Dynamic Programming Patterns", lessonTitle: "LCS-Family (String DP)",
    title: "Edit Distance", difficulty: "hard",
    statement: "Given two strings, find the minimum number of insert/delete/replace operations to convert one into the other.",
    hints: ["dp[i][j] = min of three operations plus the diagonal match case."], tags: ["dp", "string"], pattern_tags: ["dynamic-programming", "lcs"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "9. Dynamic Programming Patterns", lessonTitle: "Interval DP",
    title: "Matrix Chain Multiplication", difficulty: "hard",
    statement: "Given dimensions of matrices to multiply in sequence, find the minimum number of scalar multiplications by choosing the optimal parenthesization.",
    hints: ["dp[i][j] = min over split point k of dp[i][k] + dp[k+1][j] + cost(i,k,j)."], tags: ["dp"], pattern_tags: ["dynamic-programming", "interval-dp"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "9. Dynamic Programming Patterns", lessonTitle: "Interval DP",
    title: "Burst Balloons", difficulty: "hard",
    statement: "Given balloons with values, maximize coins earned by bursting them in some order, where bursting a balloon multiplies its neighbors' values.",
    hints: ["Think in reverse: what's the LAST balloon burst in a subrange?"], tags: ["dp"], pattern_tags: ["dynamic-programming", "interval-dp"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "9. Dynamic Programming Patterns", lessonTitle: "Digit DP",
    title: "Count Numbers with Unique Digits in a Range", difficulty: "hard",
    statement: "Count how many numbers in [0, n] have all unique digits, using digit DP.",
    hints: ["State: position, tight-bound flag, digits-used mask."], tags: ["dp"], pattern_tags: ["dynamic-programming", "digit-dp"],
  },

  // -- Graph Traversal --
  {
    trackSlug: "problem_solving", moduleTitle: "10. Graph Traversal Patterns", lessonTitle: "BFS: When and Why",
    title: "Number of Islands", difficulty: "medium",
    statement: "Given a grid of 1s (land) and 0s (water), count the number of islands (connected land regions).",
    hints: ["BFS/DFS flood-fill from each unvisited land cell."], tags: ["graph", "grid"], pattern_tags: ["bfs", "dfs"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "10. Graph Traversal Patterns", lessonTitle: "BFS: When and Why",
    title: "Shortest Path in Binary Matrix", difficulty: "medium",
    statement: "Given a binary grid, find the length of the shortest clear path from top-left to bottom-right (8-directional moves).",
    hints: ["Unweighted shortest path = BFS, not DFS."], tags: ["graph", "grid"], pattern_tags: ["bfs"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "10. Graph Traversal Patterns", lessonTitle: "DFS: When and Why",
    title: "Course Schedule (Cycle Detection)", difficulty: "medium",
    statement: "Given course prerequisites as a directed graph, determine if it's possible to finish all courses (i.e., the graph has no cycle).",
    hints: ["DFS with a recursion-stack visited set detects back edges."], tags: ["graph"], pattern_tags: ["dfs", "topological-sort"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "10. Graph Traversal Patterns", lessonTitle: "Union-Find (Disjoint Set)",
    title: "Number of Connected Components in an Undirected Graph", difficulty: "medium",
    statement: "Given n nodes and a list of edges, count the number of connected components using Union-Find.",
    hints: ["Union each edge's endpoints; count distinct roots at the end."], tags: ["graph"], pattern_tags: ["union-find"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "10. Graph Traversal Patterns", lessonTitle: "Union-Find (Disjoint Set)",
    title: "Redundant Connection", difficulty: "medium",
    statement: "Given a graph that was a tree plus one extra edge, find the extra edge that, if removed, restores a tree.",
    hints: ["The redundant edge is the one that connects two already-unioned nodes."], tags: ["graph"], pattern_tags: ["union-find"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "10. Graph Traversal Patterns", lessonTitle: "Dijkstra & Weighted Shortest Path",
    title: "Network Delay Time", difficulty: "medium",
    statement: "Given a weighted directed graph and a source node, find the time for a signal to reach all nodes, or -1 if impossible.",
    hints: ["Classic Dijkstra with a min-priority-queue on distance."], tags: ["graph"], pattern_tags: ["dijkstra"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "10. Graph Traversal Patterns", lessonTitle: "Dijkstra & Weighted Shortest Path",
    title: "Cheapest Flights Within K Stops", difficulty: "hard",
    statement: "Given flights with costs, find the cheapest price from source to destination with at most k stops.",
    hints: ["Modified Dijkstra/Bellman-Ford where the stop count is part of the state."], tags: ["graph"], pattern_tags: ["dijkstra", "dynamic-programming"],
  },

  // -- Tree Patterns --
  {
    trackSlug: "problem_solving", moduleTitle: "11. Tree Patterns", lessonTitle: "Tree Traversals (Pre/In/Post/Level)",
    title: "Binary Tree Level Order Traversal", difficulty: "easy",
    statement: "Given a binary tree, return its node values grouped by level.",
    hints: ["BFS with a queue, track level size per iteration."], tags: ["tree"], pattern_tags: ["tree-traversal", "bfs"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "11. Tree Patterns", lessonTitle: "Recursion on Trees",
    title: "Maximum Depth of Binary Tree", difficulty: "easy",
    statement: "Given a binary tree, find its maximum depth.",
    hints: ["depth(node) = 1 + max(depth(left), depth(right))."], tags: ["tree"], pattern_tags: ["tree-recursion"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "11. Tree Patterns", lessonTitle: "Diameter / Height / Balance Problems",
    title: "Diameter of Binary Tree", difficulty: "medium",
    statement: "Given a binary tree, find the length of the longest path between any two nodes (may not pass through the root).",
    hints: ["At each node, track height while updating a global diameter candidate."], tags: ["tree"], pattern_tags: ["tree-recursion"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "11. Tree Patterns", lessonTitle: "Diameter / Height / Balance Problems",
    title: "Balanced Binary Tree Check", difficulty: "easy",
    statement: "Given a binary tree, determine if it is height-balanced (subtree heights differ by at most 1 everywhere).",
    hints: ["Return -1 as a sentinel from the recursion to short-circuit on imbalance."], tags: ["tree"], pattern_tags: ["tree-recursion"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "11. Tree Patterns", lessonTitle: "LCA-Type Problems",
    title: "Lowest Common Ancestor of a Binary Tree", difficulty: "medium",
    statement: "Given a binary tree and two nodes, find their lowest common ancestor.",
    hints: ["Recurse both subtrees; if both return non-null, current node is the LCA."], tags: ["tree"], pattern_tags: ["lca"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "11. Tree Patterns", lessonTitle: "LCA-Type Problems",
    title: "Kth Ancestor of a Tree Node (Binary Lifting)", difficulty: "hard",
    statement: "Given a tree, answer multiple queries for the kth ancestor of a node efficiently.",
    hints: ["Precompute 2^i-th ancestors (binary lifting) to answer each query in O(log n)."], tags: ["tree"], pattern_tags: ["lca", "binary-lifting"],
  },

  // -- Bit Manipulation --
  {
    trackSlug: "problem_solving", moduleTitle: "12. Bit Manipulation Tricks", lessonTitle: "XOR Tricks",
    title: "Single Number", difficulty: "easy",
    statement: "Given an array where every element appears twice except one, find that single element in O(1) space.",
    hints: ["XOR of a number with itself is 0; XOR-ing everything cancels pairs."], tags: ["bit-manipulation"], pattern_tags: ["bit-manipulation", "xor"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "12. Bit Manipulation Tricks", lessonTitle: "XOR Tricks",
    title: "Missing Number", difficulty: "easy",
    statement: "Given an array containing n distinct numbers from 0 to n, find the missing number.",
    hints: ["XOR indices 0..n with array values — everything cancels but the missing number."], tags: ["bit-manipulation"], pattern_tags: ["bit-manipulation", "xor"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "12. Bit Manipulation Tricks", lessonTitle: "Bitmasking for Subsets",
    title: "Traveling Salesman via Bitmask DP", difficulty: "hard",
    statement: "Given a distance matrix between cities, find the shortest route visiting every city once and returning to start, using bitmask DP.",
    hints: ["State = (mask of visited cities, current city); dp over 2^n * n states."], tags: ["dp", "bit-manipulation"], pattern_tags: ["bitmask-dp"],
  },

  // -- Math & Number Theory --
  {
    trackSlug: "problem_solving", moduleTitle: "13. Math & Number Theory for CP", lessonTitle: "GCD / LCM & the Euclidean Algorithm",
    title: "GCD of an Array", difficulty: "easy",
    statement: "Given an array of integers, compute the GCD of all elements.",
    hints: ["gcd(a,b,c) = gcd(gcd(a,b),c) — reduce pairwise."], tags: ["math"], pattern_tags: ["number-theory"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "13. Math & Number Theory for CP", lessonTitle: "Modular Arithmetic",
    title: "Modular Exponentiation", difficulty: "medium",
    statement: "Compute (base^exponent) mod m efficiently for very large exponents.",
    hints: ["Fast exponentiation: square-and-multiply, halving the exponent each step."], tags: ["math"], pattern_tags: ["number-theory", "modular-arithmetic"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "13. Math & Number Theory for CP", lessonTitle: "Sieve of Eratosthenes",
    title: "Count Primes Below N", difficulty: "medium",
    statement: "Given n, count the number of prime numbers strictly less than n.",
    hints: ["Sieve of Eratosthenes precomputes all primes up to n in O(n log log n)."], tags: ["math"], pattern_tags: ["number-theory", "sieve"],
  },
  {
    trackSlug: "problem_solving", moduleTitle: "13. Math & Number Theory for CP", lessonTitle: "Combinatorics Basics",
    title: "nCr mod p for Many Queries", difficulty: "hard",
    statement: "Given many (n, r) pairs, answer nCr mod a large prime p efficiently.",
    hints: ["Precompute factorials and modular inverses once; each query becomes O(1)."], tags: ["math"], pattern_tags: ["number-theory", "combinatorics"],
  },

  // ================= TRACK 1: C++ LANGUAGE =================
  {
    trackSlug: "cpp_language", moduleTitle: "1. Basics", lessonTitle: "Variables & Data Types",
    title: "Compute Sizeof Every Primitive Type", difficulty: "easy",
    statement: "Write a program that prints the sizeof() every primitive C++ type on your system and explain why sizes can vary across platforms.",
    tags: ["fundamentals"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "1. Basics", lessonTitle: "Operators & Expressions",
    title: "Operator Precedence Predictor", difficulty: "easy",
    statement: "Given a set of mixed-operator expressions, predict their output without running them, then verify.",
    tags: ["fundamentals"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "2. Control Flow", lessonTitle: "for, while, do-while",
    title: "FizzBuzz", difficulty: "easy",
    statement: "Print numbers 1 to n, replacing multiples of 3 with 'Fizz', multiples of 5 with 'Buzz', and multiples of both with 'FizzBuzz'.",
    tags: ["fundamentals"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "2. Control Flow", lessonTitle: "Nested Loops & Loop Complexity",
    title: "Print All Pythagorean Triples Up to N", difficulty: "medium",
    statement: "Using nested loops, print all Pythagorean triples (a,b,c) with a,b,c <= n.",
    tags: ["fundamentals"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "3. Functions", lessonTitle: "Recursion Basics",
    title: "Factorial and Power via Recursion", difficulty: "easy",
    statement: "Implement factorial(n) and power(base, exp) using plain recursion, then trace the call stack for n=5.",
    tags: ["recursion"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "3. Functions", lessonTitle: "Parameters: Value, Reference, Pointer",
    title: "Swap Without std::swap", difficulty: "easy",
    statement: "Implement swap(int&, int&) and explain why pass-by-value would fail to swap the caller's variables.",
    tags: ["fundamentals"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "4. Arrays & Strings", lessonTitle: "std::string Operations",
    title: "Check if a String is a Palindrome", difficulty: "easy",
    statement: "Given a string, determine whether it reads the same forwards and backwards, ignoring case.",
    tags: ["string"], pattern_tags: ["two-pointer"],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "4. Arrays & Strings", lessonTitle: "1D & 2D Arrays",
    title: "Rotate a Matrix 90 Degrees In-Place", difficulty: "medium",
    statement: "Given an n x n matrix, rotate it 90 degrees clockwise in place.",
    tags: ["array", "matrix"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "5. Pointers & References", lessonTitle: "Pointer Arithmetic",
    title: "Reverse an Array Using Only Pointers", difficulty: "medium",
    statement: "Reverse an array in place using raw pointer arithmetic instead of index-based access.",
    tags: ["pointers"], pattern_tags: ["two-pointer"],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "5. Pointers & References", lessonTitle: "Dangling Pointers & Common Bugs",
    title: "Spot the Bug: Use-After-Free", difficulty: "medium",
    statement: "Given five short C++ snippets, identify which contain use-after-free or dangling-reference bugs and explain the fix.",
    tags: ["pointers", "debugging"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "6. Object-Oriented Programming", lessonTitle: "Constructors & Destructors",
    title: "Implement a RAII File Wrapper Class", difficulty: "medium",
    statement: "Write a class that opens a file in its constructor and closes it in its destructor, demonstrating RAII.",
    tags: ["oop"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "6. Object-Oriented Programming", lessonTitle: "Polymorphism & Virtual Functions",
    title: "Shape Hierarchy with Virtual area()", difficulty: "medium",
    statement: "Design a Shape base class with derived Circle, Rectangle, Triangle classes, each overriding a virtual area() method, and compute total area via base pointers.",
    tags: ["oop"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "6. Object-Oriented Programming", lessonTitle: "Operator Overloading",
    title: "Overload + and << for a Vector2D Class", difficulty: "medium",
    statement: "Implement a Vector2D class supporting operator+ for addition and operator<< for printing.",
    tags: ["oop"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "7. STL", lessonTitle: "vector Deep Dive",
    title: "Predict Vector Reallocation Points", difficulty: "medium",
    statement: "Given a sequence of push_back calls, predict at which calls the vector's capacity grows, given typical amortized-doubling growth.",
    tags: ["stl"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "7. STL", lessonTitle: "unordered_set & unordered_map",
    title: "Two Sum Using unordered_map", difficulty: "easy",
    statement: "Given an array and a target, find two indices whose values sum to target, in one pass using a hash map.",
    tags: ["stl", "hashmap"], pattern_tags: ["hashmap"],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "7. STL", lessonTitle: "<algorithm> Essentials",
    title: "Sort Custom Structs with a Comparator", difficulty: "medium",
    statement: "Given a vector of Person structs, sort by age ascending then name alphabetically using std::sort with a custom comparator.",
    tags: ["stl"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "8. Memory Management", lessonTitle: "unique_ptr",
    title: "Refactor Raw new/delete to unique_ptr", difficulty: "medium",
    statement: "Given code using raw new/delete for a tree structure, refactor it to use unique_ptr and eliminate manual delete calls.",
    tags: ["memory"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "8. Memory Management", lessonTitle: "shared_ptr & weak_ptr",
    title: "Break a Reference Cycle with weak_ptr", difficulty: "hard",
    statement: "Given a parent/child class pair with shared_ptr in both directions causing a memory leak, fix it using weak_ptr.",
    tags: ["memory"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "9. Templates & Generic Programming", lessonTitle: "Function Templates",
    title: "Generic max() for Any Comparable Type", difficulty: "easy",
    statement: "Write a template function max_val<T>(T a, T b) that works for ints, doubles, and strings.",
    tags: ["templates"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "9. Templates & Generic Programming", lessonTitle: "Class Templates",
    title: "Generic Stack<T> Class", difficulty: "medium",
    statement: "Implement a templated Stack<T> class backed by a vector, with push, pop, top, and empty.",
    tags: ["templates"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "10. File & Exception Handling", lessonTitle: "try / catch / throw",
    title: "Safe Division with Custom Exception", difficulty: "easy",
    statement: "Write a divide(a, b) function that throws a custom DivideByZeroException instead of crashing on b == 0.",
    tags: ["exceptions"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "10. File & Exception Handling", lessonTitle: "File I/O with fstream",
    title: "Word Frequency Counter from a Text File", difficulty: "medium",
    statement: "Read a text file and print each word's frequency, sorted by count descending.",
    tags: ["file-io"], pattern_tags: ["hashmap"],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "11. Data Structures from Scratch", lessonTitle: "Singly & Doubly Linked List",
    title: "Reverse a Singly Linked List", difficulty: "easy",
    statement: "Given the head of a singly linked list implemented from scratch, reverse it in place.",
    tags: ["linked-list"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "11. Data Structures from Scratch", lessonTitle: "Binary Search Tree",
    title: "BST Insert, Search, and In-Order Traversal", difficulty: "medium",
    statement: "Implement a BST class from scratch with insert, search, and an in-order traversal that yields sorted output.",
    tags: ["bst"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "11. Data Structures from Scratch", lessonTitle: "Hash Table from Scratch",
    title: "Hash Table with Chaining", difficulty: "hard",
    statement: "Implement a hash table from scratch using separate chaining for collision resolution, supporting insert/get/remove.",
    tags: ["hashtable"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "11. Data Structures from Scratch", lessonTitle: "Heap from Scratch",
    title: "Min-Heap with sift-up/sift-down", difficulty: "hard",
    statement: "Implement an array-backed min-heap from scratch with insert and extract-min operations.",
    tags: ["heap"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "12. Advanced Topics", lessonTitle: "Lambdas",
    title: "Sort and Filter with Lambdas", difficulty: "easy",
    statement: "Given a vector of ints, use lambdas with std::sort and std::copy_if to sort descending and filter even numbers.",
    tags: ["lambdas"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "12. Advanced Topics", lessonTitle: "Move Semantics & rvalue References",
    title: "Implement a Move Constructor for a Buffer Class", difficulty: "hard",
    statement: "Given a class owning a raw heap buffer, implement a proper move constructor and move-assignment operator to avoid deep copies.",
    tags: ["move-semantics"], pattern_tags: [],
  },
  {
    trackSlug: "cpp_language", moduleTitle: "12. Advanced Topics", lessonTitle: "Multithreading Basics",
    title: "Parallel Sum with std::thread", difficulty: "hard",
    statement: "Split an array into chunks, sum each chunk in a separate thread, and combine the results.",
    tags: ["concurrency"], pattern_tags: [],
  },
];
