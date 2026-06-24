const mongoose = require("mongoose");
require("dotenv").config();
const Question = require("./models/Question");




//OS QUESTIONS
const osQuestions = [
  // 7 easy
  {
    topic: "OS",
    difficulty: "easy",
    title: "If someone says the operating system is just an interface between user and hardware, how would you explain what that really means in practice?",
    description: "A strong answer should connect the OS to process management, memory management, files, scheduling, and hardware abstraction.",
  },
  {
    topic: "OS",
    difficulty: "easy",
    title: "What is the difference between a process and a thread, and why does that distinction matter when designing scalable applications?",
    description: "Look for discussion of memory space, execution units, overhead, and concurrency implications.",
  },
  {
    topic: "OS",
    difficulty: "easy",
    title: "How would you explain context switching to someone who has written code but never studied operating systems deeply?",
    description: "The candidate should describe CPU switching between tasks, saved state, overhead, and why excessive switching hurts performance.",
  },
  {
    topic: "OS",
    difficulty: "easy",
    title: "What is CPU scheduling, and why is choosing the wrong scheduling strategy a real system problem rather than just an exam topic?",
    description: "Expect practical discussion of responsiveness, fairness, throughput, and waiting time.",
  },
  {
    topic: "OS",
    difficulty: "easy",
    title: "What is deadlock, and how would you explain it using a real-world analogy and then connect it back to operating systems?",
    description: "A strong answer should make the concept intuitive while still mentioning resource waiting and circular dependency.",
  },
  {
    topic: "OS",
    difficulty: "easy",
    title: "What is paging, and how does it help the operating system manage memory more effectively?",
    description: "Look for explanation of pages, frames, non-contiguous allocation, and reduced external fragmentation.",
  },
  {
    topic: "OS",
    difficulty: "easy",
    title: "Why do modern operating systems use virtual memory, and what problem would arise if every process had to fit entirely in physical memory?",
    description: "The candidate should discuss isolation, larger address space illusion, multiprogramming, and efficient memory use.",
  },

  // 15 medium
  {
    topic: "OS",
    difficulty: "medium",
    title: "Compare FCFS, SJF, Round Robin, and Priority scheduling. In what kinds of systems would each make sense, and what tradeoffs would you expect?",
    description: "A strong answer should compare fairness, throughput, response time, starvation risk, and practical usage contexts.",
  },
  {
    topic: "OS",
    difficulty: "medium",
    title: "What is starvation in scheduling, and how does aging help solve it without completely changing the scheduler?",
    description: "Look for clear explanation of starvation, unfairness, and gradual priority adjustment.",
  },
  {
    topic: "OS",
    difficulty: "medium",
    title: "If a system suddenly becomes slow because it spends too much time moving pages in and out of memory, how would you explain thrashing?",
    description: "The candidate should connect thrashing to high page-fault rate, insufficient memory, and poor performance.",
  },
  {
    topic: "OS",
    difficulty: "medium",
    title: "What is a page fault, and why is it not always an error even though the term sounds like something went wrong?",
    description: "Expect explanation of valid page loading behavior versus invalid memory access.",
  },
  {
    topic: "OS",
    difficulty: "medium",
    title: "How would you explain semaphores to someone who understands programming but struggles with concurrency problems?",
    description: "A good answer should discuss signaling, synchronization, mutual exclusion, and common mistakes.",
  },
  {
    topic: "OS",
    difficulty: "medium",
    title: "What is a race condition, and how would you explain why these bugs are often difficult to reproduce and debug?",
    description: "Strong answers should connect race conditions to nondeterministic interleavings and shared state access.",
  },
  {
    topic: "OS",
    difficulty: "medium",
    title: "Suppose two threads need to safely update shared data. How would you decide whether to use a mutex, semaphore, or some other synchronization mechanism?",
    description: "The candidate should compare tools instead of giving a one-size-fits-all answer.",
  },
  {
    topic: "OS",
    difficulty: "medium",
    title: "What is the producer-consumer problem, and why is it such a common example in concurrency interviews?",
    description: "Look for bounded buffer reasoning, synchronization, waiting conditions, and real system analogies.",
  },
  {
    topic: "OS",
    difficulty: "medium",
    title: "How would you explain the difference between user mode and kernel mode, and why is that separation critical for system stability?",
    description: "A strong answer should mention privilege levels, protected instructions, and fault isolation.",
  },
  {
    topic: "OS",
    difficulty: "medium",
    title: "What is fragmentation in memory management, and why do different allocation strategies struggle with it in different ways?",
    description: "Expect explanation of internal vs external fragmentation and practical consequences.",
  },
  {
    topic: "OS",
    difficulty: "medium",
    title: "What happens during process creation, and how does the operating system set up a process before it starts executing user code?",
    description: "The candidate should discuss address space, PCB, registers, resources, and scheduling readiness.",
  },
  {
    topic: "OS",
    difficulty: "medium",
    title: "If an interviewer asks what happens when you execute a program, how would you connect file loading, memory allocation, and process scheduling into one coherent answer?",
    description: "Look for end-to-end operating system understanding rather than isolated terms.",
  },
  {
    topic: "OS",
    difficulty: "medium",
    title: "How would you compare kernel threads and user threads from the perspective of performance, control, and operating system involvement?",
    description: "Strong answers should discuss scheduling, blocking behavior, overhead, and runtime tradeoffs.",
  },
  {
    topic: "OS",
    difficulty: "medium",
    title: "Why is synchronization not just about preventing corruption, but also about preserving correctness and predictability in concurrent systems?",
    description: "The candidate should discuss ordering, invariants, and logical correctness, not just crashes.",
  },
  {
    topic: "OS",
    difficulty: "medium",
    title: "Suppose a system has multiple processes competing for CPU, memory, and I/O. How does the OS balance fairness and efficiency across all of them?",
    description: "Look for a systems-level answer covering scheduling, priorities, blocking, and resource management.",
  },

  // 8 hard
  {
    topic: "OS",
    difficulty: "hard",
    title: "Can you explain Banker’s algorithm not as a memorized procedure, but as a way of reasoning about safe and unsafe allocation states?",
    description: "A strong answer should show intuition about deadlock avoidance and why knowing future resource needs matters.",
  },
  {
    topic: "OS",
    difficulty: "hard",
    title: "What is the difference between deadlock prevention, avoidance, and detection, and how would you decide which approach is realistic in a production system?",
    description: "Expect comparison of guarantees, overhead, assumptions, and practicality.",
  },
  {
    topic: "OS",
    difficulty: "hard",
    title: "How would you explain copy-on-write, and why is it such an elegant optimization in modern operating systems?",
    description: "The candidate should connect it to process forking, memory efficiency, and delayed copying.",
  },
  {
    topic: "OS",
    difficulty: "hard",
    title: "What is a TLB, and why can address translation performance become a major bottleneck without it?",
    description: "A strong answer should explain virtual-to-physical translation cost and the role of caching page-table lookups.",
  },
  {
    topic: "OS",
    difficulty: "hard",
    title: "If physical memory is large and address spaces are even larger, why are multi-level page tables necessary, and what tradeoffs do they introduce?",
    description: "Look for memory efficiency reasoning, sparse address spaces, and added lookup complexity.",
  },
  {
    topic: "OS",
    difficulty: "hard",
    title: "How would you reason about file-system design choices such as inode-based metadata, block allocation, and crash recovery?",
    description: "The candidate should connect file-system structures to performance, consistency, and recoverability.",
  },
  {
    topic: "OS",
    difficulty: "hard",
    title: "In a highly concurrent system, how do lock contention and context switching together affect performance, and how would you recognize that in practice?",
    description: "Strong answers should discuss throughput collapse, waiting, profiling symptoms, and scaling limits.",
  },
  {
    topic: "OS",
    difficulty: "hard",
    title: "Suppose an application is CPU-light but still feels slow under load. How would you reason about whether the bottleneck is scheduling, memory, locking, or I/O waits?",
    description: "Expect a systematic operating-systems-level diagnostic answer, not just one guess.",
  },
];


