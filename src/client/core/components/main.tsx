
type GenericNode = {
  type: string;
  
  content?: GenericNode[];
}
type BlogMap = ComponentMap<Record<string, GenericNode>>;



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
