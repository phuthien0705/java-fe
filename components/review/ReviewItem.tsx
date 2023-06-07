import { IReviewItem } from '@/interfaces/review.interface';
import { Box, Typography, Divider, Avatar, Stack } from '@mui/material';
import Rating from '@mui/material/Rating';

const ReviewItem: React.FunctionComponent<IReviewItem> = ({
  rating,
  comment,
  user,
}) => {
  return (
    <Stack >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Avatar sx={{ width: 50, height: 50, mr: 1.5 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body1" sx={{ mb: 0.5, fontWeight: 'bold' }}>
            {user}
          </Typography>
          <Rating
            value={rating}
            readOnly
            size="small"
            sx={{ alignSelf: 'flex-start', ml: -0.3 }}
          />
          <Typography
            variant="body1"
            sx={{ mt: 0.5, textAlign: 'left', alignSelf: 'flex-start' }}
          >
            {comment}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: '100%', my: 2 }}>
          <Divider />
        </Box>
    </Stack>
  );
};

export default ReviewItem;
