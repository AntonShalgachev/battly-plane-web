function logHierarchyRecursive(node: cc.Node, level: number) {
	let indent = '  '.repeat(level);
	console.log(`"${indent}${node.name} (${node.width}x${node.height}) at (${node.x},${node.y})"`);

	for (var i = 0; i < node.childrenCount; i++)
		logHierarchyRecursive(node.children[i], level + 1);
}

export function logHierarchy(root: cc.Node = null) {
	if (!root)
		root = cc.director.getScene();

	logHierarchyRecursive(root, 0);
}
