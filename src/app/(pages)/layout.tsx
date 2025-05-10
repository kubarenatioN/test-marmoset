import Header from '@/components/header/Header';
import { FC } from 'react';

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      {/* <PageUpBtn /> */}
    </>
  );
};

export default layout;