// DSA QUESTIONS
const dsaQuestions = [
  {
    topic: "DSA",
    difficulty: "easy",
    type: "coding",
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9.",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Exactly one valid answer exists.",
    ],
    expectedComplexity: "O(n) time, O(n) space",
  },
  {
    topic: "DSA",
    difficulty: "easy",
    type: "coding",
    title: "Valid Parentheses",
    description: "Given a string containing only brackets '(', ')', '{', '}', '[' and ']', determine whether the input string is valid.",
    examples: [
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: "Each opening bracket is closed by the same type of bracket in the correct order.",
      },
    ],
    constraints: ["1 <= s.length <= 10^4", "s contains only bracket characters."],
    expectedComplexity: "O(n) time, O(n) space",
  },
  {
    topic: "DSA",
    difficulty: "easy",
    type: "coding",
    title: "Binary Search",
    description: "Given a sorted array of integers nums and a target value, return the index of target if it exists, otherwise return -1.",
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists at index 4.",
      },
    ],
    constraints: ["1 <= nums.length <= 10^4", "nums is sorted in ascending order."],
    expectedComplexity: "O(log n) time, O(1) space",
  },
  {
    topic: "DSA",
    difficulty: "medium",
    type: "coding",
    title: "Maximum Subarray",
    description: "Given an integer array nums, find the contiguous subarray with the largest sum and return that sum.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum.",
      },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    expectedComplexity: "O(n) time, O(1) space",
  },
  {
    topic: "DSA",
    difficulty: "medium",
    type: "coding",
    title: "Reverse Linked List",
    description: "Given the head of a singly linked list, reverse the list and return the new head.",
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
        explanation: "All next pointers are reversed.",
      },
    ],
    constraints: ["0 <= number of nodes <= 5000", "-5000 <= Node.val <= 5000"],
    expectedComplexity: "O(n) time, O(1) space",
  },
  {
    topic: "DSA",
    difficulty: "easy",
    type: "coding",
    title: "Merge Two Sorted Arrays",
    description: "Given two sorted arrays, merge them into one sorted array and return the result.",
    examples: [
      {
        input: "nums1 = [1,3,5], nums2 = [2,4,6]",
        output: "[1,2,3,4,5,6]",
        explanation: "Elements from both arrays are merged while preserving sorted order.",
      },
    ],
    constraints: ["0 <= nums1.length, nums2.length <= 10^4", "Both arrays are sorted in ascending order."],
    expectedComplexity: "O(n + m) time, O(n + m) space",
  },
  {
    topic: "DSA",
    difficulty: "easy",
    type: "coding",
    title: "First Non-Repeating Character",
    description: "Given a string s, return the first character that appears only once. If no such character exists, return an empty string.",
    examples: [
      {
        input: 's = "leetcode"',
        output: '"l"',
        explanation: "The character l appears once and is the first non-repeating character.",
      },
    ],
    constraints: ["1 <= s.length <= 10^5", "s contains lowercase English letters."],
    expectedComplexity: "O(n) time, O(1) space for fixed alphabet",
  },
  {
    topic: "DSA",
    difficulty: "medium",
    type: "coding",
    title: "Detect Cycle in Linked List",
    description: "Given the head of a linked list, determine whether the linked list has a cycle.",
    examples: [
      {
        input: "head = [3,2,0,-4], pos = 1",
        output: "true",
        explanation: "The tail connects to the node at index 1.",
      },
    ],
    constraints: ["0 <= number of nodes <= 10^4", "-10^5 <= Node.val <= 10^5"],
    expectedComplexity: "O(n) time, O(1) space",
  },
  {
    topic: "DSA",
    difficulty: "medium",
    type: "coding",
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, return the length of the longest substring without repeating characters.",
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with length 3.',
      },
    ],
    constraints: ["0 <= s.length <= 5 * 10^4", "s may contain letters, digits, symbols, and spaces."],
    expectedComplexity: "O(n) time, O(min(n, charset)) space",
  },
  {
    topic: "DSA",
    difficulty: "hard",
    type: "coding",
    title: "LRU Cache",
    description: "Design a data structure that supports get and put operations in O(1) average time, evicting the least recently used item when capacity is exceeded.",
    examples: [
      {
        input: "capacity = 2; put(1,1); put(2,2); get(1); put(3,3); get(2)",
        output: "1, -1",
        explanation: "Key 2 is evicted because it becomes the least recently used key.",
      },
    ],
    constraints: ["1 <= capacity <= 3000", "0 <= key, value <= 10^4", "At most 2 * 10^5 operations."],
    expectedComplexity: "O(1) average time for get and put",
  },
  {
    topic: "DSA",
    difficulty: "medium",
    type: "coding",
    title: "Product of Array Except Self",
    description: "Given an integer array nums, return an array answer such that answer[i] is the product of all elements except nums[i], without using division.",
    examples: [
      {
        input: "nums = [1,2,3,4]",
        output: "[24,12,8,6]",
        explanation: "Each index contains the product of every other value.",
      },
    ],
    constraints: ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30", "Do not use division."],
    expectedComplexity: "O(n) time, O(1) extra space excluding output",
  },
  {
    topic: "DSA",
    difficulty: "medium",
    type: "coding",
    title: "Kth Largest Element",
    description: "Given an integer array nums and an integer k, return the kth largest element in the array.",
    examples: [
      {
        input: "nums = [3,2,1,5,6,4], k = 2",
        output: "5",
        explanation: "The second largest element is 5.",
      },
    ],
    constraints: ["1 <= k <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    expectedComplexity: "O(n log k) with a min heap, or O(n) average with quickselect",
  },
  {
    topic: "DSA",
    difficulty: "hard",
    type: "coding",
    title: "Number of Islands",
    description: "Given a 2D grid of '1's and '0's, count the number of islands. An island is surrounded by water and connected horizontally or vertically.",
    examples: [
      {
        input: 'grid = [["1","1","0"],["1","0","0"],["0","0","1"]]',
        output: "2",
        explanation: "There are two disconnected land regions.",
      },
    ],
    constraints: ["1 <= rows, cols <= 300", "grid[i][j] is '0' or '1'."],
    expectedComplexity: "O(rows * cols) time, O(rows * cols) space in worst case",
  },
  {
    topic: "DSA",
    difficulty: "hard",
    type: "coding",
    title: "Coin Change",
    description: "Given coin denominations and an amount, return the fewest number of coins needed to make that amount. Return -1 if it is not possible.",
    examples: [
      {
        input: "coins = [1,2,5], amount = 11",
        output: "3",
        explanation: "11 = 5 + 5 + 1.",
      },
    ],
    constraints: ["1 <= coins.length <= 12", "0 <= amount <= 10^4"],
    expectedComplexity: "O(amount * number of coins) time, O(amount) space",
  },
  {
    topic: "DSA",
    difficulty: "hard",
    type: "coding",
    title: "Serialize and Deserialize Binary Tree",
    description: "Design methods to serialize a binary tree into a string and deserialize the string back into the original tree structure.",
    examples: [
      {
        input: "root = [1,2,3,null,null,4,5]",
        output: "[1,2,3,null,null,4,5]",
        explanation: "The tree should be reconstructed with the same structure and values.",
      },
    ],
    constraints: ["0 <= number of nodes <= 10^4", "-1000 <= Node.val <= 1000"],
    expectedComplexity: "O(n) time and O(n) space",
  },
];

