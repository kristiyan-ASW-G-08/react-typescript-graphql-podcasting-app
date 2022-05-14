import { FC } from 'react';
import HeadLayout from '@/components/HeadLayout';

const NotFound: FC = () => (
  <>
    <HeadLayout title={'404 Not Found'} />
    <div>404</div>
  </>
);

export default NotFound;
