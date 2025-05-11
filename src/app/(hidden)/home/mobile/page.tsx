import Header from '@/components/header/Header';
import HomepageMobile from '@/components/HomepageMobile/HomepageMobile';
import { getSlides } from '@/data/homepage';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const data = await getSlides();

  return (
    <>
      <Header />
      <HomepageMobile data={data} />
    </>
  );
};

export default page;
