import { Card, Grid, CardMedia, Typography, CardContent } from '@mui/material';
import Image from 'next/image';
import LogosloganMd from '/assets/images/boxo/Logoslogan-md.png';
import useMediaQuery from '@mui/material/useMediaQuery';
import Phu from '/assets/images/boxo/giaphu.jpg';
import DKhoa from '/assets/images/boxo/dinhkhoa.jpg';
import Khanh from '/assets/images/boxo/khanh.jpg';
import Loc from '/assets/images/boxo/loc.jpg';
import Thien from '/assets/images/boxo/thien.jpg';
import AKhoa from '/assets/images/boxo/anhkhoa.jpg';
import Long from '/assets/images/boxo/long.jpg';
const CardMember = () => {
  const matches = useMediaQuery('(min-width:700px)');

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          className="shadow"
          variant="outlined"
          sx={{
            maxWidth: 300,

            borderWidth: 1,
          }}
        >
          <CardMedia
            component="img"
            image="img/giaphu.jpg"
            height="300"
            title="Phú"
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          className="shadow"
          variant="outlined"
          sx={{
            maxWidth: 300,

            borderWidth: 1,
          }}
        >
          <CardMedia
            component="img"
            image="img/thien.jpg"
            height="300"
            title="Thiên"
          />
        </Card>
      </Grid>{' '}
      {/* <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 300,
            height: 500,
            borderWidth: 1,
            borderColor: '#2196f3',
          }}
        >
          <CardMedia
            component="img"
            image="img/khanh.jpg"
            height="300"
            title="Khánh"
          />

          <CardContent>
            <Typography gutterBottom variant="h4">
              Phạm Đức Khánh - 20521453
            </Typography>
            <br />
            <Typography variant="h5">
              <strong>Team: </strong>Back-end
              <br />
              <strong>Nhiệm vụ: </strong> Lập trình API, Controller, Model, tạo
              Dataset.
            </Typography>
          </CardContent>
        </Card>
      </Grid>{' '} */}
      {/* <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 300,
            height: 500,
            borderWidth: 1,
            borderColor: '#2196f3',
          }}
        >
          <CardMedia
            component="img"
            image="img/anhkhoa.jpg"
            height="300"
            title="Anh Khoa"
          />
          <CardContent>
            <Typography gutterBottom variant="h4">
              Nguyễn Anh Khoa - 20520584
            </Typography>
            <br />
            <Typography variant="h5">
              <strong>Team: </strong>Front-end
              <br />
              <strong>Nhiệm vụ: </strong> Lập trình giao diện.
            </Typography>
          </CardContent>
        </Card>
      </Grid>{' '} */}
      {/* <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 300,
            height: 500,
            borderWidth: 1,
            borderColor: '#2196f3',
          }}
        >
          <CardMedia
            component="img"
            image="img/dinhkhoa.jpg"
            height="300"
            title="Đình Khoa"
          />
          <CardContent>
            <Typography gutterBottom variant="h4">
              Nguyễn Đình Khoa - 20520586
            </Typography>
            <br />
            <Typography variant="h5">
              <strong>Team: </strong>Front-end
              <br />
              <strong>Nhiệm vụ: </strong> Lập trình giao diện.
            </Typography>
          </CardContent>
        </Card>
      </Grid>{' '} */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          variant="outlined"
          className="shadow"
          sx={{
            maxWidth: 300,

            borderWidth: 1,
          }}
        >
          <CardMedia
            component="img"
            image="img/long.jpg"
            height="300"
            title="Nhựt Long"
          />
        </Card>
      </Grid>{' '}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          variant="outlined"
          className="shadow"
          sx={{
            maxWidth: 300,

            borderWidth: 1,
          }}
        >
          <CardMedia
            component="img"
            image="img/loc.jpg"
            height="300"
            title="Tấn Lộc"
          />
        </Card>
      </Grid>{' '}
    </>
  );
};
export default CardMember;
