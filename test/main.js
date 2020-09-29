class Node {
    constructor(val) {
        this.left = null;
        this.right = null;
        this.val = val;
    }
}

Node.prototype.addNode = function(n) {
    if (n.val < this.val) {
        if (this.left == null) {
            this.left = n;
        } else {
            this.left.addNode(n);
        }
    } else if (n.val > this.val) {
        if (this.right == null) {
            this.right = n;
        } else {
            this.right.addNode(n)
        }
    }
}

Node.prototype.visit = function() {
    if (this.left != null) {
        this.left.visit();
    }
    console.log(this.val);
    if (this.right != null) {
        this.right.visit();
    }  
}

class BST {
    constructor() {
        this.root = null;
    }
}

BST.prototype.addVal = function(val) {
    let n = new Node(val);
    if (this.root == null) {
        this.root = n;
    } else {
        this.root.addNode(n);
    }
}

BST.prototype.traverse = function() {
    this.root.visit();
}



let tree = new BST();

for (let i = 0; i < 10; i++) {
    tree.addVal(Math.floor(Math.random() * 100));
}
tree.traverse();

const isBalanced = root => {
    if (!root) return true;

    return isBalanced(root.left)
}
let stack = [tree];
//stack.pop();


const res = isBalanced(tree);
console.log(tree);
console.log(stack.length);
console.log(res);


