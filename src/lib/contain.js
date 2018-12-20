function contains(root, n) {
    var node = JSON.parse(JSON.stringify(n));
    while (node) {
        if (node === root) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}
export default contains