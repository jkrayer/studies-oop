// Queue Class - Array
export default class Queue {
  constructor(size = -1) {
    this._q = [];
    this._size = size;
  }

  enqueue(item) {
    return this._q.length !== this._size ? this._q.push(item) : item;
  }

  dequeue() {
    return this._q.shift();
  }

  peek() {
    return this._q[0];
  }

  isFull() {
    return this._q.length === this._size;
  }

  isEmpty() {
    return this._q.length === 0;
  }
}

// Queue Factory - Array
export default function queue(size = -1) {
  const q = [];

  return {
    enqueue: item => q.length !== this._size ? q.push(item) : item,
    dequeue: () => q.shift(),
    peek: () => q[0],
    isFull: () => q.length === size,
    isEmpty: () => q.length === 0
  };
}

// Queue Class - Object
export default class Oqueue {
  constructor(size = -1) {
    this._q = Object.create(null);
    this._size = size;
    this._uid = -1;
    this._headId = 0;
    this._tailId = 0;
  }

  enqueue(item) {
    if (this._tailId - this._headId !== this._size) {
      this._q[++this._uid] = item;
      this._tailId = this._uid;
      this._headId = this._q[this._headId] ? this._headId : this._tailId;
      return this._tailId;
    }
    return item;
  }

  dequeue() {
    const head = this._q[this._headId];
    delete this._q[this._headId];

    this._headId += this._headId < this._tailId ? 1 : 0;

    return head;
  }

  peek() {
    return this._q[this._headId];
  }

  isFull() {
    return this._tailId - this._headId === this._size;
  }

  isEmpty() {
    return this._q[this._tailId] === undefined;
  }
}

// Queue Factory - Object
export default function queue(size = -1) {
  const q = Object.create(null);
  let uid = -1;
  let headId = 0;
  let tailId = 0;

  return {
    enqueue: item => {
      if (tailId - headId !== size) {
        q[++uid] = item;
        tailId = uid;
        headId = q[headId] ? headId : tailId

        return tailId;
      }
      return item;
    },
    dequeue: () => {
      const head = q[headId];
      delete q[headId];

      headId += headId < tailId ? 1 : 0;

      return head;
    },
    peek: () => q[headId],
    isFull: () => tailId - headId === size,
    isEmpty: () => tailId - headId === 0
  };
}
