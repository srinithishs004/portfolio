import React, { useState } from 'react';

interface DSAWriteup {
  title: string;
  problem: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  code: string;
  language: string;
}

const writeups: DSAWriteup[] = [
  {
    title: 'LRU Cache Design',
    problem: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) access and update time complexities.',
    approach: 'Combine a Doubly Linked List (DLL) and a Hash Map. The Hash Map provides O(1) node lookups, while the DLL allows O(1) removal and insertion of nodes at the head (representing recently used items) and eviction from the tail (representing least recently used items).',
    timeComplexity: 'O(1) for both get and put operations.',
    spaceComplexity: 'O(C) where C is the maximum capacity of the cache.',
    language: 'python',
    code: `class Node:
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}  # key -> Node
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node: Node):
        p, n = node.prev, node.next
        p.next, n.prev = n, p

    def _insert(self, node: Node):
        # Insert at head (most recently used)
        n = self.head.next
        self.head.next = node
        node.prev = self.head
        node.next = n
        n.prev = node

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._insert(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self._insert(node)
        self.cache[key] = node
        if len(self.cache) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]`
  },
  {
    title: 'Merge K Sorted Lists',
    problem: 'Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.',
    approach: 'Use a Min-Heap (Priority Queue) to store the head nodes of each linked list. Repeatedly extract the minimum node, append it to the merged list, and push the next node from that same list back into the heap until the heap is empty.',
    timeComplexity: 'O(N log k) where N is the total number of nodes, and k is the number of linked lists.',
    spaceComplexity: 'O(k) auxiliary space for the heap storing at most one node from each of the k lists.',
    language: 'python',
    code: `import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        heap = []
        # Push initial heads of all lists
        for i, lst in enumerate(lists):
            if lst:
                # Include index 'i' to handle duplicate values in node comparison
                heapq.heappush(heap, (lst.val, i, lst))
        
        dummy = ListNode(0)
        curr = dummy
        
        while heap:
            val, i, node = heapq.heappop(heap)
            curr.next = node
            curr = curr.next
            if node.next:
                heapq.heappush(heap, (node.next.val, i, node.next))
                
        return dummy.next`
  },
  {
    title: 'Course Schedule II',
    problem: 'Given a total of numCourses courses labeled from 0 to numCourses-1 and a list of prerequisite pairs, return the ordering of courses you should take to finish all courses.',
    approach: "Apply Kahn's Algorithm for Topological Sort using Breadth-First Search (BFS). Calculate the in-degree of all course nodes. Place nodes with in-degree 0 in a queue. Process nodes from the queue, decrementing the in-degree of their neighbors. If a neighbor's in-degree drops to 0, push it to the queue.",
    timeComplexity: 'O(V + E) where V is the number of courses (vertices) and E is the number of prerequisites (edges).',
    spaceComplexity: 'O(V + E) to store the adjacency list representation of the course graph.',
    language: 'python',
    code: `from collections import deque

class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        adj = {i: [] for i in range(numCourses)}
        indegree = [0] * numCourses
        
        for course, prereq in prerequisites:
            adj[prereq].append(course)
            indegree[course] += 1
            
        queue = deque([i for i in range(numCourses) if indegree[i] == 0])
        order = []
        
        while queue:
            node = queue.popleft()
            order.append(node)
            for neighbor in adj[node]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    queue.append(neighbor)
                    
        return order if len(order) == numCourses else []`
  }
];

export default function ProblemSolving() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="problemsolving" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: '#0a0a0a' }}>
      <div style={{ padding: '8rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div data-reveal="up" style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '4rem' }}>
          <span className="num-accent">07</span>
          <h2 className="section-title">Problem Solving / DSA</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          
          {/* Left Side: Selectors & Summaries */}
          <div data-reveal="left" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3a3a3a' }}>
              Algorithms & Data Structures
            </span>

            {/* Tab Selector Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {writeups.map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  style={{
                    background: activeTab === idx ? 'rgba(255,255,255,0.02)' : 'transparent',
                    border: activeTab === idx ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.03)',
                    color: activeTab === idx ? '#f0f0f0' : '#6b6b6b',
                    padding: '1.2rem',
                    borderRadius: '4px',
                    textAlign: 'left',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.75rem',
                    fontWeight: activeTab === idx ? 700 : 500,
                    letterSpacing: '0.05em',
                    cursor: 'none',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={e => {
                    if (activeTab !== idx) {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = '#a0a0a0';
                    }
                  }}
                  onMouseLeave={e => {
                    if (activeTab !== idx) {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.color = '#6b6b6b';
                    }
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}. {w.title}
                </button>
              ))}
            </div>

            {/* Technical analysis card */}
            <div style={{ borderLeft: '2px solid rgba(255,255,255,0.06)', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
              <div>
                <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b6b', marginBottom: '0.4rem' }}>
                  Time Complexity
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: '#f0f0f0', fontWeight: 600 }}>
                  {writeups[activeTab].timeComplexity}
                </span>
              </div>
              <div>
                <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b6b', marginBottom: '0.4rem' }}>
                  Space Complexity
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: '#f0f0f0', fontWeight: 600 }}>
                  {writeups[activeTab].spaceComplexity}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Tab Details + Code Block */}
          <div data-reveal="right" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Problem & Approach */}
            <div>
              <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3a3a3a', marginBottom: '0.8rem' }}>
                Problem Definition
              </span>
              <p style={{ color: '#8a8a8a', fontSize: '0.88rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                {writeups[activeTab].problem}
              </p>

              <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3a3a3a', marginBottom: '0.8rem' }}>
                Approach
              </span>
              <p style={{ color: '#6b6b6b', fontSize: '0.85rem', lineHeight: 1.8, margin: 0 }}>
                {writeups[activeTab].approach}
              </p>
            </div>

            {/* Implementation Code */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3a3a3a' }}>
                  Clean Implementation
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b6b', marginLeft: 'auto', background: 'rgba(255,255,255,0.03)', padding: '0.2rem 0.6rem', borderRadius: '2px' }}>
                  {writeups[activeTab].language}
                </span>
              </div>
              <pre style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                lineHeight: 1.5,
                background: '#070707',
                border: '1px solid rgba(255,255,255,0.04)',
                padding: '1.5rem',
                borderRadius: '4px',
                color: '#9a9a9a',
                overflowX: 'auto',
                whiteSpace: 'pre',
                margin: 0,
              }}>{writeups[activeTab].code}</pre>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
