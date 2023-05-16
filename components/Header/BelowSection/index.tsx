import {
  Container,
  Stack,
  Divider,
  Link,
  Box,
  Typography,
  useTheme,
  Button,
} from '@mui/material';
import { FC } from 'react';

const GenreList: Array<string> = [
  'Best Seller',
  'Văn Học',
  'Sách Giáo Khoa',
  'Kinh Tế',
  'Tâm Lý - Kỹ Năng',
];

interface IBelow {
  List?: Array<string>;
}

const BelowSection: FC<IBelow> = ({ List = GenreList }) => {
  const theme: any = useTheme();

  return (
    <Container
      disableGutters
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: '',
      }}
    >
      <Box sx={{ display: 'flex', columnGap: '10px' }}>
        {List.map((item: string, index: number) => (
          <div key={index}>
            <Link underline="none" href="#">
              <Button
                sx={{
                  padding: '5px 10px',
                  borderRadius: '8px',
                }}
              >
                {item}
              </Button>
            </Link>
            <Divider style={{ width: '1%', borderColor: 'white' }} />
          </div>
        ))}
      </Box>
      <Box sx={{ display: 'flex', columnGap: '5px' }}>
        {' '}
        <Link href="#" underline="none" color="secondary">
          <Button
            color="secondary"
            sx={{
              whiteSpace: 'nowrap',
              padding: '5px 10px',
              borderRadius: '8px',
            }}
          >
            Giới Thiệu
          </Button>
        </Link>
        <Divider style={{ width: '1%' }} />
        <Link href="#" underline="none" color="secondary">
          <Button
            color="secondary"
            sx={{
              whiteSpace: 'nowrap',
              padding: '5px 10px',
              borderRadius: '8px',
            }}
          >
            Tải Ứng Dụng
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default BelowSection;
