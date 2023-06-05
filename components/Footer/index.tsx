import { useState } from 'react';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import {
  Box,
  IconButton,
  Link,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LogoSection from '../LogoSection';
import useMediaQuery from '@mui/material/useMediaQuery';

const Footer = () => {
  const theme = useTheme();
  const matches = useMediaQuery('(min-width:750px)');
  const { locales, locale, asPath, push } = useRouter();
  const [currentLocale, setCurrentLocale] = useState(locale ?? 'vi');
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
      <Box sx={{ backgroundColor: '#fff', p: theme.spacing(1) }}>
        <Box textAlign="center" mt={theme.spacing(2)}>
          <LogoSection />
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="center"
            alignItems="flex-start"
            spacing={matches ? theme.spacing(5) : theme.spacing(2)}
            flexWrap={'wrap'}
            color="inherit"
            mt={theme.spacing(4)}
            mb={theme.spacing(2)}
            mx={{ xs: theme.spacing(2), sm: 0 }}
          >
            <Stack direction="column" spacing={1} justifyContent="flex-start">
              <Link
                variant="h4"
                color="inherit"
                underline="none"
                justifyItems="flex-start"
                display="flex"
              >
                {<FormattedMessage id="footer.service" />}
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
                {<FormattedMessage id="footer.termOfUse" />}
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
                {<FormattedMessage id="footer.security" />}
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
                {<FormattedMessage id="footer.payment" />}
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
                {<FormattedMessage id="footer.support" />}
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
                {<FormattedMessage id="footer.shipment" />}
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
                {<FormattedMessage id="footer.exchange" />}
              </Link>
            </Stack>
            <Stack
              direction={matches ? 'row' : 'column'}
              spacing={matches ? 5 : 1}
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Link
                href="about-us"
                variant="h4"
                color="inherit"
                underline="none"
              >
                {<FormattedMessage id="footer.introduce" />}
              </Link>

              <Link
                href="contact-us"
                variant="h4"
                color="inherit"
                underline="none"
              >
                {<FormattedMessage id="footer.contact" />}
              </Link>

              <Select
                id="select-language"
                variant={'standard'}
                value={currentLocale}
                renderValue={(value: string) => (
                  <FormattedMessage id={`language.${value}`} />
                )}
                label={<FormattedMessage id="language.title" />}
                onChange={(event) => {
                  setCurrentLocale(event.target.value);
                }}
              >
                {locales?.map((i: string, _index: number) => (
                  <MenuItem
                    key={_index}
                    value={i}
                    onClick={() => {
                      push(asPath, asPath, { locale: i });
                    }}
                  >
                    {<FormattedMessage id={`language.${i}`} />}
                  </MenuItem>
                ))}
              </Select>
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
        <Box
          textAlign="center"
          pt={{ xs: theme.spacing(1), sm: theme.spacing(2) }}
          pb={{ xs: theme.spacing(2), sm: 0 }}
        >
          <Typography sx={{ color: theme.palette.info as unknown as any }}>
            &reg; {new Date().getFullYear()} Bản quyền thuộc về Công ty TNHH
            BOXO
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Footer;
