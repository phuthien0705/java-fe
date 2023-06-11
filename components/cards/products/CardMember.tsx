import { Card, Grid, CardMedia, Typography, CardContent } from '@mui/material';

const CardMember = () => {
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          className="shadow"
          variant="outlined"
          sx={{
            height: '425px',
            maxWidth: 300,
            borderWidth: 1,
          }}
        >
          <CardMedia
            component="img"
            image="img/long.jpg"
            sx={{ height: '300px' }}
            title="Long"
          />
          <CardContent>
            <Typography gutterBottom variant="h4">
              Châu Nhựt Long - 20520238
            </Typography>
            <br />
            <Typography variant="h5">
              <strong>Team: </strong>Back-end
            </Typography>
          </CardContent>
        </Card>
      </Grid>{' '}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          className="shadow"
          variant="outlined"
          sx={{
            height: '425px',
            maxWidth: 300,

            borderWidth: 1,
          }}
        >
          <CardMedia
            component="img"
            image="img/thien.jpg"
            sx={{ height: '300px' }}
            title="Thiên"
          />
          <CardContent>
            <Typography gutterBottom variant="h4">
              Hứa Phú Thiên - 20521946
            </Typography>
            <br />
            <Typography variant="h5">
              <strong>Team: </strong>Front-end
            </Typography>
          </CardContent>
        </Card>
      </Grid>{' '}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          variant="outlined"
          className="shadow"
          sx={{
            height: '425px',
            maxWidth: 300,
            borderWidth: 1,
          }}
        >
          <CardMedia
            component="img"
            image="img/loc.jpg"
            sx={{ height: '300px' }}
            title="Tấn Lộc"
          />
          <CardContent>
            <Typography gutterBottom variant="h4">
              Lê Tấn Lộc - 20520235
            </Typography>
            <br />
            <Typography variant="h5">
              <strong>Team: </strong>Back-end
            </Typography>
          </CardContent>
        </Card>
      </Grid>{' '}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          variant="outlined"
          className="shadow"
          sx={{
            height: '425px',
            maxWidth: 300,
            borderWidth: 1,
          }}
        >
          <CardMedia
            component="img"
            image="img/nguyet.jpg"
            sx={{ height: '300px' }}
            title="Tấn Lộc"
          />
          <CardContent>
            <Typography gutterBottom variant="h4">
              Vũ Ánh Nguyệt - 19520194
            </Typography>
            <br />
            <Typography variant="h5">
              <strong>Team: </strong>Back-end
            </Typography>
          </CardContent>
        </Card>
      </Grid>{' '}
    </>
  );
};
export default CardMember;