// OOPS QUESTIONS
const oopsQuestions = [
  {
    topic: "OOPS",
    difficulty: "easy",
    title: "What are the four pillars of object-oriented programming, and how do they help organize real software?",
    description: "Expect encapsulation, abstraction, inheritance, polymorphism, and practical examples.",
  },
  {
    topic: "OOPS",
    difficulty: "easy",
    title: "How would you explain the difference between a class and an object using a practical example?",
    description: "A strong answer should separate blueprint from instance and mention state and behavior.",
  },
  {
    topic: "OOPS",
    difficulty: "medium",
    title: "What is polymorphism, and how do method overloading and method overriding differ?",
    description: "Look for compile-time vs runtime behavior and clear language-specific examples.",
  },
  {
    topic: "OOPS",
    difficulty: "medium",
    title: "Why is encapsulation important, and how can poor encapsulation make a codebase harder to maintain?",
    description: "Expect discussion of data hiding, invariants, controlled access, and coupling.",
  },
  {
    topic: "OOPS",
    difficulty: "hard",
    title: "How would you decide between inheritance and composition when designing a system?",
    description: "A strong answer should compare reuse, flexibility, coupling, and the is-a versus has-a relationship.",
  },
  {
    topic: "OOPS",
    difficulty: "easy",
    title: "What is abstraction, and how is it different from encapsulation?",
    description: "Expect hiding implementation details versus protecting internal state through controlled access.",
  },
  {
    topic: "OOPS",
    difficulty: "easy",
    title: "What is a constructor, and why is it useful when creating objects?",
    description: "Look for initialization of object state and enforcing required values at creation time.",
  },
  {
    topic: "OOPS",
    difficulty: "easy",
    title: "How would you explain access modifiers like public, private, and protected?",
    description: "A strong answer should connect visibility rules to encapsulation and API design.",
  },
  {
    topic: "OOPS",
    difficulty: "medium",
    title: "What is an interface, and how does it help design loosely coupled code?",
    description: "Expect contracts, implementation flexibility, dependency inversion, and testability.",
  },
  {
    topic: "OOPS",
    difficulty: "medium",
    title: "What is the difference between an abstract class and an interface?",
    description: "Look for shared implementation, contracts, inheritance limits, and language-specific nuances.",
  },
  {
    topic: "OOPS",
    difficulty: "medium",
    title: "How does dependency injection improve object-oriented design?",
    description: "Expect reduced coupling, easier testing, swappable dependencies, and clearer construction.",
  },
  {
    topic: "OOPS",
    difficulty: "medium",
    title: "What is tight coupling, and how can object-oriented design reduce it?",
    description: "A good answer should mention interfaces, composition, dependency injection, and modular design.",
  },
  {
    topic: "OOPS",
    difficulty: "medium",
    title: "How would you model a real-world system like a library or payment system using classes?",
    description: "Look for entities, responsibilities, relationships, and avoiding one class doing everything.",
  },
  {
    topic: "OOPS",
    difficulty: "hard",
    title: "How would you apply SOLID principles while designing a maintainable service layer?",
    description: "Expect practical discussion of single responsibility, open-closed design, interfaces, and dependency inversion.",
  },
  {
    topic: "OOPS",
    difficulty: "hard",
    title: "How can inheritance lead to fragile designs, and what alternatives would you consider?",
    description: "A strong answer should discuss deep hierarchies, overridden behavior, composition, and delegation.",
  },
  {
  topic: "OOPS",
  difficulty: "easy",
  title: "What is the difference between instance variables and class/static variables?",
  description: "Expect object-level state versus shared class-level state, memory behavior, and practical examples.",
},
{
  topic: "OOPS",
  difficulty: "easy",
  title: "What is method overloading, and why can it make an API easier to use?",
  description: "Look for same method name with different parameters, compile-time resolution, and readability benefits.",
},
{
  topic: "OOPS",
  difficulty: "easy",
  title: "What is method overriding, and how does it support runtime polymorphism?",
  description: "Expect subclass behavior, dynamic dispatch, parent-child relationship, and practical examples.",
},
{
  topic: "OOPS",
  difficulty: "easy",
  title: "What is the difference between shallow copy and deep copy?",
  description: "Look for object references, nested objects, mutation effects, and when deep copying is necessary.",
},
{
  topic: "OOPS",
  difficulty: "medium",
  title: "How would you explain the Open-Closed Principle using a real software example?",
  description: "Expect extension without modification, interfaces or abstraction, and avoiding repeated changes to stable code.",
},
{
  topic: "OOPS",
  difficulty: "medium",
  title: "What is the Liskov Substitution Principle, and how can violating it create bugs?",
  description: "Look for substitutability, broken inheritance, unexpected subclass behavior, and design correctness.",
},
{
  topic: "OOPS",
  difficulty: "medium",
  title: "How would you design classes for a notification system that supports email, SMS, and push notifications?",
  description: "Expect interfaces, polymorphism, separation of responsibilities, extensibility, and avoiding condition-heavy code.",
},
{
  topic: "OOPS",
  difficulty: "medium",
  title: "What is the difference between association, aggregation, and composition?",
  description: "Look for object relationships, ownership strength, lifecycle dependency, and examples.",
},
{
  topic: "OOPS",
  difficulty: "medium",
  title: "How does dependency inversion help reduce coupling between high-level and low-level modules?",
  description: "Expect abstractions, interfaces, dependency injection, testing benefits, and maintainable architecture.",
},
{
  topic: "OOPS",
  difficulty: "medium",
  title: "How would you identify that a class is doing too much, and how would you split it responsibly?",
  description: "Look for single responsibility, cohesion, extracting services/classes, preserving behavior, and testing.",
},
{
  topic: "OOPS",
  difficulty: "medium",
  title: "What is the difference between an object-oriented design and a procedural design for the same feature?",
  description: "Expect state plus behavior, responsibility assignment, encapsulation, tradeoffs, and practical comparison.",
},
{
  topic: "OOPS",
  difficulty: "hard",
  title: "How would you refactor a payment processing class that has logic for validation, pricing, persistence, and external API calls?",
  description: "Expect responsibility separation, service extraction, interfaces, dependency injection, transaction boundaries, and tests.",
},
{
  topic: "OOPS",
  difficulty: "hard",
  title: "How can design patterns be useful, and how can overusing them make a codebase worse?",
  description: "Look for reusable solutions, communication benefits, accidental complexity, premature abstraction, and context-aware design.",
},
{
  topic: "OOPS",
  difficulty: "hard",
  title: "How would you apply the Strategy pattern to replace a large if-else block in business logic?",
  description: "Expect interchangeable behaviors, common interface, runtime selection, extensibility, and testability.",
},
{
  topic: "OOPS",
  difficulty: "hard",
  title: "How would you design an extensible interview evaluation system using object-oriented principles?",
  description: "Look for evaluator interfaces, separate rubrics, topic-specific strategies, scoring objects, and easy addition of new question types.",
},
];

