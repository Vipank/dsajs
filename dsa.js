(function (global) {
  global.$ = function () {
    return new constructor();
  };

  // dsaProptotype = {function(){}}
  function constructor() {
    this.simpleStack = function () {
      return new initStack();
    };
    this.simpleQueue = function () {
      return new initQueue();
    };
    this.bst = function (root, f) {
      return new binaryTree(root, f);
    };
  }

  //this functio initializes an empty stack
  var initStack = function () {
    this.stack = [];
  };

  initStack.prototype.push = function (val) {
    this.stack.push(val);
    return this;
  };
  initStack.prototype.pop = function () {
    if (this.isEmpty()) {
      throw "Nothing to pop. Stack size is 0";
    }
    return this.stack.pop();
  };
  initStack.prototype.isEmpty = function () {
    return this.stack.length === 0;
  };

  // This function initializes an empty queue
  var initQueue = function () {
    this.queue = [];
  };
  initQueue.prototype.enqueue = function (val) {
    this.queue.push(val);
  };
  initQueue.prototype.dequeue = function () {
    if (this.isEmpty()) {
      throw "Nothing to dequeue. Queue size is 0";
    }
    return this.queue.shift();
  };
  initQueue.prototype.isEmpty = function () {
    return this.queue.length === 0;
  };
  initQueue.prototype.isNotEmpty = function () {
    return this.queue.length !== 0;
  };

  var Node = function (value) {
    this.value = value;
    this.left = null;
    this.right = null;
  };

  //This function initializes a binary tree
  var binaryTree = function (fn) {
    //fn should take 2 argument and return either 0 or 1
    this.root = null;
    if (fn) {
      this.compareFunc = fn;
    } else {
      this.compareFunc = function (a, b) {
        return a >= b ? 0 : 1;
      };
    }
  };

  binaryTree.prototype.insert = function (val) {
    var self = this;
    function insert(root, value) {
      if (!self.root) {
        self.root = new Node(value);
        return;
      }
      if (!root) {
        root = new Node(value);
        return root;
      }
      if (self.compareFunc(root.value, value) === 0) {
        root.left = insert(root.left, value);
      } else {
        root.right = insert(root.right, value);
      }
      return root;
    }
    insert(self.root, val);
    return this;
  };

  binaryTree.prototype.inorder = function () {
    var self = this;
    var treeInorder = []
    return (function inorder(root) {
      if (root) {
        inorder(root.left);
        treeInorder.push(root);
        inorder(root.right);
      }
      return treeInorder;
    })(self.root);
  };

  binaryTree.prototype.preorder = function () {
    var self = this;
    var treePreorder = []
    return (function preorder(root) {
      if (root) {
        treePreorder.push(root);
        preorder(root.left);
        preorder(root.right);
      }
      return treePreorder;
    })(self.root);
  };

  binaryTree.prototype.postorder = function () {
    var self = this;
    var treePostorder = []
    return (function postorder(root) {
      if (root) {
        postorder(root.left);
        postorder(root.right);
        treePostorder.push(root);
      }
      return treePostorder;
    })(self.root);
  };

  binaryTree.prototype.levelOrder = function () {
    var self = this;
    function lo(root) {
      let queue = $().simpleQueue();
      let levelOrder = [];
      if (root) queue.enqueue(root);
      else return;
      while (queue.isNotEmpty()) {
        const node = queue.dequeue();
        levelOrder.push(node.value);
        if (node.left) {
          queue.enqueue(node.left);
        }
        if (node.right) {
          queue.enqueue(node.right);
        }
      }
      return levelOrder;
    }
    return lo(self.root);
  };



})(window);

var b = $().bst(function (a,b){
  return a.val >= b.val ? 0 : 1;
});
b.insert({ val: 10 }).insert({ val: 5 }).insert({ val: 20 }).insert({ val: 2 });
// b.insert(5);
// b.insert(20);
// b.insert(2);
console.log(b.preorder());
console.log(b.inorder());
console.log(b.postorder());

// console.log(b.levelOrder());
