import "@blocksuite/presets/themes/affine.css";

import {
  createDefaultDocCollection,
  initDefaultDocCollection,
} from "./utils/collection.js";
import { mountDefaultDocEditor } from "./utils/editor.js";
import { DocSource } from "@blocksuite/sync";

export async function initEditor(config: {
  mainDB: DocSource;
  el: HTMLElement;
}) {
  if (window.collection) return;

  const collection = await createDefaultDocCollection(config.mainDB);
  await initDefaultDocCollection(collection);
  return await mountDefaultDocEditor(collection, config.el);
}
