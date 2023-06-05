import { Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import MainCard from '@/components/cards/MainCard';
import ProductLayout from '@/layout/ProductLayot';

const PolicyPage = () => {
  const matches = useMediaQuery('(min-width:600px)');
  return (
    <>
      <ProductLayout>
        <style jsx>
          {`
            table,
            th,
            td {
              border: 1px solid black;
              border-collapse: collapse;
            }
            td {
              text-align: center;
            }
            Typography {
              line-height: 2;
            }
          `}
        </style>
        <MainCard
          title={<Typography variant="h3">Chính sách đổi trả</Typography>}
        >
          <Typography
            variant="h5"
            style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
          >
            Chúng tôi luôn trân trọng sự tin tưởng và ủng hộ của quý khách hàng
            khi trải nghiệm mua hàng tại <strong>BOXO</strong>. Do đó chúng tôi
            luôn cố gắng hoàn thiện dịch vụ tốt nhất để phục vụ mọi nhu cầu mua
            sắm của quý khách.
            <br /> <br />
            <strong>BOXO</strong> chúng tôi luôn luôn cam kết tất cả các sản
            phẩm bán tại <strong>BOXO</strong> 100% là những sản phẩm chất lượng
            và xuất xứ nguồn gốc rõ ràng, hợp pháp cũng như an toàn cho người
            tiêu dùng. Để việc mua sắm của quý khách tại <strong>BOXO</strong>{' '}
            là trải nghiệm dịch vụ thân thiện, chúng tôi hy vọng quý khách sẽ
            kiểm tra kỹ các nội dung sau trước khi nhận hàng: <br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;Thông tin sản phẩm: tên sản phẩm và chất
            lượng sản phẩm. <br /> <br />
            &nbsp;&nbsp;&nbsp;&nbsp;Số lượng sản phẩm.
            <br /> <br />
            Trong trường hợp hiếm hoi sản phẩm quý khách nhận được có khiếm
            khuyết, hư hỏng hoặc không như mô tả, <strong>BOXO</strong> cam kết
            bảo vệ khách hàng bằng chính sách đổi trả/ hoàn tiền trên tinh thần
            bảo vệ quyền lợi người tiêu dùng nhằm cam kết với quý khách về chất
            lượng sản phẩm và dịch vụ của chúng tôi. Khi quý khách hàng có hàng
            hóa mua tại <strong>BOXO</strong> cần đổi/trả/bảo hành/hoàn tiền,
            xin quý khách hàng liên hệ với chúng tôi qua hotline 190000000 hoặc
            truy cập boxo.com/policy để tìm hiểu thêm về chính sách đổi/trả:
          </Typography>
          <br />
          <ol
            style={{
              color: 'black',
              fontSize: matches ? 16 : 18,
              lineHeight: 1.5,
              fontWeight: 'bold',
            }}
          >
            <li>Thời gian áp dụng đổi trả</li>
          </ol>
          <table
            cellSpacing={1}
            cellPadding={1}
            width={'90%'}
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          >
            <tbody>
              <tr>
                <td>
                  <p>&nbsp;</p>
                </td>
                <td>
                  <p>
                    <strong>KỂ TỪ KHI </strong>
                    <strong>BOXO</strong>
                    <strong> GIAO H&Agrave;NG TH&Agrave;NH C&Ocirc;NG</strong>
                  </p>
                </td>
                <td>
                  <p>
                    <strong>
                      SẢN PHẨM LỖI
                      <br /> (do nh&agrave; cung cấp)
                    </strong>
                  </p>
                </td>
                <td>
                  <p>
                    <strong>SẢN PHẨM KH&Ocirc;NG LỖI&nbsp;(*)</strong>
                  </p>
                </td>
                <td>
                  <p>
                    <strong>SẢN PHẨM LỖI DO NGƯỜI SỬ DỤNG</strong>
                  </p>
                </td>
              </tr>
              <tr>
                <td rowSpan={4}>
                  <p>Sản phẩm sách</p>
                </td>
                <td rowSpan={2}>
                  <p>7 ng&agrave;y đầu ti&ecirc;n</p>
                </td>
                <td>
                  <p>Đổi mới</p>
                </td>
                <td rowSpan={3}>
                  <p>Trả h&agrave;ng kh&ocirc;ng thu ph&iacute;</p>
                </td>
                <td rowSpan={4}>
                  <p>
                    Bảo h&agrave;nh hoặc sửa chữa c&oacute; thu ph&iacute; theo
                    quy định của nh&agrave; cung cấp.
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Trả kh&ocirc;ng thu ph&iacute;</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>8 - 30 ng&agrave;y</p>
                </td>
                <td>
                  <p>Bảo h&agrave;nh</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>30 ng&agrave;y trở đi</p>
                </td>
                <td>
                  <p>Bảo h&agrave;nh</p>
                </td>
                <td>
                  <p>Kh&ocirc;ng hỗ trợ đổi/ trả</p>
                </td>
              </tr>
              <tr>
                <td rowSpan={3}>
                  <p>Voucher/ E-voucher</p>
                </td>
                <td rowSpan={2}>
                  <p>30 ng&agrave;y đầu ti&ecirc;n</p>
                </td>
                <td>
                  <p>Đổi mới</p>
                </td>
                <td rowSpan={2}>
                  <p>Kh&ocirc;ng hỗ trợ đổi/ trả</p>
                </td>
                <td rowSpan={2}>
                  <p>Kh&ocirc;ng hỗ trợ đổi/ trả</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Trả h&agrave;ng kh&ocirc;ng thu ph&iacute;</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>30 ng&agrave;y trở đi</p>
                </td>
                <td colSpan={3}>
                  <p>Kh&ocirc;ng hỗ trợ đổi trả</p>
                </td>
              </tr>
              <tr>
                <td rowSpan={3}>
                  <p>
                    Đối với c&aacute;c ng&agrave;nh h&agrave;ng c&ograve;n lại
                  </p>
                </td>
                <td rowSpan={2}>
                  <p>30 ng&agrave;y đầu ti&ecirc;n</p>
                </td>
                <td>
                  <p>Đổi mới</p>
                </td>
                <td rowSpan={2}>
                  <p>Trả h&agrave;ng kh&ocirc;ng thu ph&iacute;</p>
                </td>
                <td rowSpan={3}>
                  <p>Kh&ocirc;ng hỗ trợ đổi/ trả</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Trả kh&ocirc;ng thu ph&iacute;</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>30 ng&agrave;y trở đi</p>
                </td>
                <td colSpan={2}>
                  <p>Kh&ocirc;ng hỗ trợ đổi/ trả</p>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <Typography
            variant="h5"
            style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
          >
            BOXO sẽ tiếp nhận thông tin yêu cầu đổi trả của quý khách trong vòng
            3 ngày kể từ khi quý khách nhận hàng thành công. Sau khi BOXO xác
            nhận mail tiếp nhận yêu cầu kiểm tra xử lý, BOXO sẽ liên hệ đến quý
            khách để xác nhận thông tin hoặc nhờ bổ sung thông tin &#40;nếu
            có&#41;. <br /> <br />
            Trường hợp không liên hệ được BOXO rất tiếc xin được phép từ chối xử
            lý yêu cầu. Thời gian BOXO liên hệ trong giờ hành chính tối đa 3 lần
            trong vòng 7 ngày sau khi nhận thông tin yêu cầu.
            <br /> <br />
            Chúng tôi sẽ kiểm tra các trường hợp trên và giải quyết cho quý
            khách tối đa trong 30 ngày làm việc kể từ khi quý khách nhận được
            hàng, quá thời hạn trên rất tiếc chúng tôi không giải quyết khiếu
            nại.
          </Typography>
          <ol
            start={2}
            style={{
              color: 'black',
              fontSize: matches ? 16 : 18,
              lineHeight: 1.5,
              fontWeight: 'bold',
            }}
          >
            <li>Các trường hợp yêu cầu đổi trả</li>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              1&#41;. Lỗi kỹ thuật của sản phẩm - do nhà cung cấp &#40;sách
              thiếu trang, sút gáy, trùng nội dung,..&#41; <br />
              <br />
              2&#41;. Giao nhầm/ giao thiếu &#40;thiếu sản phẩm đã đặt, thiếu
              phụ kiện, thiếu quà tặng kèm theo&#41; <br />
              <br />
              3&#41;. Chất lượng hàng hóa kém, hư hại do vận chuyển. <br />
              <br />
              4&#41;. Hình thức sản phẩm không giống mô tả ban đầu. <br />
              <br />
              5&#41;. Quý khách đặt nhầm/ không còn nhu cầu &#40;*&#41;
              <br />
              <br />
              &#40;*&#41; Đối với các sản phẩm không bị lỗi, chỉ áp dụng khi sản
              phẩm đáp ứng đủ điều kiện sau: <br />
              <br />
              Quý khách có thể trả lại sản phẩm đã mua tại BOXO trong vòng 30
              ngày kể từ khi nhận hàng với đa số sản phẩm khi thỏa mãn các điều
              kiện sau: <br />
              <br />
              Sản phẩm không có dấu hiệu đã qua sử dụng, còn nguyên tem, mác hay
              niêm phong của nhà sản xuất.
              <br />
              <br />
              Sản phẩm còn đầy đủ phụ kiện hoặc phiếu bảo hành cùng quà tặng kèm
              theo &#40;nếu có&#41;.
            </Typography>
          </ol>
          <ol
            start={3}
            style={{
              color: 'black',
              fontSize: matches ? 16 : 18,
              lineHeight: 1.5,
              fontWeight: 'bold',
            }}
          >
            <li>Điều kiện đổi trả</li>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              <strong>BOXO</strong> hỗ trợ đổi/ trả sản phẩm cho quý khách nếu:
              <br />
              <br />
              &emsp;Sản phẩm còn nguyên bao bì như hiện trạng ban đầu. <br />
              <br />
              &emsp;Sản phầm còn đầy đủ phụ kiện, quà tặng khuyến mãi kèm theo.{' '}
              <br />
              <br />
              &emsp;Hóa đơn GTGT (nếu có). <br />
              <br />
              &emsp;Cung cấp đầy đủ thông tin đối chứng theo yêu cầu (điều 4).
            </Typography>
          </ol>{' '}
          <ol
            start={4}
            style={{
              color: 'black',
              fontSize: matches ? 16 : 18,
              lineHeight: 1.5,
              fontWeight: 'bold',
            }}
          >
            <li>Quy trình đổi trả</li>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Quý khách vui lòng thông tin đơn hàng cần hỗ trợ đổi trả theo
              Hotline 1900000000 hoặc email về địa chỉ: cskh@boxo.com với tiêu
              đề &quot;Đổi Trả Đơn Hàng - Mã đơn hàng&quot;.
              <br />
              <br />
              Quý khách cần cung cấp đính kèm thêm các bằng chứng để đối chiếu/
              khiếu nại sau: <br />
              <br />
              &emsp;+ Video clip mở kiện hàng từ lúc bắt đầu khui ngoại quan đến
              kiểm tra sản phẩm bên trong thùng hàng. <br />
              <br />
              &emsp;+ Hình chụp tem kiện hàng có thể hiện mã đơn hàng. <br />
              <br />
              &emsp;+ Hình chụp tình trạng ngoại quan &#40;băng keo, seal, hình
              dạng thùng hàng, bao bì&#41;, đặc biệt các vị trí nghi ngờ có tác
              động đến sản phẩm &#40;móp méo, &emsp;ướt, rách...&#41; <br />
              <br />
              &emsp;+ Hình chụp tình trạng sản phẩm bên trong, nêu rõ lỗi kỹ
              thuật nếu có. <br />
              <br />
              Để đảm bảo quyền lợi khách hàng và để BOXO có cơ sở làm việc với
              các bộ phận liên quan, tất cả yêu cầu đổi/ trả/ bảo hành quý khách
              cần cung cấp hình ảnh/ clip sản phẩm lỗi. Quá thời gian đổi/ trả
              sản phẩm nếu chưa nhận được đủ hình ảnh/ clip từ quý khách, BOXO
              xin phép từ chối hỗ trợ.
            </Typography>
          </ol>
          <br />
          <Typography
            variant="h5"
            style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}
          >
            Nếu cần hỗ trợ thêm bất kì thông tin nào, BOXO xin mời quý khách
            liên hệ trực tiếp qua hotline 190000000 để được hỗ trợ nhanh chóng.
          </Typography>
        </MainCard>
      </ProductLayout>
    </>
  );
};
export default PolicyPage;
