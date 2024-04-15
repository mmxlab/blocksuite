// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import '@blocksuite/presets/themes/affine.css';
import '../dev-format.js';
import { DocCollection, type Y, Schema } from '@blocksuite/store';

import {
  createDefaultDocCollection,
  initDefaultDocCollection,
} from './utils/collection.js';
import { mountDefaultDocEditor } from './utils/editor.js';
import { yDocA } from '../../examples/inline/test-page.js';

async function main() {
  if (window.collection) return;

  const collection = await createDefaultDocCollection();
  await initDefaultDocCollection(collection);
  const editor = await mountDefaultDocEditor(collection);

  // console.log(editor.doc.getBlockByFlavour('affine:note')[0], yDocA);
  const doc = editor?.doc!;
  const model = doc.getBlockByFlavour('affine:paragraph')[0];

  console.log(model, model.text, model.text?.yText);

  // const yBlock = doc.yBlocks.get(model.id);
  // console.log('yBlock', model, yBlock, yDocA);

  setTimeout(() => {
    model.text?.yText.delete(0, model.text?.yText.length);

    model.text?.yText.applyDelta([
      {
        insert: 'qwe',
      },
      {
        insert: 'a',
        attributes: {
          bold: true,
        },
      },
      {
        insert: '123123',
      },
      {
        insert: 'a',
        attributes: {
          italic: true,
        },
      },
      {
        insert: 'cesad',
      },
      {
        insert: 'xxxx',
        attributes: {
          underline: true,
        },
      },
    ]);
  }, 1000);
  // yDocA.on('update', update => {
  //   console.log(update);
  //   DocCollection.Y.applyUpdate(model.text?.yText, update);
  // });
}

main().catch(console.error);
