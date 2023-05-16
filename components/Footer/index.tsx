import {
  Box,
  Container,
  Paper,
  Link,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LogoSection from '../LogoSection';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Footer = () => {
  const matches = useMediaQuery('(min-width:750px)');
  const matches2 = useMediaQuery('(max-width:815px)');

  const theme: any = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#e3f2fd',
        position: 'relative',
        '::before': {
          content: '""',
          position: 'absolute',
          top: '-0.4rem',
          left: 0,
          height: '0.4rem',
          width: '100%',
          background: 'linear-gradient(transparent,rgba(136, 165, 191, 0.3))',
        },
      }}
    >
      <Box sx={{ backgroundColor: '#fff', p: 1 }}>
        <Box textAlign="center" mt={2}>
          <LogoSection />
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={matches ? 5 : 2}
            flexWrap={matches ? 'nowrap' : 'wrap'}
            color="inherit"
            mt={1}
            mb={1}
          >
            <Stack direction="column" spacing={1} justifyContent="flex-start">
              <Link
                variant="h4"
                color="inherit"
                underline="none"
                justifyItems="flex-start"
                display="flex"
              >
                Dịch Vụ
              </Link>
              <Link
                href="use-term"
                justifyContent="flex-start"
                underline="none"
                sx={{
                  display: 'flex',
                  '&:hover': {
                    color: theme.palette.secondary.dark,
                  },
                }}
              >
                Điều khoản sử dụng
              </Link>
              <Link
                href="info-term"
                justifyContent="flex-start"
                underline="none"
                sx={{
                  display: 'flex',
                  '&:hover': {
                    color: theme.palette.secondary.dark,
                  },
                }}
              >
                Chính sách bảo mật thông tin
              </Link>
              <Link
                href="pay-term"
                underline="none"
                justifyContent="flex-start"
                sx={{
                  display: 'flex',
                  '&:hover': {
                    color: theme.palette.secondary.dark,
                  },
                }}
              >
                Chính sách bảo mật thanh toán
              </Link>
            </Stack>
            <Stack direction="column" spacing={1} justifyContent="flex-start">
              <Link
                variant="h4"
                color="inherit"
                underline="none"
                justifyItems="flex-start"
                display="flex"
              >
                Hỗ Trợ
              </Link>
              <Link
                href="trans-term"
                underline="none"
                justifyContent="flex-start"
                sx={{
                  display: 'flex',
                  '&:hover': {
                    color: theme.palette.secondary.dark,
                  },
                }}
              >
                Chính sách vận chuyển
              </Link>
              <Link
                href="sendback-term"
                underline="none"
                justifyContent="flex-start"
                sx={{
                  display: 'flex',
                  '&:hover': {
                    color: theme.palette.secondary.dark,
                  },
                }}
              >
                Chính sách đổi - trả
              </Link>
            </Stack>
            <Stack
              direction={matches ? 'row' : 'column'}
              spacing={matches ? 5 : 1}
              justifyContent="flex-start"
              alignItems="flex-start"
              // flexWrap="wrap"
            >
              <Link
                href="about-us"
                variant="h4"
                color="inherit"
                underline="none"
              >
                Giới Thiệu
              </Link>

              <Link
                href="contact-us"
                variant="h4"
                color="inherit"
                underline="none"
              >
                Liên Hệ
              </Link>

              <Link
                href="/profile"
                variant="h4"
                color="inherit"
                underline="none"
              >
                Tài Khoản
              </Link>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="center" spacing={4} margin={1}>
            <IconButton>
              <FacebookIcon />
            </IconButton>
            <IconButton>
              <TwitterIcon />
            </IconButton>
            <IconButton>
              <InstagramIcon />
            </IconButton>
            <IconButton>
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
        <Box textAlign="center" pt={{ xs: 1, sm: 2 }} pb={{ xs: 2, sm: 0 }}>
          <Typography color={theme.palette.info}>
            &reg; {new Date().getFullYear()} Bản quyền thuộc về Công ty TNHH
            BOXO
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
