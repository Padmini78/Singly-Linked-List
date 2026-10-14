class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

let head = null;

// Insert a node at the end
function insertNode() {
    const input = document.getElementById("valueInput");
    const value = input.value.trim();

    if (value === "") {
        showMessage("Please enter a value.", "error");
        input.focus();
        return;
    }

    const newNode = new Node(value);

    if (head === null) {
        head = newNode;
    } else {
        let current = head;

        while (current.next !== null) {
            current = current.next;
        }

        current.next = newNode;
    }

    input.value = "";
    displayList();
    showMessage("Node inserted successfully!", "success");
    input.focus();
}

// Delete the first matching node
function deleteNode() {
    const input = document.getElementById("valueInput");
    const value = input.value.trim();

    if (value === "") {
        showMessage("Enter a value to delete.", "error");
        input.focus();
        return;
    }

    if (head === null) {
        showMessage("The linked list is empty.", "error");
        return;
    }

    if (head.data === value) {
        head = head.next;
    } else {
        let current = head;

        while (
            current.next !== null &&
            current.next.data !== value
        ) {
            current = current.next;
        }

        if (current.next === null) {
            showMessage("Value not found in the list.", "error");
            return;
        }

        current.next = current.next.next;
    }

    input.value = "";
    displayList();
    showMessage("Node deleted successfully!", "success");
    input.focus();
}

// Search for a node
function searchNode() {
    const input = document.getElementById("valueInput");
    const value = input.value.trim();

    if (value === "") {
        showMessage("Enter a value to search.", "error");
        input.focus();
        return;
    }

    let current = head;

    while (current !== null) {
        if (current.data === value) {
            showMessage("Value " + value + " found!", "success");
            return;
        }

        current = current.next;
    }

    showMessage("Value " + value + " not found.", "error");
}

// Display the linked list
function displayList() {
    const display = document.getElementById("listDisplay");
    display.replaceChildren();

    if (head === null) {
        display.textContent = "List is empty";
        return;
    }

    let current = head;

    while (current !== null) {
        const nodeBox = document.createElement("span");
        nodeBox.className = "node";
        nodeBox.textContent = current.data;
        display.appendChild(nodeBox);

        const arrow = document.createElement("span");
        arrow.className = "arrow";
        arrow.textContent = " → ";
        display.appendChild(arrow);

        current = current.next;
    }

    const nullBox = document.createElement("span");
    nullBox.className = "arrow";
    nullBox.textContent = "NULL";
    display.appendChild(nullBox);
}

// Display status messages
function showMessage(message, type) {
    const messageBox = document.getElementById("message");
    messageBox.textContent = message;

    messageBox.style.color =
        type === "error" ? "#c62828" : "#176b3a";
}

// Allow Enter to insert a node
document.getElementById("valueInput").addEventListener(
    "keydown",
    function (event) {
        if (event.key === "Enter") {
            insertNode();
        }
    }
);
