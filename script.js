
// STORAGE
function getData(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// TANGGAL
document.getElementById("today").textContent =
    new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

// NAVIGASI MENU
document.querySelectorAll(".nav-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".nav-btn").forEach(b =>
            b.classList.remove("active")
        );

        document.querySelectorAll(".page").forEach(page =>
            page.classList.remove("active")
        );

        button.classList.add("active");
        document.getElementById(button.dataset.page)
            .classList.add("active");
    });
});

// JOURNAL
let journals = getData("journals");

function showJournals() {
    document.getElementById("journalList").innerHTML =
        journals.map((item, index) => `
            <div class="entry">
                <small>${item.date}</small>
                <p>${escapeHTML(item.text)}</p>
                <button onclick="deleteJournal(${index})">Delete</button>
            </div>
        `).join("");
}

function deleteJournal(index) {
    journals.splice(index, 1);
    saveData("journals", journals);
    showJournals();
}

document.getElementById("saveJournal").onclick = () => {
    const text = document.getElementById("journalText").value.trim();

    if (!text) return alert("Write your story first!");

    journals.unshift({
        text,
        date: new Date().toLocaleDateString("id-ID")
    });

    saveData("journals", journals);
    document.getElementById("journalText").value = "";
    showJournals();
};

showJournals();

// SCHEDULE
let tasks = getData("tasks");

function showTasks() {
    document.getElementById("taskList").innerHTML =
        tasks.map((task, index) => `
            <li>
                <label>
                    <input type="checkbox"
                        style="width:auto"
                        ${task.done ? "checked" : ""}
                        onchange="toggleTask(${index})">
                    <span style="${task.done ? "text-decoration:line-through" : ""}">
                        ${escapeHTML(task.name)}
                    </span>
                </label>
                <button onclick="deleteTask(${index})">Delete</button>
            </li>
        `).join("");
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveData("tasks", tasks);
    showTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveData("tasks", tasks);
    showTasks();
}

document.getElementById("addTask").onclick = () => {
    const input = document.getElementById("taskInput");
    const name = input.value.trim();

    if (!name) return alert("Write an activity first!");

    tasks.push({ name, done: false });
    saveData("tasks", tasks);
    input.value = "";
    showTasks();
};

showTasks();

// MEMORIES
let memories = getData("memories");

function showMemories() {
    document.getElementById("memoryList").innerHTML =
        memories.map((memory, index) => `
            <div class="entry">
                💙 ${escapeHTML(memory)}
                <button onclick="deleteMemory(${index})">Delete</button>
            </div>
        `).join("");
}

function deleteMemory(index) {
    memories.splice(index, 1);
    saveData("memories", memories);
    showMemories();
}

document.getElementById("addMemory").onclick = () => {
    const input = document.getElementById("memoryInput");
    const value = input.value.trim();

    if (!value) return alert("Write a memory first!");

    memories.unshift(value);
    saveData("memories", memories);
    input.value = "";
    showMemories();
};

showMemories();

// WALLET
let transactions = getData("transactions");

function showWallet() {
    let balance = 0;

    transactions.forEach(item => {
        balance += item.type === "in" ? item.amount : -item.amount;
    });

    document.getElementById("balance").textContent =
        "Rp" + balance.toLocaleString("id-ID");

    document.getElementById("moneyList").innerHTML =
        transactions.map((item, index) => `
            <li>
                ${escapeHTML(item.note)}
                <strong style="float:right">
                    ${item.type === "in" ? "+" : "-"}Rp${item.amount.toLocaleString("id-ID")}
                </strong>
                <button onclick="deleteMoney(${index})">Delete</button>
            </li>
        `).join("");
}

function deleteMoney(index) {
    transactions.splice(index, 1);
    saveData("transactions", transactions);
    showWallet();
}

document.getElementById("addMoney").onclick = () => {
    const amount = Number(document.getElementById("amount").value);
    const note = document.getElementById("note").value.trim();
    const type = document.getElementById("type").value;

    if (!Number.isSafeInteger(amount) || amount <= 0 || !note) {
        return alert("Enter a valid amount and description!");
    }

    transactions.unshift({ amount, note, type });

    saveData("transactions", transactions);

    document.getElementById("amount").value = "";
    document.getElementById("note").value = "";

    showWallet();
};

showWallet();

// GOALS
let goals = getData("goals");

function showGoals() {
    document.getElementById("goalList").innerHTML =
        goals.map((goal, index) => `
            <li>
                <label>
                    <input type="checkbox"
                        style="width:auto"
                        ${goal.done ? "checked" : ""}
                        onchange="toggleGoal(${index})">
                    <span style="${goal.done ? "text-decoration:line-through" : ""}">
                        ${escapeHTML(goal.name)}
                    </span>
                </label>
                <button onclick="deleteGoal(${index})">Delete</button>
            </li>
        `).join("");
}

function toggleGoal(index) {
    goals[index].done = !goals[index].done;
    saveData("goals", goals);
    showGoals();
}

function deleteGoal(index) {
    goals.splice(index, 1);
    saveData("goals", goals);
    showGoals();
}

document.getElementById("addGoal").onclick = () => {
    const input = document.getElementById("goalInput");
    const name = input.value.trim();

    if (!name) return alert("Write your dream first!");

    goals.push({ name, done: false });
    saveData("goals", goals);
    input.value = "";
    showGoals();
};

showGoals();

// MENCEGAH INPUT MENJADI HTML
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}
