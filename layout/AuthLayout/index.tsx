import { ILayout } from '@/interfaces/layout.interface';
import { NextPageWithLayout } from '@/pages/page';
import NavigationScroll from '../NavigationScroll';

const AuthLayout: NextPageWithLayout<ILayout> = ({ children }) => {
  return <NavigationScroll>{children}</NavigationScroll>;
};

export default AuthLayout;
