import * as Y from 'yjs';
import type { BlockProps, PrefixedBlockProps, YBlock } from '../store';

const SYS_KEYS = new Set(['id', 'flavour', 'children']);

// https://stackoverflow.com/questions/31538010/test-if-a-variable-is-a-primitive-rather-than-an-object
function isPrimitive(
  a: unknown
): a is null | undefined | boolean | number | string {
  return a !== Object(a);
}

export function initSysProps(yBlock: YBlock, props: Partial<BlockProps>) {
  yBlock.set('sys:id', props.id);
  yBlock.set('sys:flavour', props.flavour);
  yBlock.set('sys:children', new Y.Array());
}

export function syncBlockProps(
  yBlock: YBlock,
  props: Partial<BlockProps>,
  ignoredKeys: Set<string>
) {
  Object.keys(props).forEach(key => {
    if (SYS_KEYS.has(key) || ignoredKeys.has(key)) return;

    // workaround yText init
    // TODO use schema
    if (key === 'text') return;

    if (!isPrimitive(props[key])) {
      throw new Error('Only top level primitives are supported for now');
    }

    // TODO compare with current yBlock value
    if (props[key] !== undefined) {
      yBlock.set('prop:' + key, props[key]);
    }
  });
}

export function toBlockProps(
  prefixedProps: PrefixedBlockProps
): Partial<BlockProps> {
  const props: Partial<BlockProps> = {};
  Object.keys(prefixedProps).forEach(key => {
    if (prefixedProps[key]) {
      props[key.replace('sys:', '')] = prefixedProps[key];
    }
  });

  Object.keys(prefixedProps).forEach(prefixedKey => {
    if (SYS_KEYS.has(prefixedKey)) return;

    const key = prefixedKey.replace('prop:', '');
    props[key] = prefixedProps[prefixedKey];
  });

  return props;
}
