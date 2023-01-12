import { decode, encode, Encoding } from '../../../utils/encoder';
import { Tag } from '../constants';
import { ArgumentError } from '../../../utils/errors';
import type { unpackTx as unpackTxType, buildTx as buildTxType } from '../index';

export default function genEntryField<T extends Tag = Tag>(tag?: T): {
  serialize: (
    // TODO: replace with `Parameters<typeof buildTxType<T>>[0]`,
    //  but fix TS2502 value is referenced directly or indirectly in its own type annotation
    value: any,
    options: { buildTx: typeof buildTxType },
  ) => Buffer;
  deserialize: (
    value: Buffer, options: { unpackTx: typeof unpackTxType },
    // TODO: replace with `ReturnType<typeof unpackTxType<T>>`,
    //  TS2577 Return type annotation circularly references itself
  ) => any;
} {
  return {
    serialize(txParams, { buildTx }) {
      if (ArrayBuffer.isView(txParams)) return Buffer.from(txParams as any);
      return decode(buildTx({ ...txParams, ...tag != null && { tag } }));
    },

    deserialize(buf, { unpackTx }) {
      const tx = unpackTx(encode(buf, Encoding.Transaction));
      if (tag != null && tx.tag !== tag) throw new ArgumentError('Tag', tag, tx.tag);
      return tx;
    },
  };
}
