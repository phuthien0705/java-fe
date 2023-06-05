// material-ui
import { List, Divider } from '@mui/material';
import { useMemo } from 'react';
import {
  IconUsers,
  IconBook2,
  IconUser,
  IconCategory,
  IconBuilding,
  IconChartBar,
  IconArticle,
  IconClipboardCheck,
} from '@tabler/icons';
import NavItem from './NavItem';

const MenuList = () => {
  const listItem = useMemo(
    () => [
      {
        title: 'Thống kê',
        url: '/admin/statistic',
        icon: IconChartBar,
      },
      {
        title: 'Bài viết',
        url: '/admin/post',
        icon: IconArticle,
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
      {
        title: 'Đơn hàng',
        url: '/admin/order',
        icon: IconClipboardCheck,
      },
    ],
    []
  );

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
