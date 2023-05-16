import { ILayout } from '@/interfaces/layout.interface';
import { useRouter } from 'next/router';
import { useEffect, Fragment } from 'react';

const NavigationScroll: React.FunctionComponent<ILayout> = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [router.pathname]);
  return <Fragment>{children}</Fragment> || null;
};

export default NavigationScroll;
