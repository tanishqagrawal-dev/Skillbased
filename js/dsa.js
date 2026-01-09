// DSA Practice Logic

const dsaProblems = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        companies: ["Google", "Amazon", "Meta"],
        description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
        starterCode: "function twoSum(nums, target) {\n    // Write your code here\n    \n}",
        hints: [
            "Try using a hash map to store complements.",
            "Key: nums[i], Value: i. Check if target - nums[i] exists in map."
        ]
    },
    {
        id: 2,
        title: "Reverse Linked List",
        difficulty: "Medium",
        companies: ["Microsoft", "Netflix"],
        description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
        starterCode: "function reverseList(head) {\n    let prev = null;\n    let curr = head;\n    // Continue...\n}",
        hints: [
            "Iterate through the list and change next pointers to point to prev.",
            "Be careful not to lose the reference to the rest of the list."
        ]
    },
    {
        id: 3,
        title: "Merge Intervals",
        difficulty: "Medium",
        companies: ["Uber", "Salesforce"],
        description: "Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals.",
        starterCode: "function merge(intervals) {\n    // Sort first\n    \n}",
        hints: [
            "Sort intervals by start time first.",
            "Iterate and keep track of the current merged interval."
        ]
    },
    {
        id: 4,
        title: "Trapping Rain Water",
        difficulty: "Hard",
        companies: ["Google", "Twitter"],
        description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        starterCode: "function trap(height) {\n    \n}",
        hints: [
            "Try using two pointers from left and right.",
            "Keep track of max left and max right height."
        ]
    }
];

let currentProblemId = null;
let currentHintIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    renderProblemList();
});

function renderProblemList() {
    const list = document.getElementById('dsa-problems-list');
    if (!list) return;

    list.innerHTML = dsaProblems.map(p => `
        <div class="prob-item" onclick="loadProblem(${p.id})">
            <div class="prob-info">
                <span class="prob-title">${p.title}</span>
                <span class="badge ${p.difficulty.toLowerCase()}">${p.difficulty}</span>
            </div>
            <div class="prob-meta">${p.companies.join(', ')}</div>
        </div>
    `).join('');
}

function loadProblem(id) {
    const prob = dsaProblems.find(p => p.id === id);
    if (!prob) return;

    currentProblemId = id;
    currentHintIndex = 0;

    // UI Update
    document.getElementById('dsa-welcome').classList.add('hidden');
    document.getElementById('dsa-editor-view').classList.remove('hidden');

    document.getElementById('prob-title').innerText = prob.title;
    document.getElementById('prob-difficulty').innerText = prob.difficulty;
    document.getElementById('prob-difficulty').className = `badge ${prob.difficulty.toLowerCase()}`;
    document.getElementById('prob-desc').innerText = prob.description;
    document.getElementById('prob-companies').innerHTML = `<i data-lucide="briefcase"></i> Asked at: ${prob.companies.join(', ')}`;
    document.getElementById('code-area').value = prob.starterCode;

    // Reset output
    document.getElementById('run-status').innerHTML = 'Click "Run Code" to verify solution.';
    document.getElementById('ai-hints-container').innerHTML = '<p class="hint-placeholder">Need help? Click "Neuron AI Hint" above.</p>';

    lucide.createIcons();
}

function runCode() {
    const statusDiv = document.getElementById('run-status');
    statusDiv.innerHTML = '<span class="loading-spinner"></span> Compiling...';

    setTimeout(() => {
        // Random success/failure for demo
        const success = Math.random() > 0.3;

        if (success) {
            statusDiv.innerHTML = `
                <div class="result-success">
                    <h4><i data-lucide="check-circle"></i> Passed</h4>
                    <p>Runtime: 54ms (Beats 87%)</p>
                    <p>Memory: 42MB (Beats 65%)</p>
                    <div class="test-cases">
                        <div class="case passed">Case 1: [2,7,11,15], 9 -> [0,1] ✓</div>
                        <div class="case passed">Case 2: [3,2,4], 6 -> [1,2] ✓</div>
                    </div>
                </div>
            `;
        } else {
            statusDiv.innerHTML = `
                <div class="result-fail">
                    <h4><i data-lucide="x-circle"></i> Failed</h4>
                    <p>Logic Error on Test Case 3</p>
                    <div class="test-cases">
                        <div class="case passed">Case 1: Passed ✓</div>
                        <div class="case passed">Case 2: Passed ✓</div>
                        <div class="case failed">Case 3: Expected [0,1], Got [1,1] ✗</div>
                    </div>
                </div>
            `;
        }
        lucide.createIcons();
        switchOutputTab('testcase');
    }, 1500);
}

function getHint() {
    const prob = dsaProblems.find(p => p.id === currentProblemId);
    if (!prob || currentHintIndex >= prob.hints.length) return;

    const container = document.getElementById('ai-hints-container');

    // Clear placeholder if first hint
    if (currentHintIndex === 0) container.innerHTML = '';

    const hintDiv = document.createElement('div');
    hintDiv.className = 'ai-hint-box fade-in';
    hintDiv.innerHTML = `
        <strong>💡 Neura Hint ${currentHintIndex + 1}:</strong>
        <p>${prob.hints[currentHintIndex]}</p>
    `;

    container.appendChild(hintDiv);
    currentHintIndex++;

    switchOutputTab('neuron');
}

function switchOutputTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));

    if (tab === 'testcase') {
        document.querySelectorAll('.tab')[0].classList.add('active');
        document.getElementById('tab-testcase').classList.remove('hidden');
    } else {
        document.querySelectorAll('.tab')[1].classList.add('active');
        document.getElementById('tab-neuron').classList.remove('hidden');
    }
}
