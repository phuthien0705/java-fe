import { useRouter } from 'next/router';
import Image from 'next/image';
import logoIcon from '/assets/images/logo.png';
import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { scrollToTop } from '@/utils/scrollToTop';

const Logo: React.FunctionComponent = () => {
  const matches = useMediaQuery('(min-width:900px)');

  const router = useRouter();

  return (
    <Box
      onClick={() => {
        if (router?.pathname === '/') {
          scrollToTop();
        } else {
          router.push({ pathname: '/' });
        }
      }}
      sx={{ pt: 1.5 }}
    >
      <Image
        src={logoIcon}
        alt="logo"
        width={matches ? 100 : 60}
        height={matches ? 40 : 25}
      />
    </Box>
  );
};

export default Logo;
