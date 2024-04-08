import type { DocCollection } from "@blocksuite/store";

export function createDefaultDoc(
  collection: DocCollection,
  options: { id?: string; title?: string } = {}
) {
  const doc = collection.createDoc({ id: options.id });

  doc.load();
  const title = options.title ?? "新增文本";
  const rootId = doc.addBlock("affine:page", {
    title: new doc.Text(title),
  });
  collection.setDocMeta(doc.id, {
    title,
  });
  doc.addBlock("affine:surface", {}, rootId);
  const noteId = doc.addBlock("affine:note", {}, rootId);
  doc.addBlock(
    "affine:paragraph",
    {
      type: "quote",
      text: new doc.Text(`文章内容摘要`),
    },
    noteId
  );
  doc.addBlock(
    "affine:paragraph",
    {
      type: "text",
      text: new doc.Text(`我的备注信息`),
    },
    noteId
  );
  // To make sure the content of new doc would not be clear
  // By undo operation for the first time
  doc.resetHistory();

  return doc;
}
