type DocumentRoot<DocumentNode extends BlogNode> = {
  type: "doc";
  content: DocumentNode[];
};

type TextNode = {
  type: "text";
  text: string;
};

type ParagraphNode<DocumentNode extends BlogNode> = {
  type: "paragraph";
  content: DocumentNode[];
};

type TableNode<DocumentNode extends BlogNode> = {
  type: "table";
  content: TableRowNode<DocumentNode> | TableHeaderNode<DocumentNode>[];
};

type TableRowNode<DocumentNode extends BlogNode> = {
  type: "tableRow";
  content: TableCellNode<DocumentNode>[];
};

type TableHeaderNode<DocumentNode extends BlogNode> = {
  type: "tableHeader";
  content: TableCellNode<DocumentNode>[];
};

type TableCellNode<DocumentNode extends BlogNode>= {
  type: "tableCell";
  content: (TextNode|ParagraphNode<DocumentNode>)[];
};

type BlogContentNode = {};
type BlogContent = {
  json: DocumentRoot<BlogNode>;
};

/*
  ['doc', 'paragraph', 'text', 'heading', 'bulletList', 'listItem', 'dotContent', 'dotImage', 'table', 'tableRow', 'tableHeader', 'tableCell']
*/

type BaseNode = BaseLeafNode | BaseBranchNode | BaseRootNode;
type BaseLeafNode = { type: string; };
type BaseBranchNode = { type: string; content: BaseNode[]; };
type BaseRootNode = { type: "doc"; content: BaseNode[]; };

type ComponentMap<NodeSet extends BaseNode> = {
  [K in NodeSet["type"]]: NodeConstructor<NodeSet, K>
};

type NodeConstructor<NodeSet extends BaseNode, Type extends NodeSet["type"]> = React.JSXElementConstructor<{
  node: Extract<NodeSet, { type: Type }>,
  children?: React.ReactNode
}>;


type BlogLeaf =
  | TextNode;

type BlogBranch =
  | ParagraphNode<BlogNode>
  | TableNode<BlogNode>
  | TableHeaderNode<BlogNode>;

type BlogNode = BlogBranch | BlogLeaf;

type BlogRoot = 
  | DocumentRoot<BlogNode>;

type BlogDocument = BlogRoot | BlogNode;

type BlogMap = ComponentMap<BlogRoot | BlogNode>;



const doc: BlogMap["doc"] = ({ node, children }) => (
  <article><span>{node.type}: </span>?{children}</article>
);

const text: BlogMap["text"] = ({ node }) => `${node.text}`;
const paragraph: BlogMap["paragraph"] = ({ node, children }) => (<p>{children}</p>);
const table: BlogMap["table"] = ({ node, children }) => <table>{children}</table>;
const tableHeader: BlogMap["tableHeader"] = ({ node, children }) => <th>{children}</th>;
const tableRow: BlogMap["tableRow"] = ({ node, children }) => <tr>{children}</tr>;
const tableCell: BlogMap["tableCell"] = ({ node, children }) => <td>{children}</td>;

export const ComponentMap: BlogMap = {
  doc,
  paragraph,
  text,
  table,
  tableHeader,
  tableRow,
  tableCell
};

const construct_children = <NodeSet extends BlogDocument>(components: ComponentMap<NodeSet>, children: NodeSet[], key: string) => (
  children.map((child, i) => construct_node(components, child, `${key}.${i}`))
);

const construct_node = <NodeSet extends BlogDocument>(components: ComponentMap<NodeSet>, node: NodeSet, key: string) => {
  const Component = components[node.type] ?? UnimplementedComponent;
  const children = ("content" in node)
    ? construct_children(components, (node as BlogBranch).content, key)
    : [];

  return <Component node={node} key={key}>{children}</Component>;
};


export const DocumentBuilder = <NodeSet extends BlogDocument>({ node, components }: { node: Extract<NodeSet, { type: "doc" }>, components: ComponentMap<NodeSet> }) => {
  const key = "$";
  console.log(components, node, key);
  return construct_node(components, node, "$");
};

export const UnimplementedComponent = ({ node, children }: { node: any, children: React.ReactNode }) => {
  return (
    <section style={{ border: "2px solid darkred", color: "darkred" }}>
      <p><code>{node.type}</code> is unimplemented. You should get on fixing that.</p>
      <section style={{ border: "1px solid white", color: "white" }}>{children}</section>
    </section>
  );
};
