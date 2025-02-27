import { ITag } from '@/models';
import { clsx } from 'clsx';
import { FC } from 'react';
import styles from './style.module.scss';

interface TagsListProps {
  tags: ITag[];
  dir?: string;
}

const TagsList: FC<TagsListProps> = ({ tags, dir }) => {
  return (
    <ul className={clsx(styles.List, 'tags-list', dir ?? '')}>
      {tags.map((t) => {
        const tag = colorsMap.get(t.value) ?? '';

        return (
          <li key={t.value} className={clsx(styles.Item, tag)}>
            {t.label}
          </li>
        );
      })}
    </ul>
  );
};

const colorsMap = new Map<string, string>([
  ['3d-models', 'three-d-models'],
  ['videos', 'videos'],
  ['stills', 'stills'],
]);

export default TagsList;
