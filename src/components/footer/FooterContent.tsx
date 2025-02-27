import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './styles.module.scss';

interface FooterContentProps {}

const FooterContent: FC<FooterContentProps> = ({}) => {
  return (
    <div className={clsx(styles.FooterContent)}>
      <Link href={'/'} className='logo-link'>
        <Image
          className='logo'
          src={'/images/logo.svg'}
          alt='Polyrhythm'
          width={200}
          height={30}
        />
      </Link>
      <div>
        <a href='https://x.com' target='_blank'>
          X.com
        </a>
      </div>
    </div>
  );
};

export default FooterContent;
