import { getContacts } from '@/data/contacts';
import clsx from 'clsx';
import { FC } from 'react';
import FooterContent from './FooterContent';
import styles from './styles.module.scss';

interface FooterProps {}

const Footer: FC<FooterProps> = async ({}) => {
  const contacts = await getContacts();

  return (
    <footer className={clsx(styles.Footer)}>
      <FooterContent contacts={contacts} />
    </footer>
  );
};

export default Footer;
