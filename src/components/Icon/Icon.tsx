const iconsMap: {
  [key: string]: ReactElement;
} = {
  artstation: <FaArtstation />,
  instagram: <BsInstagram />,
  vimeo: <BsVimeo />,
  xcom: <BsTwitterX />,
};

import { FC, ReactElement } from 'react';
import { BsInstagram, BsTwitterX, BsVimeo } from 'react-icons/bs';
import { FaArtstation } from 'react-icons/fa';

interface IconProps {
  name: string;
}

const Icon: FC<IconProps> = ({ name }) => {
  return <>{iconsMap[name]}</>;
};

export default Icon;
