# Singly Linked List

**Author:** Padmini Khakhalary

## 📌 Introduction

A **Singly Linked List** is a linear data structure consisting of nodes. Each node contains two parts:
- **Data:** Stores the value.
- **Next:** Stores the address of the next node.

The last node points to `NULL`, indicating the end of the list.

## 🎯 Operations

- **Insertion:** Add a new node to the list.
- **Deletion:** Remove a node from the list.
- **Traversal:** Display all elements in the list.
- **Searching:** Find a specific element.
- **Display:** Print all nodes from the beginning to the end.

## 💻 Implementation in C

```c
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node *head = NULL;

void insert(int value) {
    struct Node *newNode =
        (struct Node *)malloc(sizeof(struct Node));

    if (newNode == NULL) {
        printf("Memory allocation failed!\n");
        return;
    }

    newNode->data = value;
    newNode->next = NULL;

    if (head == NULL) {
        head = newNode;
        return;
    }

    struct Node *temp = head;

    while (temp->next != NULL) {
        temp = temp->next;
    }

    temp->next = newNode;
}

void deleteNode(int value) {
    struct Node *temp = head;
    struct Node *prev = NULL;

    while (temp != NULL && temp->data != value) {
        prev = temp;
        temp = temp->next;
    }

    if (temp == NULL) {
        printf("Element not found!\n");
        return;
    }

    if (prev == NULL) {
        head = temp->next;
    } else {
        prev->next = temp->next;
    }

    free(temp);
    printf("%d deleted successfully.\n", value);
}

void display(void) {
    struct Node *temp = head;

    if (temp == NULL) {
        printf("List is empty.\n");
        return;
    }

    printf("Linked List: ");

    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }

    printf("NULL\n");
}

int main(void) {
    insert(10);
    insert(20);
    insert(30);

    display();

    deleteNode(20);
    display();

    return 0;
}
```

## 📤 Sample Output

```text
Linked List: 10 -> 20 -> 30 -> NULL
20 deleted successfully.
Linked List: 10 -> 30 -> NULL
```

## ⏱️ Time Complexity

| Operation | Time Complexity |
|---|---|
| Insertion at the beginning | O(1) |
| Insertion at the end | O(n) |
| Deletion by value | O(n) |
| Traversal / Display | O(n) |
| Searching | O(n) |

## ✅ Advantages

- Dynamic memory allocation.
- Efficient insertion and deletion at the beginning.
- Does not require contiguous memory locations.
- Can grow or shrink during program execution.

## ❌ Disadvantages

- Requires extra memory for pointers.
- Cannot access elements directly by index.
- Traversal is possible only in the forward direction.
 github  :
## 📚 Conclusion

A singly linked list is a fundamental data structure that allows dynamic storage and flexible insertion and deletion of elements. It is widely used in implementing stacks, queues, and other data structures.

---

**Created by Padmini Khakhalary**
