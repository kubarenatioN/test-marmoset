import { PortableTextBlock } from '@portabletext/react';
import { CSSProperties } from 'react';

export function getBlockAlign(
  value: PortableTextBlock
): CSSProperties['textAlign'] | undefined {
  const alignMarks = value.children.findLast((node) =>
    node.marks?.findLast((mark: string) => mark.includes('align--'))
  );
  const lastMark = alignMarks?.marks?.findLast((m: string) =>
    m.includes('align--')
  );

  const alignProp = lastMark && lastMark.split('--')[1];

  return alignProp;
}
