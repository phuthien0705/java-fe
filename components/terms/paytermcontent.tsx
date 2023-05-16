import { Typography } from '@mui/material';

const PayTermContent = () => {
  return (
    <>
      <Typography
        variant="h2"
        sx={{ display: 'flex', justifyContent: 'center', p: 2 }}
      >
        CHÍNH SÁCH BẢO MẬT THANH TOÁN
      </Typography>
      <Typography variant="h4" sx={{ p: 2 }}>
        1. Cam kết bảo mật
      </Typography>
      <Typography sx={{ paddingLeft: 2 }}>
        - Hệ thống thanh toán thẻ được cung cấp bởi các đối tác thanh toán (“Đối
        tác cổng thanh toán”) đã được cấp phép hoạt động hợp pháp tại Việt Nam.
        Theo đó, các tiêu chuẩn bảo mật thanh toán thẻ tại Boxo đảm bảo tuân thủ
        theo các tiêu chuẩn bảo mật ngành
      </Typography>
      <Typography variant="h4" sx={{ p: 2 }}>
        2. Quy định bảo mật
      </Typography>
      <Typography sx={{ paddingLeft: 2 }}>
        - Chính sách giao dịch thanh toán bằng thẻ quốc tế và thẻ nội địa
        (internet banking) đảm bảo tuân thủ các tiêu chuẩn của các Đối tác cổng
        thanh toán gồm:
      </Typography>
      <ul>
        <li>
          Thông tin tài chính của Khách hàng sẽ được bảo vệ trong suốt quá trình
          giao dịch bằng giao thức SSL (Secure Sockets Layer) bằng cách mã hóa
          tất cả các thông tin Khách hàng nhập vào.
        </li>
        <li>
          Chứng nhận tiêu chuẩn bảo mật dữ liệu thông tin thanh toán (PCI DSS)
          do Trustwave cung cấp.
        </li>
        <li>
          Mật khẩu sử dụng một lần (OTP) được gửi qua SMS để đảm bảo việc truy
          cập tài khoản được xác thực.
        </li>
        <li>Tiêu chuản mã hóa MD5 12 bit.</li>
        <li>
          Các nguyên tắc và quy định bảo mật thông tin trong ngành tài chính
          ngân hàng theo quy định của Ngân hàng Nhà nước Việt Nam.
        </li>
      </ul>
      <Typography sx={{ paddingLeft: 2 }}>
        - Chính sách bảo mật giao dịch trong thanh toán của Boxo áp dụng với
        Khách hàng:
      </Typography>
      <ul>
        <li>
          Boxo cung cấp tiện ích lưu giữ Token – chỉ lưu giữ chuối đã được mã
          hóa bởi Đối Tác Cổng Thanh Toán cung cấp cho Boxo. Boxo không trực
          tiếp lưu giữ thông tin thẻ Khách hàng. Việc bảo mật thông tin thẻ
          thanh toán Khách hàng được thực hiện bởi Đối Tác Cổng Thanh Toán đã
          được cấp phép.
        </li>
        <li>
          Đối với thẻ quốc tế: thông tin thẻ thanh toán của Khách hàng mà có khả
          năng sử dụng để xác lập giao dịch không được lưu trên hệ thống của
          Boxo. Đối Tác Cổng Thanh Toán sẽ lưu trữ và bảo mật.
        </li>
        <li>
          Đối với thẻ nội địa (internet banking), Boxo chỉ lưu trữ mã đơn hàng,
          mã giao dịch và tên Ngân hàng.
        </li>
        <li>
          Trong trường hợp nếu Khách hàng thông báo/khiếu nại tình trạng thông
          tin thanh toán của Khách hàng khi mua hàng qua website/ứng dụng của
          Boxo bị thay đổi, xóa, hủy, sao chép, tiết lộ, di chuyển trái phép
          hoặc bị chiếm đoạt gây thiệt hại cho Khách hàng thì Boxo sẽ nỗ lực
          phối hợp với Đối Tác Cổng Thanh Toán để tìm hiểu vấn đề và hỗ trợ xử
          lý cho đến hoàn tất vấn đề Khách hàng đang đang gặp phải.
        </li>
      </ul>
      <Typography sx={{ p: 2 }}>
        Boxo cam kết đảm bảo thực hiện nghiêm túc các biện pháp bảo mật cần
        thiết cho mọi hoạt động thanh toán thực hiện qua website/ứng dụng của
        Boxo.
      </Typography>
    </>
  );
};

export default PayTermContent;
