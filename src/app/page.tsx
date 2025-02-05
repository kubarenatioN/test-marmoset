import Header from '@/components/header/Header';
import HomeFullpage from '@/components/HomeFullpage/HomeFullpage';
import styles from './page.module.scss';

export default function Home() {
  return (
    <>
      <div className={styles.HeaderWrapper}>
        <Header />
      </div>
      <div className={styles.Content}>
        <HomeFullpage />;
      </div>
    </>
  );
}
