import { IconType } from 'react-icons';
import {IoBarChartSharp} from 'react-icons/io5';
import {MdQueryStats} from 'react-icons/md'
import {GiPig} from 'react-icons/gi';
import {ImProfile} from 'react-icons/im';


type link = {
  id: number,
  name: string,
  path: string,
  icon: IconType,
};

const links: link[] = [
  {
    id: 1,
    name: 'Statistics',
    path: '/',
    icon: IoBarChartSharp
  },
  {
    id: 2,
    name: 'All pigs',
    path: '/all-pig',
    icon: MdQueryStats
  },
  {
    id: 3,
    name: 'Add a pig',
    path: '/add-pig',
    icon: GiPig
  },
  {
    id: 4,
    name: 'Profile',
    path: '/profile',
    icon: ImProfile
  }
]

export default links;