// material-ui
import { Typography, List, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NavItem from './NavItem';
import {
  IconUsers,
  IconBook2,
  IconUser,
  IconCategory,
  IconBuilding,
  IconChartBar,
} from '@tabler/icons';
import { useMemo } from 'react';

const MenuList = () => {
  const listItem = useMemo(
    () => [
      {
        title: 'Thống kê',
        url: '/admin/statistic',
        icon: IconChartBar,
      },
      {
        title: 'Sản phẩm',
        url: '/admin/product',
        icon: IconBook2,
      },
      {
        title: 'Nhà xuất bản',
        url: '/admin/publisher',
        icon: IconBuilding,
      },
      {
        title: 'Thể loại',
        url: '/admin/genre',
        icon: IconCategory,
      },
      {
        title: 'Tác giả',
        url: '/admin/author',
        icon: IconUser,
      },

      {
        title: 'Người dùng',
        url: '/admin/user',
        icon: IconUsers,
      },
    ],
    []
  );
  const theme: any = useTheme();

  return (
    <>
      <List>
        {/* <NavItem item={listItem[0]} level={1} /> */}
        {listItem.map((item, _index) => (
          <NavItem key={_index} item={item} />
        ))}
      </List>
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

export default MenuList;
