import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './styles.module.scss';

interface FooterContentProps {}

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

const FooterContent: FC<FooterContentProps> = ({}) => {
  return (
    <div className={clsx(styles.FooterContent)}>
      <div className={clsx(styles.FooterTopRow)}>
        <Link href={'/'} className='logo-link'>
          <Image
            className='logo'
            src={'/images/logo.svg'}
            alt='Polyrhythm'
            width={140}
            height={27}
          />
        </Link>
        <nav className={clsx(styles.FooterNavMenu)}>
          {menu.map((el) => {
            return (
              <Link key={el.url} href={el.url}>
                {el.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className={clsx(styles.FooterBottomRow)}>
        <span>2025 &copy; Polyrhythm. All Rights Reserved</span>
      </div>
    </div>
  );
};

export default FooterContent;
