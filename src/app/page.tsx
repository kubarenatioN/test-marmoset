import Header from '@/components/header/Header';
import HomeFullpage from '@/components/HomeFullpage/HomeFullpage';
import { client } from '@/helpers/sanity-client';
import { IHomepageSlide } from '@/models';
import styles from './page.module.scss';

const fpSlidesQuery = `*[_type == 'homepageSlide'] | order(order asc, _createdAt asc)`;

export default async function Home() {
  const data = await client.fetch<IHomepageSlide[]>(
    fpSlidesQuery,
    {},
    {
      next: {
        revalidate: 10,
      },
    }
  );

  return (
    <>
      <div className={styles.HeaderWrapper}>
        <Header />
      </div>
      <HomeFullpage data={data} />;
    </>
  );
}
