import { PortableTextMarkComponentProps } from '@portabletext/react';
import { FC } from 'react';

interface AlignMarkProps {
  _type: 'align';
  dir: string;
}

const AlignMark: FC<PortableTextMarkComponentProps<AlignMarkProps>> = ({
  value,
  children,
}) => {
  const textAlign =
    value?.dir === 'center'
      ? 'center'
      : value?.dir === 'right'
      ? 'end'
      : 'start';

  // return paragraph with proper alignment
  return <p style={{ textAlign, textWrap: 'balance' }}>{children}</p>;
};

export default AlignMark;
