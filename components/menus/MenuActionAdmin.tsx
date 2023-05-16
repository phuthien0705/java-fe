import { useState, FC } from 'react';
import { IconButton, MenuItem, Menu, Stack, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IMenuActionAdmin } from '@/interfaces/compontents/menu.interface';

const MenuActionAdmin: FC<IMenuActionAdmin> = ({
  id,
  deleteCallback,
  editCallback,
  userMode = false,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        id={`action-button-${id}`}
        aria-controls={open ? `action-menu-${id}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={`action-menu-${id}`}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': `action-button-${id}`,
        }}
      >
        {!userMode && (
          <MenuItem
            onClick={() => {
              deleteCallback();
              handleClose();
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <DeleteIcon fontSize="inherit" />
              <Typography>Xóa</Typography>
            </Stack>
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            editCallback();
            handleClose();
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <EditIcon fontSize="inherit" />
            <Typography>Chỉnh sửa</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuActionAdmin;
