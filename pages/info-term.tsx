import { Typography, Divider } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import MainCard from '@/components/cards/MainCard';
import ProductLayout from '@/layout/ProductLayot';

const InfoTerm = () => {
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
          title={
            <Typography variant="h3">Chính sách bảo mật thông tin</Typography>
          }
        >
          <Typography
            variant="h5"
            style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
          >
            <strong>BOXO</strong> mong muốn đem lại một tiện ích mua hàng trực
            tuyến tin cậy, tiết kiệm và thấu hiểu người dùng. Chúng tôi nhận
            thấy khách hàng sử dụng website <strong>BOXO</strong> để mua sắm
            nhưng không phải ai cũng mong muốn chia sẻ thông tin cá nhân của
            mình.
          </Typography>
          <br />
          <Typography
            variant="h5"
            style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
          >
            Chúng tôi, doanh nghiệp <strong>BOXO</strong>, tôn trọng quyền riêng
            tư của khách hàng và cam kết bảo mật thông tin cá nhân của khách
            hàng khi khách hàng tin vào chúng tôi cung cấp thông tin cá nhân của
            khách hàng cho chúng tôi khi mua sắm tại website và ứng dụng{' '}
            <strong>BOXO</strong>. Đây là nguyên tắc khi tiếp cận quyền riêng
            tư, thông tin cá nhân của doanh nghiệp.
          </Typography>
          <br />
          <Typography
            variant="h5"
            style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
          >
            Chính Sách Bảo Mật Thông Tin này bao gồm các nội dung:
          </Typography>
          <ol
            style={{
              color: 'black',
              fontSize: matches ? 16 : 18,
              lineHeight: 2,
            }}
          >
            <li>Sự chấp thuận</li>
            <li>Mục đích</li>
            <li>Phạm vi</li>
            <li>Thời gian lưu trữ</li>
            <li>Cam kết không chia sẻ thông tin khách hàng</li>
            <li>An toàn dữ liệu</li>
            <li>Quyền lợi của khách hàng đối với thông tin cá nhân</li>
            <li>Phản hồi về chính sách</li>
            <li>Tuyên bố hiệu lực</li>
          </ol>
          <ol
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: matches ? 16 : 18,
              lineHeight: 1.5,
            }}
          >
            <li>Sự chấp thuận</li>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Bằng việc trao cho chúng tôi thông tin cá nhân của khách hàng,{' '}
              <strong>BOXO</strong> đồng ý rằng thông tin cá nhân của khách hàng
              sẽ được thu thập, sử dụng như được nêu trong Chính Sách này. Nếu
              khách hàng không đồng ý với Chính Sách này, khách hàng dừng cung
              cấp cho chúng tôi bất cứ thông tin cá nhân nào và/hoặc sử dụng các
              quyền như được nêu tại Mục 7 dưới đây.
              <br /> <br />
              Chúng tôi bảo lưu quyền sửa đổi, bổ sung nhằm hoàn thiện đối với
              Chính Sách này vào bất kỳ thời điểm nào. Chúng tôi khuyến khích
              khách hàng thường xuyên xem lại Chính Sách Bảo Mật Thông Tin này
              để có được những cập nhật mới nhất đảm bảo khách hàng biết và thực
              hiện quyền quản lý thông tin cá nhân của mình.
            </Typography>
            <br />
            <li>Mục đích</li>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Chúng tôi thu thập thông tin cá nhân chỉ cần thiết nhằm phục vụ
              cho các mục đích:
            </Typography>
            <br />
            <ul style={{ fontWeight: 'normal' }}>
              <li>
                Đơn hàng: để xử lý các vấn đề liên quan đến đơn đặt hàng của
                bạn;
              </li>
              <li>
                {' '}
                Duy trì tài khoản: để tạo và duy trình tài khoản của bạn với
                chúng tôi, bao gồm cả các chương trình khách hàng thân thiết
                hoặc các chương trình thưởng đi kèm với tài khoản của bạn;
              </li>
              <li>
                Dịch vụ người tiêu dùng, dịch vụ chăm sóc khách hàng: bao gồm
                các phản hồi cho các yêu cầu, khiếu nại và phản hồi của bạn;
              </li>
              <li>
                Cá nhân hóa: Chúng tôi có thể tổ hợp dữ liệu được thu thập để có
                một cái nhìn hoàn chỉnh hơn về một người tiêu dùng và từ đó cho
                phép chúng tôi phục vụ tốt hơn với sự cá nhân hóa mạnh hơn ở các
                khía cạnh, bao gồm nhưng không giới hạn: &#40;i&#41; để cải
                thiện và cá nhân hóa trải nghiệm của bạn trên BOXO &#40;ii&#41;
                để cải thiện các tiện ích, dịch vụ, điều chỉnh chúng phù hợp với
                các nhu cầu được cá thể hóa và đi đến những ý tưởng dịch vụ mới
                &#40;iii&#41; để phục vụ bạn với những giới thiệu, quảng cáo
                được điều chỉnh phù hợp với sự quan tâm của bạn.
              </li>
              <li>
                An ninh: cho các mục đích ngăn ngừa các hoạt động phá hủy tài
                khoản người dùng của khách hàng hoặc các hoạt động giả mạo khách
                hàng.{' '}
              </li>
              <li>
                {' '}
                Theo yêu cầu của cơ quan chức năng: tùy quy định của pháp luật
                vào từng thời điểm, chúng tôi có thể thu thập, lưu trữ và cung
                cấp theo yêu cầu của cơ quan nhà nước có thẩm quyền.
              </li>
            </ul>
            <br />
            <li>Phạm vi</li>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Chúng tôi thu thập thông tin cá nhân của bạn khi: Bạn trực tiếp
              cung cấp cho chúng tôi. Đó là các thông tin cá nhân bạn cung cấp
              cho chúng tôi được thực hiện chủ yếu trên hệ sinh thái{' '}
              <strong>BOXO</strong>
              &#40;ứng dụng, website <strong>BOXO</strong>&#41; bao gồm: họ tên,
              địa chỉ thư điện tử email, số điện thoại, địa chỉ, thông tin đăng
              nhập tài khoản bao gồm thông tin bất kỳ cần thiết để thiết lập tài
              khoản ví dụ như tên đăng nhập, mật khẩu đăng nhập, ID/địa chỉ đăng
              nhập và câu hỏi/trả lời an ninh. Bạn tương tác với chúng tôi.
              <br /> <br />
              Chúng tôi sử dụng cookies và công nghệ theo dấu khác để thu thập
              một số thông tin khi bạn tương tác trên website, ứng dụng. Từ
              những nguồn hợp pháp khác. Chúng tôi có thể sẽ thu thập thông tin
              cá nhân từ các nguồn hợp pháp khác.
            </Typography>
            <br />
            <li>Thời gian lưu trữ</li>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Thông tin cá nhân của khách hàng sẽ được lưu trữ cho đến khi khách
              hàng có yêu cầu hủy bỏ hoặc khách hàng tự đăng nhập và thực hiện
              hủy bỏ. Trong mọi trường hợp thông tin cá nhân của khách hàng sẽ
              được bảo mật trên máy chủ của <strong>BOXO</strong>.
            </Typography>
            <br />
            <li>Cam kết không chia sẻ thông tin khách hàng</li>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Chúng tôi sẽ không cung cấp thông tin cá nhân của bạn cho bất kỳ
              bên thứ ba nào, trừ một số hoạt động cần thiết dưới đây: <br />{' '}
              <br />
              Các đối tác là bên cung cấp dịch vụ cho chúng tôi liên quan đến
              thực hiện đơn hàng và chỉ giới hạn trong phạm vi thông tin cần
              thiết cũng như áp dụng các quy định đảm bảo an ninh, bảo mật các
              thông tin cá nhân. <br /> <br />
              Chúng tôi có thể sử dụng dịch vụ từ một nhà cung cấp dịch vụ là
              bên thứ ba để thực hiện một số hoạt động liên quan đến website,
              ứng dụng <strong>BOXO</strong> và khi đó bên thứ ba này có thể
              truy cập hoặc xử lý các thông tin cá nhân trong quá trình cung cấp
              các dịch vụ đó. <br /> <br />
              Chúng tôi yêu cầu các bên thứ ba này tuân thủ mọi luật lệ về bảo
              vệ thông tin cá nhân liên quan và các yêu cầu về an ninh liên quan
              đến thông tin cá nhân. Các chương trình có tính liên kết, đồng
              thực hiện, thuê ngoài cho các mục địch được nêu tại Mục 2 và luôn
              áp dụng các yêu cầu bảo mật thông tin cá nhân. <br /> <br />
              Yêu cầu pháp lý: Chúng tôi có thể tiết lộ các thông tin cá nhân
              nếu điều đó do luật pháp yêu cầu và việc tiết lộ như vậy là cần
              thiết một cách hợp lý để tuân thủ các quy trình pháp lý. Chuyển
              giao kinh doanh &#40;nếu có&#41;: trong trường hợp sáp nhập, hợp
              nhất toàn bộ hoặc một phần với công ty khác, người mua sẽ có quyền
              truy cập thông tin được chúng tôi lưu trữ, duy trì trong đó bao
              gồm cả thông tin cá nhân.
            </Typography>{' '}
            <br />
            <li>An toàn dữ liệu</li> <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Chúng tôi luôn nỗ lực để giữ an toàn thông tin cá nhân của khách
              hàng, chúng tôi đã và đang thực hiện nhiều biện pháp an toàn, bao
              gồm: <br /> <br />
              Bảo đảm an toàn trong môi trường vận hành: chúng tôi lưu trữ không
              tin cá nhân khách hàng trong môi trường vận hành an toàn và chỉ có
              nhân viên, đại diện và nhà cung cấp dịch vụ có thể truy cập trên
              cơ sở cần phải biết. <br /> <br />
              Chúng tôi tuân theo các tiêu chuẩn ngành, pháp luật trong việc bảo
              mật thông tin cá nhân khách hàng.
              <br /> <br />
              Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn
              đến mất mát dữ liệu cá nhân khách hàng, chúng tôi sẽ có trách
              nhiệm thông báo vụ việc cho cơ quan chức năng để điều tra xử lý
              kịp thời và thông báo cho khách hàng được biết. <br /> <br />
              Các thông tin thanh toán: được bảo mật theo tiêu chuẩn ngành.
            </Typography>
            <br />
            <li>Quyền lợi của khách hàng đối với thông tin cá nhân</li>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Khách hàng có quyền cung cấp thông tin cá nhân cho chúng tôi và có
              thể thay đổi quyết định đó vào bất cứ lúc nào. Khách hàng có quyền
              tự kiểm tra, cập nhật, điều chỉnh thông tin cá nhân của mình bằng
              cách đăng nhập vào tài khoản và chỉnh sửa thông tin cá nhân hoặc
              yêu cầu chúng tôi thực hiện việc này.
            </Typography>
            <br />
            <li>Phản hồi về chính sách</li>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Nếu bạn có câu hỏi hoặc bất kỳ thắc mắc nào về Chính Sách này hoặc
              thực tế việc thu thập, quản lý thông tin cá nhân của chúng tôi,
              xin vui lòng liên hệ với chúng tôi bằng cách: Gọi điện thoại đến
              hotline: 0914139767 <br />
              Gửi thư điện tử đến địa chỉ email: 20520584@gm.uit.edu.vn
            </Typography>
            <br />
            <li>Đơn vị thu thập và quản lý thông tin</li>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Doanh nghiệp tư nhân kinh doanh, xuất - nhập khẩu sách{' '}
              <strong>BOXO</strong>. Thành lập và hoạt động theo Giấy chứng nhận
              đăng ký doanh nghiệp số: 12345678910 do Sở Kế hoạch và Đầu tư
              thành phố Thủ Đức cấp, đăng ký lần đầu ngày 30 tháng 11 năm 2022.{' '}
            </Typography>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Trụ sở làm việc: KTX Khu A, ĐHQG Tp.HCM, khu phố 6, phường Đông
              Hòa, thành phố Dĩ An, Bình Dương
            </Typography>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Địa chỉ liên hệ: Đại học Công nghệ Thông Tin, ĐHQG - Tp.HCM,
              phường Linh Trung, thành phố Thủ Đức, thành phố Hồ Chí Minh.
            </Typography>
            <br />
            <li>Tuyên bố hiệu lực</li>
            <br />
            <Typography
              variant="h5"
              style={{ fontSize: matches ? 16 : 18, lineHeight: 1.5 }}
            >
              Chính sách bảo mật thông tin này chính thức có hiệu lực vào ngày
              công bố chính sách &#40;15/11/2022&#41;.
            </Typography>
            <br />
          </ol>
        </MainCard>
      </ProductLayout>
    </>
  );
};
export default InfoTerm;
