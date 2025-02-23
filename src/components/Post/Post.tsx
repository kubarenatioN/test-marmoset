import {
  PortableText,
  PortableTextBlock,
  PortableTextMarkComponentProps,
} from '@portabletext/react';
import { Property } from 'csstype';
import { FC } from 'react';
import { ColumnBlock, ColumnsBlock } from './components/ColumnsBlock';
import ImageBlock from './components/ImageBlock';
import ModelBlock from './components/ModelBlock';
import styles from './Post.module.scss';

interface PostProps {
  content: PortableTextBlock[];
}

const Post: FC<PostProps> = ({ content }) => {
  return (
    <article className={styles.Article}>
      <PortableText
        value={content}
        components={{
          types: {
            modelBlock: ModelBlock,
            imgBlock: ImageBlock,
            columns: ColumnsBlock,
            column: ColumnBlock,
          },
          block: {
            normal: ({ value, children }) => {
              // if normal node contains "align" mark,
              // we render it in div, to apply alignment deeper
              if (value.markDefs?.find((el) => el._type === 'align')) {
                return <div>{children}</div>;
              }

              // otherwise, render normal block in paragraph
              return <p>{children}</p>;
            },
          },
          marks: {
            align: (
              props: PortableTextMarkComponentProps<{
                _type: 'align';
                dir: string;
              }>
            ) => {
              const { value } = props;

              const textAlign: Property.TextAlign =
                value?.dir === 'center'
                  ? 'center'
                  : value?.dir === 'right'
                  ? 'end'
                  : 'start';

              // return paragraph with proper alignment
              return (
                <p style={{ textAlign, textWrap: 'balance' }}>
                  {props.children}
                </p>
              );
            },
          },
        }}
      />
    </article>
  );
};

export default Post;
