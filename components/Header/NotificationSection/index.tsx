import { Avatar, Badge, Box, ButtonBase, useTheme } from '@mui/material';
import { IconBell } from '@tabler/icons-react';
export default function NotificationSection() {
  const theme = useTheme();
  const data: any = [];
  return (
    <Box
      sx={{
        ml: theme.spacing(1),
        mr: theme.spacing(1),
      }}
    >
      <ButtonBase sx={{ borderRadius: '12px' }} className="shadow">
        <Badge badgeContent={data ? data?.length : 0} color="primary">
          <Avatar
            variant="rounded"
            sx={{
              cursor: 'pointer',
              borderRadius: theme.spacing(1),
              width: theme.spacing(4.25),
              height: theme.spacing(4.25),
              fontSize: theme.spacing(2.4),
              transition: 'all .2s ease-in-out',
              background: theme.palette.primary.light,
              color: theme.palette.primary.dark,
              '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.primary.dark,
                color: theme.palette.primary.light,
              },
            }}
            color="inherit"
          >
            <IconBell stroke={1.5} size="1.3rem" />
          </Avatar>
        </Badge>
      </ButtonBase>
    </Box>
  );
}
