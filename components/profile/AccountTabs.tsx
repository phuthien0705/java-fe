import ProfileTab from './ProfileTab';
import SecurityTab from './SecurityTab';
import { Box, Tab } from '@mui/material';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';

const AccountTabs: React.FunctionComponent = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };
  return (
    <Box sx={{ mb: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs onChange={handleChange} value={currentTab}>
          <Tab label="Thông tin tài khoản" value={0} />
          <Tab label="Bảo mật" value={1} />
        </Tabs>
      </Box>
      {currentTab === 0 && <ProfileTab />}
      {currentTab === 1 && <SecurityTab />}
    </Box>
  );
};
export default AccountTabs;
