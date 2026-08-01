const ALERT_MARKER =
  /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s*\n+|\s*$)/;

function tryTransformAlert(blockquote) {
  const firstParagraph = blockquote.children[0];
  if (!firstParagraph || firstParagraph.type !== "paragraph") return;

  const firstText = firstParagraph.children[0];
  if (!firstText || firstText.type !== "text") return;

  const match = firstText.value.match(ALERT_MARKER);
  if (!match) return;

  const type = match[1];
  const label = type.charAt(0) + type.slice(1).toLowerCase();

  firstText.value = firstText.value.slice(match[0].length);
  if (firstText.value === "") {
    firstParagraph.children.shift();
    if (firstParagraph.children.length === 0) {
      blockquote.children.shift();
    }
  }

  blockquote.data = {
    ...blockquote.data,
    hName: "div",
    hProperties: {
      ...(blockquote.data && blockquote.data.hProperties),
      className: ["alert", `alert-${type.toLowerCase()}`],
    },
  };

  blockquote.children.unshift({
    type: "paragraph",
    data: {
      hName: "p",
      hProperties: { className: ["alert-title"] },
    },
    children: [{ type: "text", value: label }],
  });
}

function walk(node) {
  if (node.type === "blockquote") tryTransformAlert(node);
  if (Array.isArray(node.children)) node.children.forEach(walk);
}

export default function remarkAlerts() {
  return (tree) => {
    walk(tree);
  };
}
