import Header from '@/components/header/Header';
import HomeFullpage from '@/components/HomeFullpage/HomeFullpage';
import { getContacts } from '@/data/contacts';
import { getSlides } from '@/data/homepage';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const data = await getSlides();
  const contacts = await getContacts();

  return (
    <>
      <Header />
      <HomeFullpage data={data} contacts={contacts} />
    </>
  );
};

export default page;
