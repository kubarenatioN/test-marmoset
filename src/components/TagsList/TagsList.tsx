import { ITag } from '@/models';
import { FC } from 'react';
import styles from './style.module.scss';

interface TagsListProps {
  tags: ITag[];
}

const TagsList: FC<TagsListProps> = ({ tags }) => {
  return (
    <ul className={styles.List}>
      {tags.map((t) => {
        return (
          <li key={t.value} className={styles.Item}>
            {t.label}
          </li>
        );
      })}
    </ul>
  );
};

export default TagsList;
