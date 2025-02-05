'use client';

import ReactFullpage from '@fullpage/react-fullpage';
import { FC } from 'react';

interface HomeFullpageProps {}

const HomeFullpage: FC<HomeFullpageProps> = ({}) => {
  return (
    <>
      <ReactFullpage
        licenseKey={''}
        credits={{
          enabled: false,
        }}
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <div className='section'>
                <p>Section 1 (welcome to fullpage.js)</p>
                <button onClick={() => fullpageApi.moveSectionDown()}>
                  Click me to move down
                </button>
              </div>
              <div className='section'>
                <p>Section 2</p>
              </div>
              <div className='section'>
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
