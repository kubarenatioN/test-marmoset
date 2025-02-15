import clsx from 'clsx';
import { FC } from 'react';
import FooterContent from './FooterContent';
import styles from './styles.module.scss';

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className={clsx(styles.Footer)}>
      <FooterContent />
    </footer>
  );
};

export default Footer;
