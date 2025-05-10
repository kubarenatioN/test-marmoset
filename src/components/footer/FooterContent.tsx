import { getSocials, IContacts } from '@/models/contacts';
import { clsx } from 'clsx';
import Link from 'next/link';
import { FC } from 'react';
import Icon from '../Icon/Icon';
import styles from './styles.module.scss';

interface FooterContentProps {
  contacts: IContacts;
  hideSocials?: boolean;
}

const menu = [
  {
    url: '/work',
    label: 'Work',
  },
  {
    url: '/contact',
    label: 'Contact',
  },
];

const FooterContent: FC<FooterContentProps> = ({
  contacts,
  hideSocials = false,
}) => {
  const links = getSocials(contacts);

  return (
    <div className={clsx(styles.FooterContent)}>
      {!hideSocials ? (
        <div className={clsx(styles.FooterTopRow)}>
          <ul className={clsx(styles.FooterSocialsList)}>
            {Object.entries(links).map(([type, url]) => {
              return (
                <li key={type} className={clsx(styles.FooterSocialLink)}>
                  <Link href={url} target='_blank'>
                    <Icon name={type} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      <div className={clsx(styles.FooterBottomRow)}>
        <span>2025 &copy; Polyrhythm. All Rights Reserved</span>
      </div>
    </div>
  );
};

export default FooterContent;
