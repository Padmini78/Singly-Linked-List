// Each node stores data and a reference to the next node.
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  insertAtBeginning(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    this.length++;
  }

  insertAtEnd(value) {
    const node = new Node(value);

    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }

    this.length++;
  }

  // Positions are 1-based; valid positions range from 1 to length + 1.
  insertAtPosition(value, position) {
    if (
      !Number.isInteger(position) ||
      position < 1 ||
      position > this.length + 1
    ) {
      return false;
    }

    if (position === 1) {
      this.insertAtBeginning(value);
      return true;
    }

    let previous = this.head;
    for (let i = 1; i < position - 1; i++) {
      previous = previous.next;
    }

    const node = new Node(value);
    node.next = previous.next;
    previous.next = node;
    this.length++;
    return true;
  }

  // Removes only the first occurrence of the value.
  delete(value) {
    if (this.head === null) {
      return false;
    }

    if (this.head.data === value) {
      this.head = this.head.next;
      this.length--;
      return true;
    }

    let current = this.head;
    while (current.next !== null && current.next.data !== value) {
      current = current.next;
    }

    if (current.next === null) {
      return false;
    }

    current.next = current.next.next;
    this.length--;
    return true;
  }

  // Returns the 1-based position, or -1 if the value is absent.
  search(value) {
    let current = this.head;
    let position = 1;

    while (current !== null) {
      if (current.data === value) {
        return position;
      }
      current = current.next;
      position++;
    }

    return -1;
  }

  clear() {
    this.head = null;
    this.length = 0;
  }
}

const list = new SinglyLinkedList();
const visual = document.getElementById("visual");
const statusMessage = document.getElementById("status");
const lengthLabel = document.getElementById("lengthLabel");
let highlightedValue = null;

function showStatus(message, type = "") {
  statusMessage.textContent = message;
  statusMessage.className = type;
}

function readInteger(id) {
  const raw = document.getElementById(id).value.trim();

  if (raw === "") {
    return null;
  }

  const value = Number(raw);
  return Number.isSafeInteger(value) ? value : null;
}

function makeArrow() {
  const arrow = document.createElement("span");
  arrow.className = "arrow";
  arrow.textContent = "→";
  return arrow;
}

// Rebuilds the visual display by traversing the actual linked list.
function render() {
  visual.replaceChildren();
  lengthLabel.textContent = `Length: ${list.length}`;

  if (list.head === null) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "The list is empty. Insert a node to begin.";
    visual.appendChild(empty);
    return;
  }

  const headLabel = document.createElement("strong");
  headLabel.textContent = "HEAD";
  visual.append(headLabel, makeArrow());

  let current = list.head;

  while (current !== null) {
    const wrap = document.createElement("div");
    wrap.className = "node-wrap";

    const nodeElement = document.createElement("div");
    const isHighlighted =
      highlightedValue !== null && current.data === highlightedValue;

    nodeElement.className = isHighlighted ? "node found" : "node";

    const valueElement = document.createElement("span");
    valueElement.className = "value";
    valueElement.textContent = current.data;

    const nextElement = document.createElement("span");
    nextElement.className = "next";
    nextElement.textContent =
      current.next === null ? "next: NULL" : "next: →";

    nodeElement.append(valueElement, nextElement);
    wrap.appendChild(nodeElement);
    visual.appendChild(wrap);

    if (current.next !== null) {
      visual.appendChild(makeArrow());
    }

    current = current.next;
  }

  const nullElement = document.createElement("span");
  nullElement.className = "null";
  nullElement.textContent = "NULL";
  visual.appendChild(nullElement);
}

document.getElementById("insertPosition").addEventListener("change", (event) => {
  document.getElementById("positionBox").hidden =
    event.target.value !== "position";
});

document.getElementById("insertBtn").addEventListener("click", () => {
  const value = readInteger("insertValue");

  if (value === null) {
    showStatus("Enter a valid whole-number value to insert.", "error");
    return;
  }

  const mode = document.getElementById("insertPosition").value;
  highlightedValue = null;

  if (mode === "beginning") {
    list.insertAtBeginning(value);
    showStatus(`Inserted ${value} at the beginning.`, "success");
  } else if (mode === "end") {
    list.insertAtEnd(value);
    showStatus(`Inserted ${value} at the end.`, "success");
  } else {
    const position = readInteger("positionValue");

    if (position === null || !list.insertAtPosition(value, position)) {
      showStatus(
        `Invalid position. Choose a position from 1 to ${list.length + 1}.`,
        "error"
      );
      return;
    }

    showStatus(`Inserted ${value} at position ${position}.`, "success");
  }

  render();
});

document.getElementById("deleteBtn").addEventListener("click", () => {
  const value = readInteger("deleteValue");

  if (value === null) {
    showStatus("Enter a valid whole-number value to delete.", "error");
    return;
  }

  highlightedValue = null;

  if (list.delete(value)) {
    showStatus(`Deleted the first occurrence of ${value}.`, "success");
  } else {
    showStatus(`${value} was not found; the list is unchanged.`, "error");
  }

  render();
});

document.getElementById("searchBtn").addEventListener("click", () => {
  const value = readInteger("searchValue");

  if (value === null) {
    showStatus("Enter a valid whole-number value to search.", "error");
    return;
  }

  const position = list.search(value);
  highlightedValue = position === -1 ? null : value;

  if (position === -1) {
    showStatus(`${value} was not found in the list.`, "error");
  } else {
    showStatus(
      `Found ${value} at position ${position}. Matching node(s) are highlighted.`,
      "success"
    );
  }

  render();
});

document.getElementById("displayBtn").addEventListener("click", () => {
  highlightedValue = null;
  render();

  showStatus(
    list.length
      ? `Displayed the current list with ${list.length} node(s).`
      : "The list is empty."
  );
});

document.getElementById("clearBtn").addEventListener("click", () => {
  list.clear();
  highlightedValue = null;
  render();
  showStatus("List cleared successfully.", "success");
});

// Show the initial empty list when the page loads.
render();
