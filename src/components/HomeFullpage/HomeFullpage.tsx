'use client';

import '@/assets/styles/fullpagejs.overrides.css';
import ReactFullpage from '@fullpage/react-fullpage';
import Image from 'next/image';
import { FC } from 'react';
import styles from './style.module.scss';

interface HomeFullpageProps {}

const anchors = ['one', 'two', 'three'];

const HomeFullpage: FC<HomeFullpageProps> = ({}) => {
  return (
    <>
      <ReactFullpage
        licenseKey={'asd'}
        anchors={anchors}
        navigation
        navigationTooltips={anchors}
        credits={{
          enabled: false,
          label: '',
        }}
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <div className={`${styles.Section} section`}>
                <div>
                  <Image src={'/images/img-1.jpg'} fill alt='Bubna' />
                  <p>Section 1 (welcome to fullpage.js)</p>
                  <button onClick={() => fullpageApi.moveSectionDown()}>
                    Click me to move down
                  </button>
                </div>
              </div>
              <div className={`${styles.Section} section`}>
                <Image src={'/images/img-2.jpg'} fill alt='Bubna' />

                <p>Section 2</p>
              </div>
              <div className={`${styles.Section} section`}>
                <Image src={'/images/img-3.jpg'} fill alt='Bubna' />

                <p>Section 3</p>
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      ></ReactFullpage>
    </>
  );
};

export default HomeFullpage;
