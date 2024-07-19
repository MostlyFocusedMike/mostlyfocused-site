class Node {
  constructor(data) {
      this.data = data;
      this.next = null;
  }
}

class LinkedList {
  constructor(data) {
    this.head = isNaN(data) ? null : new Node(data);
    this.size = 0;
  }

  append(data) {
    const newNode = new Node(data);
    this.size++;
    if (!this.head) {
      this.head = newNode;
      return this.head;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
    return current.next;
  }

  print() {
    let current = this.head;
    let result = [];
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    console.log(result.join('-> '));
  }

  reverse() {
    let current = this.head;
    let previous = null;
    let next = null;

    while (current) {
      next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }

    this.head = previous;
    return previous;
  }

  reverse() {
    let current = this.head;
    let previous = null;
    let next = null;

    while (current) {
      next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }

    this.head = previous;
    return previous;
  }
}

const myList = new LinkedList(1);
myList.append(2)
myList.append(3)
myList.append(4)
myList.print();

myList.reverse();
myList.print();
