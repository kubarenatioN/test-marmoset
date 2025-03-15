import Header from '@/components/header/Header';
import HomeFullpage from '@/components/HomeFullpage/HomeFullpage';
import HomepageMobile from '@/components/HomepageMobile/HomepageMobile';
import { getSlides } from '@/data/homepage';
import { isMobile } from '@/helpers/is-mobile';

export default async function Home() {
  const data = await getSlides();

  const mobile = await isMobile();

  return (
    <>
      <Header absolute />
      {!mobile ? <HomeFullpage data={data} /> : <HomepageMobile data={data} />}
    </>
  );
}
