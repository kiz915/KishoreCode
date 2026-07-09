// Full module + lesson list for both tracks.
// This is the single source of truth consumed by supabase/seed.ts.
// `content` is left as a short stub — fill in full markdown per lesson later.

export type LessonSeed = {
  title: string;
  order_index: number;
  summary: string;
};

export type ModuleSeed = {
  title: string;
  description: string;
  order_index: number;
  lessons: LessonSeed[];
};

export type TrackSeed = {
  slug: "cpp_language" | "problem_solving";
  name: string;
  description: string;
  modules: ModuleSeed[];
};

// ===================== TRACK 1: C++ LANGUAGE =====================
const cppLanguage: TrackSeed = {
  slug: "cpp_language",
  name: "C++ Language",
  description: "Scratch-to-expert C++: syntax, OOP, STL, memory, and beyond.",
  modules: [
    {
      title: "1. Basics",
      description: "Syntax, variables, data types, I/O, operators.",
      order_index: 1,
      lessons: [
        { title: "Hello World & Compilation Model", order_index: 1, summary: "How C++ source becomes an executable; compile/link basics." },
        { title: "Variables & Data Types", order_index: 2, summary: "int, float, double, char, bool, sizeof, type ranges." },
        { title: "Input / Output", order_index: 3, summary: "cin/cout, streams, formatting basics." },
        { title: "Operators & Expressions", order_index: 4, summary: "Arithmetic, relational, logical, bitwise, precedence." },
        { title: "Type Conversion & Casting", order_index: 5, summary: "Implicit conversion, static_cast, C-style cast pitfalls." },
        { title: "Constants & Preprocessor Basics", order_index: 6, summary: "const, constexpr, #define, #include mechanics." },
      ],
    },
    {
      title: "2. Control Flow",
      description: "if/else, loops, switch.",
      order_index: 2,
      lessons: [
        { title: "if / else & Ternary", order_index: 1, summary: "Branching, dangling-else, ternary operator." },
        { title: "switch Statements", order_index: 2, summary: "Fallthrough behavior, when switch beats if-chains." },
        { title: "for, while, do-while", order_index: 3, summary: "Loop forms, loop invariants, off-by-one traps." },
        { title: "break, continue, goto", order_index: 4, summary: "Loop control flow and why goto is avoided." },
        { title: "Nested Loops & Loop Complexity", order_index: 5, summary: "Reading nested loop cost before writing code." },
      ],
    },
    {
      title: "3. Functions",
      description: "Declaration, overloading, recursion basics.",
      order_index: 3,
      lessons: [
        { title: "Function Declaration & Definition", order_index: 1, summary: "Prototypes, headers, return types, void functions." },
        { title: "Parameters: Value, Reference, Pointer", order_index: 2, summary: "Pass-by-value vs pass-by-reference tradeoffs." },
        { title: "Default Arguments & Overloading", order_index: 3, summary: "Overload resolution rules and ambiguity." },
        { title: "Recursion Basics", order_index: 4, summary: "Base case, call stack, tracing recursive calls." },
        { title: "Inline Functions & Scope Rules", order_index: 5, summary: "Storage duration, scope, inline hints." },
      ],
    },
    {
      title: "4. Arrays & Strings",
      description: "Static/dynamic arrays, C-strings, std::string.",
      order_index: 4,
      lessons: [
        { title: "1D & 2D Arrays", order_index: 1, summary: "Declaration, initialization, memory layout." },
        { title: "Array-Pointer Relationship", order_index: 2, summary: "Decay to pointer, indexing via pointer arithmetic." },
        { title: "C-Strings vs std::string", order_index: 3, summary: "Null termination vs managed strings." },
        { title: "std::string Operations", order_index: 4, summary: "Substr, find, concatenation, common pitfalls." },
        { title: "Multidimensional & Jagged Arrays", order_index: 5, summary: "vector<vector<int>> patterns." },
      ],
    },
    {
      title: "5. Pointers & References",
      description: "Address-of, dereferencing, pointer arithmetic, references.",
      order_index: 5,
      lessons: [
        { title: "Pointer Fundamentals", order_index: 1, summary: "Address-of, dereference, null pointers." },
        { title: "Pointer Arithmetic", order_index: 2, summary: "Arrays and pointers, iterating via pointers." },
        { title: "References vs Pointers", order_index: 3, summary: "When to use each; aliasing rules." },
        { title: "Pointers to Pointers & Function Pointers", order_index: 4, summary: "Double indirection, callback-style function pointers." },
        { title: "Dangling Pointers & Common Bugs", order_index: 5, summary: "Use-after-free, wild pointers, defensive habits." },
      ],
    },
    {
      title: "6. Object-Oriented Programming",
      description: "Classes, objects, inheritance, polymorphism.",
      order_index: 6,
      lessons: [
        { title: "Classes & Objects", order_index: 1, summary: "Members, access specifiers, this pointer." },
        { title: "Constructors & Destructors", order_index: 2, summary: "Default, parameterized, copy constructors; RAII intro." },
        { title: "Encapsulation & Static Members", order_index: 3, summary: "Getters/setters, static fields and methods." },
        { title: "Inheritance", order_index: 4, summary: "Single/multiple inheritance, access control across hierarchy." },
        { title: "Polymorphism & Virtual Functions", order_index: 5, summary: "vtable mental model, override, pure virtual." },
        { title: "Operator Overloading", order_index: 6, summary: "Overloading +, ==, <<, and friend functions." },
        { title: "Abstract Classes & Interfaces", order_index: 7, summary: "Pure virtual classes as interfaces in C++." },
      ],
    },
    {
      title: "7. STL",
      description: "Vectors, maps, sets, stacks, queues, iterators, algorithms.",
      order_index: 7,
      lessons: [
        { title: "vector Deep Dive", order_index: 1, summary: "Growth strategy, push_back cost, iterators." },
        { title: "pair & tuple", order_index: 2, summary: "Grouping heterogeneous data quickly." },
        { title: "set & map", order_index: 3, summary: "Ordered associative containers, O(log n) ops." },
        { title: "unordered_set & unordered_map", order_index: 4, summary: "Hash-based containers, average O(1), collisions." },
        { title: "stack & queue", order_index: 5, summary: "LIFO/FIFO adapters and their typical use cases." },
        { title: "deque & priority_queue", order_index: 6, summary: "Double-ended queue and heap-backed priority_queue." },
        { title: "Iterators", order_index: 7, summary: "begin/end, iterator categories, invalidation rules." },
        { title: "<algorithm> Essentials", order_index: 8, summary: "sort, binary_search, lower_bound, accumulate, custom comparators." },
      ],
    },
    {
      title: "8. Memory Management",
      description: "Stack vs heap, new/delete, smart pointers.",
      order_index: 8,
      lessons: [
        { title: "Stack vs Heap", order_index: 1, summary: "Lifetime, allocation cost, when each is used." },
        { title: "new / delete & Memory Leaks", order_index: 2, summary: "Manual allocation and how leaks happen." },
        { title: "unique_ptr", order_index: 3, summary: "Exclusive ownership, move-only semantics." },
        { title: "shared_ptr & weak_ptr", order_index: 4, summary: "Reference counting and breaking cycles." },
        { title: "RAII Principle", order_index: 5, summary: "Tying resource lifetime to object lifetime." },
      ],
    },
    {
      title: "9. Templates & Generic Programming",
      description: "Function templates, class templates, type traits basics.",
      order_index: 9,
      lessons: [
        { title: "Function Templates", order_index: 1, summary: "Writing type-generic functions." },
        { title: "Class Templates", order_index: 2, summary: "Generic containers and template parameters." },
        { title: "Template Specialization", order_index: 3, summary: "Full and partial specialization use cases." },
        { title: "Variadic Templates (Intro)", order_index: 4, summary: "Parameter packs at a conceptual level." },
      ],
    },
    {
      title: "10. File & Exception Handling",
      description: "fstream, try/catch, custom exceptions.",
      order_index: 10,
      lessons: [
        { title: "File I/O with fstream", order_index: 1, summary: "Reading/writing text files, stream state checks." },
        { title: "try / catch / throw", order_index: 2, summary: "Exception propagation and stack unwinding." },
        { title: "Standard Exception Hierarchy", order_index: 3, summary: "std::exception, runtime_error, logic_error." },
        { title: "Custom Exceptions", order_index: 4, summary: "Deriving your own exception types." },
      ],
    },
    {
      title: "11. Data Structures from Scratch",
      description: "Implementing core structures without STL, to build intuition.",
      order_index: 11,
      lessons: [
        { title: "Singly & Doubly Linked List", order_index: 1, summary: "Node structs, insert/delete by hand." },
        { title: "Stack & Queue from Scratch", order_index: 2, summary: "Array-based and linked-list-based implementations." },
        { title: "Binary Search Tree", order_index: 3, summary: "Insert, search, delete, traversal from first principles." },
        { title: "Hash Table from Scratch", order_index: 4, summary: "Buckets, collision handling, load factor." },
        { title: "Heap from Scratch", order_index: 5, summary: "Array-backed binary heap, sift up/down." },
        { title: "Graph Representations", order_index: 6, summary: "Adjacency list vs matrix, tradeoffs." },
      ],
    },
    {
      title: "12. Advanced Topics",
      description: "Multithreading basics, move semantics, lambdas.",
      order_index: 12,
      lessons: [
        { title: "Lambdas", order_index: 1, summary: "Capture lists, use with STL algorithms." },
        { title: "Move Semantics & rvalue References", order_index: 2, summary: "std::move, avoiding needless copies." },
        { title: "Multithreading Basics", order_index: 3, summary: "std::thread, join/detach, race condition intuition." },
        { title: "Mutexes & Synchronization", order_index: 4, summary: "std::mutex, lock_guard, avoiding deadlock." },
      ],
    },
  ],
};

