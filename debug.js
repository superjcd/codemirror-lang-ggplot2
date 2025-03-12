// 导入必要的模块
import { parser } from './dist/index.js';
import { TreeCursor } from '@lezer/common';

// 示例代码
const sourceCode = `
ggplot(mtcars) 
  + geom_point(aes(x=hwy, y=displ))
  + facet(class ~,ncol=2)
`;

// 解析代码
const tree = parser.parse(sourceCode);

// 打印解析后的语法树
console.log('Parsed Tree:', tree.toString());

// 遍历 AST 并打印每个节点
function traverseTree(cursor) {
  console.log(`Node: ${cursor.node.type.name}, From: ${cursor.from}, To: ${cursor.to}`);
  if (cursor.firstChild()) {
    do {
      traverseTree(cursor);
    } while (cursor.nextSibling());
    cursor.parent();
  }
}

console.log('\nTraversing AST:');
traverseTree(tree.cursor());

// 将 AST 转换为 JavaScript 对象
function treeToJSObject(cursor) {
  const node = cursor.node;
  const result = {
    type: node.type.name,
    from: node.from,
    to: node.to,
    children: []
  };

  if (cursor.firstChild()) {
    do {
      result.children.push(treeToJSObject(cursor));
    } while (cursor.nextSibling());
    cursor.parent();
  }

  return result;
}

const astObject = treeToJSObject(tree.cursor());
console.log('\nAST as JavaScript Object:', JSON.stringify(astObject, null, 2));