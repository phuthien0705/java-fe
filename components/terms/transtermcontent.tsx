import { Typography, Box } from '@mui/material';

const TransTermContent = () => {
  return (
    <>
      <Typography
        variant="h2"
        sx={{ display: 'flex', justifyContent: 'center', p: 2 }}
      >
        CHÍNH SÁCH VẬN CHUYỂN/ĐÓNG GÓI
      </Typography>
      <Typography
        variant="h4"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        Áp dụng cho toàn bộ đơn hàng của Quý Khách tại Boxo.com
      </Typography>
      <Typography sx={{ p: 2 }}>
        Boxo.com cung cấp dịch vụ giao hàng toàn quốc, gửi hàng tận nơi đến địa
        chỉ cung cấp của Quý khách. Thời gian giao hàng dự kiến phụ thuộc vào
        kho có hàng và địa chỉ nhận hàng của Quý khách.
      </Typography>
      <Typography sx={{ paddingLeft: 2, paddingRight: 2, paddingBottom: 2 }}>
        Với đa phần đơn hàng, Boxo.com cần vài giờ làm việc để kiểm tra thông
        tin và đóng gói hàng. Nếu các sản phẩm đều có sẵn hàng, Boxo.com sẽ
        nhanh chóng bàn giao cho đối tác vận chuyển. Nếu đơn hàng có sản phẩm
        sắp phát hành, Boxo.com sẽ ưu tiên giao những sản phẩm có hàng trước cho
        Quý khách hàng.
      </Typography>
      <Typography variant="h4" sx={{ paddingLeft: 2 }}>
        Bảng thời gian dự kiến như sau:
      </Typography>
      <table className="transport-table border">
        <thead>
          <tr>
            <th className="border cell-padding">Tuyến</th>
            <th className="border cell-padding">Khu vực</th>
            <th className="border cell-padding">Thời gian dự tính</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border cell-padding">
              <Typography>Hồ Chí Minh - Hồ Chí Minh</Typography>
              <Typography>Hà Nội - Hà Nội</Typography>
            </td>
            <td className="border cell-padding">
              <Typography>Nội Thành</Typography>
              <Typography>Ngoại Thành</Typography>
            </td>
            <td className="border cell-padding"> 1 - 2 ngày </td>
          </tr>
          <tr className="border">
            <td rowSpan={2} className="border cell-padding">
              <Typography>Hồ Chí Minh - Miền Nam</Typography>
              <Typography>Hà Nội - Miền Bắc</Typography>
            </td>
            <td className="border cell-padding">
              Trung tâm Tỉnh, Thành phố, Thị xã
            </td>
            <td className="border cell-padding">2 ngày</td>
          </tr>
          <tr>
            <td className="border cell-padding">Huyện, xã</td>
            <td className="border cell-padding">2 - 3 ngày</td>
          </tr>
          <tr>
            <td rowSpan={2} className="border cell-padding">
              <Typography>Hồ Chí Minh - Miền Bắc</Typography>
              <Typography>Hà Nội - Miền Nam</Typography>
            </td>
            <td className="border cell-padding">
              Trung tâm Tỉnh, Thành phố, Thị xã
            </td>
            <td className="border cell-padding">4 ngày</td>
          </tr>
          <tr>
            <td className="border cell-padding">Huyện, xã</td>
            <td className="border cell-padding">4 - 5 ngày</td>
          </tr>
        </tbody>
      </table>
      <Box sx={{ height: '10px' }} />
    </>
  );
};

export default TransTermContent;