// DBMS QUESTIONS
const dbmsQuestions = [
  {
  topic: "DBMS",
  difficulty: "easy",
  title: "What is the difference between DELETE, TRUNCATE, and DROP, and when would you use each?",
  description: "Expect command purpose, rollback behavior, table structure impact, and practical usage differences.",
},
{
  topic: "DBMS",
  difficulty: "easy",
  title: "What is a unique constraint, and how is it different from a primary key?",
  description: "Look for uniqueness, null handling, table identity, and examples such as email fields.",
},
{
  topic: "DBMS",
  difficulty: "easy",
  title: "What is a view in SQL, and why might developers use one instead of querying tables directly?",
  description: "Expect virtual tables, abstraction, security, reusable queries, and simplified reporting.",
},
{
  topic: "DBMS",
  difficulty: "easy",
  title: "What is the difference between WHERE and HAVING in SQL queries?",
  description: "Look for filtering rows before grouping versus filtering groups after aggregation.",
},
{
  topic: "DBMS",
  difficulty: "medium",
  title: "How would you explain clustered and non-clustered indexes, and how do they affect data retrieval?",
  description: "Expect physical ordering, lookup behavior, index structure, and query performance tradeoffs.",
},
{
  topic: "DBMS",
  difficulty: "medium",
  title: "What is a query execution plan, and how would you use it to debug a slow query?",
  description: "Look for scans, seeks, joins, cost estimation, indexes, and evidence-based optimization.",
},
{
  topic: "DBMS",
  difficulty: "medium",
  title: "How do GROUP BY and aggregate functions work together, and what mistakes do beginners commonly make with them?",
  description: "Expect grouping logic, COUNT/SUM/AVG usage, selected columns, and filtering with HAVING.",
},
{
  topic: "DBMS",
  difficulty: "medium",
  title: "What is the N+1 query problem, and how can it hurt application performance?",
  description: "Expect repeated queries, ORM behavior, eager loading, joins, batching, and performance impact.",
},
{
  topic: "DBMS",
  difficulty: "medium",
  title: "How would you design a database schema for an e-commerce order system?",
  description: "Look for users, products, orders, order items, payments, addresses, relationships, and normalization.",
},
{
  topic: "DBMS",
  difficulty: "medium",
  title: "What is optimistic locking, and how is it different from pessimistic locking?",
  description: "Expect version checks, conflict detection, blocking behavior, concurrency tradeoffs, and use cases.",
},
{
  topic: "DBMS",
  difficulty: "medium",
  title: "How would you handle pagination for a table with millions of records?",
  description: "Expect LIMIT/OFFSET tradeoffs, cursor-based pagination, indexes, stable ordering, and performance.",
},
{
  topic: "DBMS",
  difficulty: "hard",
  title: "How would you design indexes for a high-traffic dashboard query, and how would you know whether the index helped?",
  description: "Expect compound indexes, selectivity, query plans, write overhead, before/after measurement, and monitoring.",
},
{
  topic: "DBMS",
  difficulty: "hard",
  title: "How would you reason about database sharding, and what problems does sharding introduce?",
  description: "Look for horizontal partitioning, shard keys, uneven distribution, cross-shard queries, rebalancing, and operational complexity.",
},
{
  topic: "DBMS",
  difficulty: "hard",
  title: "What are materialized views, and when would they be useful despite the cost of maintaining them?",
  description: "Expect precomputed results, reporting workloads, refresh strategies, stale data tradeoffs, and performance gains.",
},
{
  topic: "DBMS",
  difficulty: "hard",
  title: "How would you investigate a production issue where database latency suddenly increased after a deployment?",
  description: "Look for query changes, indexes, connection pool usage, locks, slow query logs, execution plans, and rollback strategy.",
},
  {
    topic: "DBMS",
    difficulty: "easy",
    title: "What is normalization, and why do database designers use it?",
    description: "Look for reduced redundancy, data consistency, and explanation of normal forms at a high level.",
  },
  {
    topic: "DBMS",
    difficulty: "easy",
    title: "What is the difference between a primary key and a foreign key?",
    description: "Expect uniqueness, identity, referential integrity, and table relationships.",
  },
  {
    topic: "DBMS",
    difficulty: "medium",
    title: "How do indexes speed up queries, and what tradeoffs do they introduce?",
    description: "A strong answer should mention read performance, write overhead, storage, and index selection.",
  },
  {
    topic: "DBMS",
    difficulty: "medium",
    title: "What are ACID properties, and why are they important for transactions?",
    description: "Expect atomicity, consistency, isolation, durability, and real-world transaction examples.",
  },
  {
    topic: "DBMS",
    difficulty: "hard",
    title: "How would you investigate and improve a slow SQL query in a production application?",
    description: "Look for query plans, indexes, joins, filtering, data volume, and measurement before optimization.",
  },
  {
    topic: "DBMS",
    difficulty: "easy",
    title: "What is the difference between SQL and NoSQL databases?",
    description: "Expect schema, relational structure, flexibility, scaling patterns, and examples of use cases.",
  },
  {
    topic: "DBMS",
    difficulty: "easy",
    title: "What is a table, row, and column in a relational database?",
    description: "Look for clear explanation of relational data organization and records versus attributes.",
  },
  {
    topic: "DBMS",
    difficulty: "easy",
    title: "What is a JOIN, and why is it important in relational databases?",
    description: "Expect combining related tables and examples such as users with orders.",
  },
  {
    topic: "DBMS",
    difficulty: "medium",
    title: "How would you explain the difference between INNER JOIN, LEFT JOIN, and RIGHT JOIN?",
    description: "Look for matching rows, preserving unmatched rows, and practical examples.",
  },
  {
    topic: "DBMS",
    difficulty: "medium",
    title: "What is denormalization, and when might it be useful despite creating redundancy?",
    description: "Expect read performance, reporting systems, tradeoffs, and consistency risks.",
  },
  {
    topic: "DBMS",
    difficulty: "medium",
    title: "What is transaction isolation, and how can isolation levels affect concurrent users?",
    description: "A strong answer should mention dirty reads, non-repeatable reads, phantom reads, and tradeoffs.",
  },
  {
    topic: "DBMS",
    difficulty: "medium",
    title: "How would you design tables for a user, interview session, question, and answer system?",
    description: "Look for entities, relationships, foreign keys, and reasoning about one-to-many relationships.",
  },
  {
    topic: "DBMS",
    difficulty: "medium",
    title: "What is a composite key, and when would you use one?",
    description: "Expect multi-column uniqueness and examples such as enrollment or mapping tables.",
  },
  {
    topic: "DBMS",
    difficulty: "hard",
    title: "How would you reason about database locking and deadlocks in concurrent transactions?",
    description: "Look for lock ordering, isolation, wait cycles, timeouts, and transaction design.",
  },
  {
    topic: "DBMS",
    difficulty: "hard",
    title: "How would you choose between embedding and referencing data in MongoDB for a real application?",
    description: "Expect access patterns, document size, update frequency, consistency, and query needs.",
  },
];

