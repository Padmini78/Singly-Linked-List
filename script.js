class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

let head = null;

function insertNode() {
    let value = document.getElementById("valueInput").value;

    if (value === "") {
        showMessage("Please enter a value.");
        return;
    }

    let newNode = new Node(value);

    if (head === null) {
        head = newNode;
    } else {
        let current = head;

        while (current.next !== null) {
            current = current.next;
        }

        current.next = newNode;
    }

    document.getElementById("valueInput").value = "";
    displayList();
    showMessage("Node inserted successfully.");
}

function deleteNode() {
    let value = document.getElementById("valueInput").value;

    if (value === "") {
        showMessage("Enter the value to delete.");
        return;
    }

    if (head === null) {
        showMessage("Linked list is empty.");
        return;
    }

    if (head.data == value) {
        head = head.next;
        displayList();
        showMessage("Node deleted successfully.");
        return;
    }

    let current = head;

    while (current.next !== null && current.next.data != value) {
        current = current.next;
    }

    if (current.next === null) {
        showMessage("Value not found.");
    } else {
        current.next = current.next.next;
        displayList();
        showMessage("Node deleted successfully.");
    }
}

function searchNode() {
    let value = document.getElementById("valueInput").value;

    if (value === "") {
        showMessage("Enter a value to search.");
        return;
    }

    let current = head;

    while (current !== null) {
        if (current.data == value) {
            showMessage("Value " + value + " found.");
            return;
        }

        current = current.next;
    }

    showMessage("Value " + value + " not found.");
}

function displayList() {
    let display = document.getElementById("listDisplay");

    display.innerHTML = "";

    if (head === null) {
        display.innerHTML = "List is empty";
        return;
    }

    let current = head;

    while (current !== null) {
        let nodeBox = document.createElement("span");
        nodeBox.className = "node";
        nodeBox.textContent = current.data;

        display.appendChild(nodeBox);

        if (current.next !== null) {
            let arrow = document.createElement("span");
            arrow.className = "arrow";
            arrow.textContent = " → ";
            display.appendChild(arrow);
        }

        current = current.next;
    }

    let nullBox = document.createElement("span");
    nullBox.className = "arrow";
    nullBox.textContent = " → NULL";

    display.appendChild(nullBox);
}

function showMessage(message) {
    document.getElementById("message").textContent = message;
}
