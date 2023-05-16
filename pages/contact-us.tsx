import emailjs from '@emailjs/browser';
import {
  Typography,
  Grid,
  Paper,
  Stack,
  IconButton,
  TextField,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useRef } from 'react';
import ProductLayout from '@/layout/ProductLayot';

const ContactUs = () => {
  const form = useRef<any>();
  const matches = useMediaQuery('(min-width:850px)');
  const sendEmail: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_8jips8s',
        'template_kod09o9',
        form.current,
        'XRKVw4KhOaO7XY_gb'
      )
      .then(
        (result) => {},
        (error) => {}
      );
    e.currentTarget.reset();
  };

  return (
    <>
      <ProductLayout>
        <Grid>
          <Card
            style={{
              margin: '0 auto',
              maxWidth: 800,
            }}
            className="shadow"
          >
            <CardContent
              style={{
                padding: '25px',
              }}
            >
              <Stack
                display="flex"
                flexDirection={matches ? 'row' : 'column'}
                spacing={3}
              >
                <Grid flex={5}>
                  <Paper
                    style={{
                      width: '100%',
                      height: '100%',
                      color: 'black',
                      padding: '10px',
                    }}
                  >
                    <Typography variant="h3" color="black">
                      THÔNG TIN LIÊN HỆ
                    </Typography>
                    <br />
                    <Typography>
                      Chúng tôi thường phản hồi email sau 2 ngày làm việc trừ
                      các ngày lễ, tết, CN.
                    </Typography>
                    <br />
                    <br />
                    <br />
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PhoneIcon />
                      <Typography>190000000</Typography>
                    </Stack>
                    <br />
                    <br />
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <EmailIcon />
                      <Typography>cskh@boxo.com.vn</Typography>
                    </Stack>
                    <br />
                    <br />
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <LocationOnIcon />
                      <Typography>Khu phố 6, TP Thủ Đức, TP HCM</Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      spacing={2}
                      marginTop={8}
                    >
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
                  </Paper>
                </Grid>
                <Grid flex={7}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    gutterBottom
                  ></Typography>
                  <form ref={form} onSubmit={sendEmail}>
                    <Grid container spacing={2}>
                      <Grid xs={12} item>
                        <TextField
                          placeholder="Nhập Họ & Tên"
                          label="Họ & tên"
                          variant="outlined"
                          name="fullname"
                          fullWidth
                          required
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          type="email"
                          placeholder="Nhập email"
                          label="Email"
                          variant="outlined"
                          name="email"
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="phone"
                          type="number"
                          placeholder="Nhập số điện thoại cá nhân"
                          label="Phone"
                          variant="outlined"
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid xs={12} item>
                        <TextField
                          placeholder="Nhập tiêu đề"
                          label="Tiêu đề"
                          variant="outlined"
                          fullWidth
                          name="title"
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="message"
                          label="Nội dung phản hồi"
                          multiline
                          rows={4}
                          placeholder="Nội dung phản hồi"
                          variant="outlined"
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        justifyContent={matches ? 'flex-end' : 'center'}
                        marginTop={matches ? '5' : '0'}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Gửi phản hồi
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </ProductLayout>
    </>
  );
};
export default ContactUs;