// CN QUESTIONS
const cnQuestions = [
  {
    topic: "CN",
    difficulty: "easy",
    title: "How would you explain the OSI model and why layered networking is useful?",
    description: "Expect layered responsibilities, abstraction, troubleshooting value, and examples from common protocols.",
  },
  {
    topic: "CN",
    difficulty: "easy",
    title: "What is the difference between TCP and UDP, and when would you choose each?",
    description: "Look for reliability, ordering, connection setup, latency, and practical use cases.",
  },
  {
    topic: "CN",
    difficulty: "medium",
    title: "What happens when you enter a URL in the browser and press Enter?",
    description: "A strong answer should connect DNS, TCP/TLS, HTTP request/response, and rendering at a high level.",
  },
  {
    topic: "CN",
    difficulty: "medium",
    title: "How does DNS work, and why is caching important for performance?",
    description: "Expect domain resolution, recursive lookup intuition, TTL, and cache tradeoffs.",
  },
  {
    topic: "CN",
    difficulty: "hard",
    title: "How would you debug an API that works locally but times out when called from another network?",
    description: "Look for systematic reasoning about DNS, routing, firewalls, ports, latency, and server logs.",
  },
  {
    topic: "CN",
    difficulty: "easy",
    title: "What is an IP address, and how is it different from a MAC address?",
    description: "Expect network-layer addressing versus hardware addressing and routing implications.",
  },
  {
    topic: "CN",
    difficulty: "easy",
    title: "What is HTTP, and how is it different from HTTPS?",
    description: "Look for request-response behavior, TLS encryption, certificates, and secure communication.",
  },
  {
    topic: "CN",
    difficulty: "easy",
    title: "What is a port number, and why do applications need ports?",
    description: "A good answer should connect ports to services, processes, and examples like 80, 443, and 5000.",
  },
  {
    topic: "CN",
    difficulty: "medium",
    title: "How does the TCP three-way handshake establish a reliable connection?",
    description: "Expect SYN, SYN-ACK, ACK, sequence coordination, and connection setup intuition.",
  },
  {
    topic: "CN",
    difficulty: "medium",
    title: "What is subnetting, and why is it useful in network design?",
    description: "Look for dividing networks, IP range management, routing, and security boundaries.",
  },
  {
    topic: "CN",
    difficulty: "medium",
    title: "How would you explain packet loss and latency to someone debugging a slow application?",
    description: "Expect network delay, retransmission, congestion, distance, and user-visible effects.",
  },
  {
    topic: "CN",
    difficulty: "medium",
    title: "What is the difference between routing and switching?",
    description: "A strong answer should connect switches to local networks and routers to network-to-network forwarding.",
  },
  {
    topic: "CN",
    difficulty: "medium",
    title: "How do cookies, sessions, and tokens relate to web authentication?",
    description: "Look for client storage, server sessions, stateless tokens, and security implications.",
  },
  {
    topic: "CN",
    difficulty: "hard",
    title: "How would you troubleshoot intermittent network failures in a distributed web application?",
    description: "Expect logs, metrics, DNS checks, retries, load balancers, timeouts, and network path analysis.",
  },
  {
    topic: "CN",
    difficulty: "hard",
    title: "How does TLS protect data in transit, and what problems does it not solve?",
    description: "Look for encryption, authentication, integrity, certificates, and limits such as compromised endpoints.",
  },
  {
  topic: "CN",
  difficulty: "easy",
  title: "What is the difference between IPv4 and IPv6, and why was IPv6 introduced?",
  description: "Expect address size, address exhaustion, notation differences, and practical migration reasons.",
},
{
  topic: "CN",
  difficulty: "easy",
  title: "What is a DNS record, and how are A, AAAA, CNAME, and MX records different?",
  description: "Look for domain-to-IP mapping, aliases, mail routing, and IPv4/IPv6 records.",
},
{
  topic: "CN",
  difficulty: "easy",
  title: "What is a firewall, and how does it help protect a network or server?",
  description: "Expect traffic filtering, ports, rules, allowed/blocked connections, and security boundaries.",
},
{
  topic: "CN",
  difficulty: "easy",
  title: "What is the difference between bandwidth and latency?",
  description: "Look for data capacity versus delay, examples, and why both affect application performance.",
},
{
  topic: "CN",
  difficulty: "medium",
  title: "How would you explain HTTP status codes like 200, 301, 400, 401, 403, 404, and 500?",
  description: "Expect response categories, common meanings, auth differences, redirects, client errors, and server errors.",
},
{
  topic: "CN",
  difficulty: "medium",
  title: "What is the difference between HTTP/1.1, HTTP/2, and HTTP/3 from a performance perspective?",
  description: "Look for connection reuse, multiplexing, head-of-line blocking, QUIC, and latency improvements.",
},
{
  topic: "CN",
  difficulty: "medium",
  title: "How does a load balancer work, and why is it useful in a web application?",
  description: "Expect distributing traffic, health checks, scaling, availability, and routing strategies.",
},
{
  topic: "CN",
  difficulty: "medium",
  title: "What is CORS, and why do browsers enforce it?",
  description: "Look for same-origin policy, cross-origin requests, preflight, allowed origins, and browser security.",
},
{
  topic: "CN",
  difficulty: "medium",
  title: "How would you explain packet fragmentation, and why can it cause performance or reliability issues?",
  description: "Expect MTU, splitting packets, reassembly, dropped fragments, and path MTU discovery.",
},
{
  topic: "CN",
  difficulty: "medium",
  title: "What is NAT, and how does it allow multiple devices to share one public IP address?",
  description: "Look for private/public IPs, port translation, routing responses back, and limitations.",
},
{
  topic: "CN",
  difficulty: "medium",
  title: "How would you debug a website that resolves DNS correctly but still fails to load in the browser?",
  description: "Expect TCP/TLS checks, server availability, ports, firewall, HTTP response, browser console, and logs.",
},
{
  topic: "CN",
  difficulty: "hard",
  title: "How would you design a reliable real-time chat system from a networking perspective?",
  description: "Expect WebSockets, connection management, retries, heartbeats, ordering, presence, and fallback strategies.",
},
{
  topic: "CN",
  difficulty: "hard",
  title: "How would you investigate high tail latency in a distributed API system?",
  description: "Look for p95/p99 latency, load balancers, network hops, retries, congestion, DNS, TLS overhead, and tracing.",
},
{
  topic: "CN",
  difficulty: "hard",
  title: "How do CDNs improve performance, and what problems can CDN caching introduce?",
  description: "Expect edge caching, reduced latency, cache invalidation, stale content, TTLs, and dynamic content tradeoffs.",
},
{
  topic: "CN",
  difficulty: "hard",
  title: "How would you reason about retry policies, timeouts, and circuit breakers in networked services?",
  description: "Look for failure handling, cascading failures, backoff, idempotency, overload protection, and resilience.",
},

];

const allQuestions = [
  ...osQuestions,
  ...dsaQuestions,
  ...oopsQuestions,
  ...dbmsQuestions,
  ...cnQuestions,
];




async function seedQuestions() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const topics = [...new Set(allQuestions.map((question) => question.topic))];

    await Question.deleteMany({ topic: { $in: topics } });
    await Question.insertMany(allQuestions);

    const count = await Question.countDocuments({ topic: { $in: topics } });

    console.log("Questions inserted successfully.");
    console.log({ totalInserted: count });

    topics.forEach((topic) => {
      const topicQuestions = allQuestions.filter((question) => question.topic === topic);

      console.log({
        topic,
        total: topicQuestions.length,
        easy: topicQuestions.filter((question) => question.difficulty === "easy").length,
        medium: topicQuestions.filter((question) => question.difficulty === "medium").length,
        hard: topicQuestions.filter((question) => question.difficulty === "hard").length,
      });
    });

    process.exit(0);
  } catch (error) {
    console.error("Error seeding questions:", error);
    process.exit(1);
  }
}

seedQuestions();




