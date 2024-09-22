type DocumentRoot<DocumentNode> = {
  type: "doc";
  content: DocumentNode[];
};
type TextNode = {};
type ParagraphNode = {};
type TableNode = {};
type TableRowNode = {};

type BlogContentNode = {};
type BlogContent = {
  json: DocumentRoot<BlogContentNode>;
};

/*

['doc', 'paragraph', 'text', 'heading', 'bulletList', 'listItem', 'dotContent', 'dotImage', 'table', 'tableRow', 'tableHeader', 'tableCell']

*/



export const DocumentBuilder = ({ node, components }) => {
  const child_nodes = node.content;


};
