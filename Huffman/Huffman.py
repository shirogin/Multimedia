class Node:
    def __init__(self, car, number, left=None, right=None):
        self.car = car
        self.num = number
        self.left = left
        self.right = right
        self.code = ''

    def Right(self, right=None):
        if(right is not None):
            self.right = right
        return self.right

    def Left(self, left=None):
        if(left is not None):
            self.left = left
        return self.left

    def isLeaf(self):
        return self.left is None and self.right is None

    def __lt__(self, other):
        return self.num < other.num


def occurrences(text):
    l = [text[i] for i in range(len(text))]
    s = list(set(l))
    s.sort()
    e = [Node(i, text.count(i)) for i in s]
    return e


def printNodes(node, val=''):
    # huffman code for current node
    newVal = val + str(node.code)

    # if node is not an edge node
    # then traverse inside it
    if(node.left):
        printNodes(node.left, newVal)
    if(node.right):
        printNodes(node.right, newVal)

        # if node is edge node then
        # display its huffman code
    if(not node.left and not node.right):
        print(f"{node.car} -> {newVal}")


def TreeHuffman(text):
    nodes = occurrences(text)
    i = 0
    while len(nodes) > 1:
        nodes = sorted(nodes, key=lambda x: x.num)
        left = nodes.pop(0)
        left.code = str(0)
        right = nodes.pop(0)
        right.code = str(1)
        newNode = Node(left.car + right.car, left.num + right.num)
        newNode.left = left
        newNode.right = right
        nodes.append(newNode)
    printNodes(nodes[0])
    return nodes