// ============== TRACK 2: PROBLEM SOLVING & LOGIC BUILDING ==============
const problemSolving: TrackSeed = {
  slug: "problem_solving",
  name: "Problem Solving & Logic Building",
  description: "Pattern-based thinking, independent of language mechanics — recognize the pattern, then apply it.",
  modules: [
    {
      title: "1. Brute Force & Complexity Thinking",
      description: "Baseline every problem before optimizing; read time/space limits correctly.",
      order_index: 1,
      lessons: [
        { title: "What 'Brute Force' Actually Means", order_index: 1, summary: "Always find the naive solution first — it defines the floor." },
        { title: "Reading Constraints to Predict Complexity", order_index: 2, summary: "n ≤ 10^5 vs n ≤ 20: what algorithm classes are even legal." },
        { title: "Time & Space Tradeoffs", order_index: 3, summary: "When trading memory for speed (or vice versa) is worth it." },
      ],
    },
    {
      title: "2. Two Pointers",
      description: "Signal: sorted array/string, pair/triplet search, in-place partitioning.",
      order_index: 2,
      lessons: [
        { title: "Opposite-End Two Pointers", order_index: 1, summary: "Recognizing 'sorted array + target pair/sum' problems." },
        { title: "Same-Direction (Fast/Slow) Pointers", order_index: 2, summary: "In-place dedup, partitioning, cycle-adjacent uses." },
        { title: "Two Pointers on Two Different Arrays", order_index: 3, summary: "Merge-style pointer walking across two sequences." },
      ],
    },
    {
      title: "3. Sliding Window",
      description: "Signal: contiguous subarray/substring with a size or condition constraint.",
      order_index: 3,
      lessons: [
        { title: "Fixed-Size Window", order_index: 1, summary: "Constant window length, recompute incrementally." },
        { title: "Variable-Size Window (Expand/Shrink)", order_index: 2, summary: "Grow while valid, shrink when invalid — the core template." },
        { title: "Window + Frequency Map Combo", order_index: 3, summary: "Substring problems needing character/element counts." },
      ],
    },
    {
      title: "4. Prefix Sum & Difference Arrays",
      description: "Signal: many range-sum or range-update queries.",
      order_index: 4,
      lessons: [
        { title: "1D Prefix Sums", order_index: 1, summary: "O(1) range sum after O(n) preprocessing." },
        { title: "2D Prefix Sums", order_index: 2, summary: "Rectangle sum queries on a grid." },
        { title: "Difference Arrays", order_index: 3, summary: "O(1) range updates, O(n) to materialize results." },
      ],
    },
    {
      title: "5. Binary Search on Answer",
      description: "Signal: 'minimize the maximum' / 'maximize the minimum' with a monotonic feasibility check.",
      order_index: 5,
      lessons: [
        { title: "Classic Binary Search Recap", order_index: 1, summary: "Search space, invariant, termination — done rigorously." },
        { title: "Recognizing Monotonic Feasibility", order_index: 2, summary: "The 'if X works, does X+1 also work?' test." },
        { title: "Binary Search on the Answer Space", order_index: 3, summary: "Searching a value, not an index, with a feasibility predicate." },
      ],
    },
    {
      title: "6. Recursion & Backtracking Patterns",
      description: "Signal: explore all combinations/permutations/subsets, or 'find all ways'.",
      order_index: 6,
      lessons: [
        { title: "Recursion Tree Thinking", order_index: 1, summary: "Visualizing state, branching, and depth before coding." },
        { title: "Subsets & Combinations", order_index: 2, summary: "Include/exclude decision at each step." },
        { title: "Permutations", order_index: 3, summary: "Swap-based and used[] based generation." },
        { title: "Backtracking with Pruning", order_index: 4, summary: "Cutting branches early — N-Queens, Sudoku-style problems." },
      ],
    },
    {
      title: "7. Greedy Thinking",
      description: "Signal: local optimal choice provably leads to global optimum.",
      order_index: 7,
      lessons: [
        { title: "What Makes a Problem Greedy", order_index: 1, summary: "The exchange-argument mental check before committing to greedy." },
        { title: "Interval Scheduling & Sorting-Based Greedy", order_index: 2, summary: "Sort by end time, activity selection family." },
        { title: "Greedy vs DP: Telling Them Apart", order_index: 3, summary: "When the greedy choice property fails and DP is required instead." },
      ],
    },
    {
      title: "8. Divide and Conquer",
      description: "Signal: problem splits into independent subproblems that recombine.",
      order_index: 8,
      lessons: [
        { title: "D&C Recap via Merge Sort / Quick Sort", order_index: 1, summary: "Split, solve, combine — with complexity via recurrence." },
        { title: "D&C Beyond Sorting", order_index: 2, summary: "Closest pair, counting inversions, other split-and-merge problems." },
      ],
    },
    {
      title: "9. Dynamic Programming Patterns",
      description: "Signal: overlapping subproblems + optimal substructure. Organized by DP family.",
      order_index: 9,
      lessons: [
        { title: "DP Foundations: Memoization vs Tabulation", order_index: 1, summary: "Top-down vs bottom-up, state definition first." },
        { title: "0/1 Knapsack Family", order_index: 2, summary: "Take-or-leave decisions with a capacity constraint." },
        { title: "Unbounded Knapsack Family", order_index: 3, summary: "Coin change / rod cutting style reuse-allowed problems." },
        { title: "LCS-Family (String DP)", order_index: 4, summary: "Longest common subsequence, edit distance, string alignment." },
        { title: "Interval DP", order_index: 5, summary: "DP over subranges — matrix chain, burst balloons pattern." },
        { title: "Digit DP", order_index: 6, summary: "Counting numbers in a range satisfying a digit property." },
      ],
    },
    {
      title: "10. Graph Traversal Patterns",
      description: "Signal: connectivity, shortest path, reachability, or component structure.",
      order_index: 10,
      lessons: [
        { title: "BFS: When and Why", order_index: 1, summary: "Shortest path in unweighted graphs, level-order exploration." },
        { title: "DFS: When and Why", order_index: 2, summary: "Connectivity, cycle detection, path existence." },
        { title: "Choosing BFS vs DFS", order_index: 3, summary: "A direct signal checklist for picking the right traversal." },
        { title: "Union-Find (Disjoint Set)", order_index: 4, summary: "Dynamic connectivity without a full traversal." },
        { title: "Dijkstra & Weighted Shortest Path", order_index: 5, summary: "Priority-queue based shortest path for non-negative weights." },
      ],
    },
    {
      title: "11. Tree Patterns",
      description: "Signal: hierarchical/recursive structure, ancestor-descendant relationships.",
      order_index: 11,
      lessons: [
        { title: "Tree Traversals (Pre/In/Post/Level)", order_index: 1, summary: "When each traversal order matters." },
        { title: "Recursion on Trees", order_index: 2, summary: "Passing state down, returning aggregates up." },
        { title: "Diameter / Height / Balance Problems", order_index: 3, summary: "Common 'compute a global property in one pass' pattern." },
        { title: "LCA-Type Problems", order_index: 4, summary: "Lowest common ancestor and ancestor-query patterns." },
      ],
    },
    {
      title: "12. Bit Manipulation Tricks",
      description: "Signal: subsets via bitmask, XOR tricks, or O(1) bit-level ops.",
      order_index: 12,
      lessons: [
        { title: "Bitwise Operators Refresher", order_index: 1, summary: "AND/OR/XOR/shift as problem-solving tools, not just syntax." },
        { title: "XOR Tricks", order_index: 2, summary: "Finding the unique element, swapping without temp, parity checks." },
        { title: "Bitmasking for Subsets", order_index: 3, summary: "Representing subsets as integers for DP over subsets." },
      ],
    },
    {
      title: "13. Math & Number Theory for CP",
      description: "Signal: divisibility, primality, counting, or modular arithmetic in the statement.",
      order_index: 13,
      lessons: [
        { title: "GCD / LCM & the Euclidean Algorithm", order_index: 1, summary: "Fast GCD and its use in simplifying other problems." },
        { title: "Modular Arithmetic", order_index: 2, summary: "Why 'mod 1e9+7' appears, and how to work under it safely." },
        { title: "Sieve of Eratosthenes", order_index: 3, summary: "Precomputing primes fast for repeated queries." },
        { title: "Combinatorics Basics", order_index: 4, summary: "nCr, factorial precomputation, basic counting principles." },
      ],
    },
  ],
};

export const curriculum: TrackSeed[] = [cppLanguage, problemSolving];
