import { PortableTextTypeComponentProps } from '@portabletext/react';
import { TypedObject } from '@portabletext/types';
import { FC } from 'react';

interface ColumnsBlockProps {
  columns: TypedObject[];
}

export const ColumnsBlock: FC<
  PortableTextTypeComponentProps<ColumnsBlockProps>
> = ({ value, renderNode }) => {
  const nodes = value.columns.map((col, i) =>
    renderNode({
      index: i,
      isInline: true,
      renderNode,
      node: col,
    })
  );

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${nodes.length}, 1fr)`,
        columnGap: '1rem',
      }}
    >
      {nodes}
    </div>
  );
};

interface ColumnBlockProps {
  content: TypedObject[];
}

export const ColumnBlock: FC<
  PortableTextTypeComponentProps<ColumnBlockProps>
> = ({ value, renderNode }) => {
  const nodes = value.content.map((col, i) =>
    renderNode({
      index: i,
      isInline: true,
      renderNode,
      node: col,
    })
  );

  return <div>{nodes}</div>;
};
