import { Metadata } from 'next';
import { FC } from 'react';
import Gallery from '../components/Gallery';

export const metadata: Metadata = {
  title: 'Work | Polyrhythm',
  description: `Discover my 3D modeling and texturing portfolio, showcasing realistic, high-quality visuals crafted with precision and creativity`,
};

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <>
      <Gallery type={undefined} />
    </>
  );
};

export default Page;
