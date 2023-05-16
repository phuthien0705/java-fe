import CarouselCustumized from '@/components/carousel/CarouselCustumized';
import MainCard from '@/components/cards/MainCard';
import { Typography, Grid, Stack, Divider, Box } from '@mui/material';
import Image from 'next/image';
import LogosloganMd from '../assets/images/boxo/Logoslogan-md.png';
import CardMember from '@/components/cards/products/CardMember';
import useMediaQuery from '@mui/material/useMediaQuery';
import ProductLayout from '@/layout/ProductLayot';

const aboutUs = () => {
  const matches = useMediaQuery('(min-width:700px)');
  return (
    <>
      <ProductLayout>
        <Box sx={{ pb: 2 }}>
          <CarouselCustumized />
        </Box>

        <Box sx={{ mb: 4 }}>
          <MainCard title={<Typography variant="h2">Giới thiệu</Typography>}>
            <Typography variant="h3">Thành lập</Typography>
            <br />
            <Divider flexItem />
            <br />
            <Stack display="flex" direction="row" spacing={5}>
              <Grid flex={3}>
                <Typography
                  variant="h5"
                  style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
                  mt={8}
                >
                  Xuất thân từ một hiệu sách nhỏ có tên &quot;Tiệm sách Bảo
                  Thư&quot;, được thành lập từ năm 2020 bởi một nhóm sinh viên
                  năm nhất trường Đại học Công nghệ Thông tin ĐHQG - Tp.HCM,
                  được biết đến là đơn vị chuyên mua, bán các loại sách cũ trên
                  nên tảng mạng xã Facebook.
                </Typography>
                <br />
                <Typography
                  variant="h5"
                  style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
                >
                  Ngày 15/09/2022, sau hơn 2 năm hoạt động với những kết quả
                  kinh doanh thuận lợi, nhóm sinh viên đã dựa trên dự án
                  &quot;Xây dựng Website thương mại điện tử&quot;, trưởng nhóm{' '}
                  <cite>Huỳnh Gia Phú</cite> đã phát triển dự án trên thành lập
                  doanh nghiệp chuyên xuất - nhập khẩu và kinh doanh sách với
                  thương hiệu <strong>BOXO</strong>.
                </Typography>
              </Grid>
              <Divider
                orientation="vertical"
                style={{ display: matches ? 'true' : 'none' }}
              />
              <Grid flex={1} ml={100} display={matches ? 'true' : 'none'}>
                <Image
                  alt="BOXO Logo-Slogan"
                  src={LogosloganMd}
                  //   sizes="(max-width: 768px) 100vw,
                  // (max-width: 1200px) 50vw,
                  // 33vw"

                  // width="406"
                  // height="569"
                />
              </Grid>
            </Stack>
            <br />
            <Divider flexItem />
            <br />
            <Typography variant="h3">Thành viên</Typography>
            <br />
            <Divider flexItem />
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Nhóm bao gồm 4 thành viên với vị trí và nhiệm vụ khác nhau. Hợp
              tác hoạt động với phương châm tinh thần &quot;Đoàn kết - Trách
              nhiệm - Bản lĩnh&quot;.
            </Typography>
            <br />
            <Grid
              container
              display="flex"
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <CardMember />
            </Grid>
            <br />
            <Divider flexItem />
            <br />
            <Typography variant="h3">
              Lĩnh vực kinh doanh &amp; Tuyên bố phạm vi
            </Typography>
            <br />
            <Divider flexItem />
            <br />
            <Typography variant="h4">Lĩnh vực kinh doanh: </Typography>
            <ul
              style={{
                fontSize: matches ? 16 : 18,
                lineHeight: 1.5,
                color: 'black',
              }}
            >
              <li>Cung cấp các loại sách nội và ngoại nhập.</li>
              <li>
                Sản phẩm mở rộng trong tương lai của <strong>BOXO</strong>: đồ
                dùng, thiết bị văn phòng phẩm.
              </li>
              <li>
                Cung cấp các giải pháp phần mềm và website thương mại điện tử
                cho khách hàng và doanh nghiệp.
              </li>
              <li>
                Cung cấp dịch vụ sửa chữa, nâng cấp và bảo trị hệ thống website
                thương mại điện tử.
              </li>
              <li>Cung cấp giải pháp Marketing online &amp; SEO.</li>
              <li>Cho phép đặt các banner quảng cáo tại website.</li>
              <li>
                Đối tượng khách hàng: người có nhu cầu mua sách, thiết kế
                website.{' '}
              </li>
            </ul>
            <Typography variant="h4">Tuyên bố phạm vi: </Typography>
            <ul
              style={{
                fontSize: matches ? 16 : 18,
                lineHeight: 1.5,
                color: 'black',
              }}
            >
              <li>
                Phạm vi dự án nằm trong nội dung đồ án môn học tại trường Đại
                học Công nghệ Thông tin ĐHQGP - Tp.HCM.
              </li>
              <li>
                Quản lý kiến thức: kiến thức thực hiện đồ án dựa trên nội dung
                các môn học: Internet Công nghệ Web, Phát triển ứng dụng Web,
                Thương mại điện tử, Quản lý dự án Công nghệ thông tin,... và các
                nguồn tài liệu tham khảo mở trên Internet.
              </li>
            </ul>
            <br />
            <Divider flexItem />
            <br />
            <Typography variant="h3">Tầm nhìn &amp; Mục tiêu</Typography>
            <br />
            <Divider flexItem />
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Tháng 12 năm 2022, hướng đến xây dựng một ứng dụng website thương
              mại điện tử về kinh doanh sách với đầy đủ các tính năng đăng ký,
              đăng nhập, phân quyền, bảo mật, tìm kiếm - xem sản phẩm, đặt hàng,
              thanh toán, SEO,...
            </Typography>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Năm 2023, quảng bá và xây dựng hình ảnh thương hiệu{' '}
              <strong>BOXO</strong> thành doanh nghiệp tốp đầu về kinh doanh,
              xuất - nhập khẩu sách. Xây dựng, phát triển ứng dụng{' '}
              <strong>BOXO</strong> dựa trên trang web thương mại điện tử sẵn có
              lên các cửa hàng ứng dụng CH Play, Apple Store.
            </Typography>
            <br />
            <Divider flexItem />
            <br />
            <Typography variant="h3">Sứ mệnh</Typography>
            <br />
            <Divider flexItem />
            <br />
            <Typography variant="h4">Đối với cộng đồng: </Typography>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Tạo lập các giá trị thiết thực dựa trên dịch vụ và sản phẩm cung
              cấp: chất lượng, chính hãng, đảm bảo đầy đủ các quyền lợi người
              tiêu dùng với chính sách phù hợp, mang đến sự hài lòng cho khách
              hàng là mục tiêu hàng đầu của <strong>BOXO</strong>.
            </Typography>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Tạo nguồn việc làm cho sinh viên mới ra trường trong lĩnh vực kinh
              tế, truyền thông, công nghệ thông tin.
            </Typography>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Thực hiện và đóng góp ít nhất một nguồn quỹ xã hội dựa trên lợi
              nhuận doanh số.
            </Typography>
            <br />
            <Typography variant="h4">Với doanh nghiệp: </Typography>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Môi trường làm việc năng động, sáng tạo, chú trọng tinh thần sẻ
              chia giúp đỡ, đoàn kết nội bộ.
            </Typography>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Mang đến nguồn thu nhập ổn định, cùng nhau cống hiến tận tâm vì
              các mục tiêu chung.
            </Typography>
            <br />
            <p style={{ textAlign: 'center' }}>
              <em>
                Hãy tham gia và đồng hành với đại gia đình <strong>BOXO</strong>
                !
              </em>
            </p>
          </MainCard>
        </Box>
      </ProductLayout>
    </>
  );
};
export default aboutUs;
