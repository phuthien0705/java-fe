import { ButtonGroup, Button } from '@mui/material';
import { useState, FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface IQuantityButton {
  currentQuantity: number;
  handleIncreaseQuantity: Function;
  handleDecreaseQuantity: Function;
}

const QuantityButton: FC<IQuantityButton> = ({
  currentQuantity,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}) => {
  return (
    <ButtonGroup size="small" color="primary">
      <Button sx={{ padding: 0 }} onClick={() => handleDecreaseQuantity()}>
        <RemoveIcon />
      </Button>
      <Button sx={{ padding: 0 }}>{currentQuantity}</Button>
      <Button sx={{ padding: 0 }} onClick={() => handleIncreaseQuantity()}>
        <AddIcon />
      </Button>
    </ButtonGroup>
  );
};

export default QuantityButton;
