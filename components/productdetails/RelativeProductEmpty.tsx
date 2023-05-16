import { Box, Typography } from '@mui/material';
import CustomNoRowsOverlay from '../empty/CustomNoRowsOverlay';

const RelativeProductEmpty: React.FunctionComponent = () => {
  return (
    <Box>
      <CustomNoRowsOverlay />
      <Typography sx={{ textAlign: 'center' }}>
        Không tìm thấy sách liên quan
      </Typography>
      ;
    </Box>
  );
};

export default RelativeProductEmpty;
