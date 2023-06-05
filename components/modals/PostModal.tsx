import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  useTheme,
  Alert,
  Button,
  styled,
  Skeleton,
} from '@mui/material';
import { useQueryClient } from 'react-query';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomModal from './CustomModal';
import objectEquals from '../../common/objectEquals';
import ConfirmModal from './ConfirmModal';
import { toggleSnackbar } from '../../store/snackbarReducer';
import { IModal } from '@/interfaces/compontents/modal.interface';
import { Editor } from '@tinymce/tinymce-react';
import { resizeImage } from '@/utils/fileUtils';
import { detectWrapper } from '@/common/detectWrapper';
import { detectLink } from '@/common/detectLink';
import { postCreatePost, postUpdatePost } from '@/apis/post.api';
import { IEachPostData } from '@/interfaces/post.interface';
import { POST } from '@/constants/queryKeyName';

const BlogEditorWrapper = styled('div')({
  '.mce-content-body': { outline: 'none' },
  width: '100%',
  height: '100%',
  border: 'solid 1px #e2e2e2',
  overflowY: 'auto',
  minHeight: '168px',
  borderRadius: '0.5rem',
});

const PostModal: FC<IModal> = ({ handleClose, open, currentProduct }) => {
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState<any>(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editorLoading, setEditorLoading] = useState(true);
  const queryClient = useQueryClient();
  const data = currentProduct?.data as IEachPostData | null;

  const initialValues = {
    title: data?.title ?? '',
    content: data?.content ?? '',
    submit: null,
  };
  const handleExit = (currentValues: any) => {
    if (objectEquals(initialValues, currentValues)) {
      handleClose();
    } else {
      setShowConfirm(true);
    }
  };
  const toast = ({ type, message }: { type: string; message: string }) => {
    dispatch(toggleSnackbar({ open: true, message, type }));
  };
  return open ? (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          title: Yup.string()
            .max(255, 'Tên bài viết tối đa 255 ký tự')
            .required('Tên bài viết là bắt buộc'),
          description: Yup.string().max(255, 'Mô tả bài viết tối đa 255 ký tự'),
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          try {
            if (data === null) {
              await postCreatePost({
                title: values.title,
                content: values.content,
              });
            } else {
              await postUpdatePost(
                {
                  title: values.title,
                  content: values.content,
                },
                data._id
              );
            }
            setStatus({ success: true });
            setSubmitting(false);
            toast({
              type: 'success',
              message: `${data === null ? 'Tạo' : 'Cập nhật'} thành công`,
            });
            queryClient.refetchQueries([POST]);
            setTimeout(() => {
              handleClose();
            }, 1000);
          } catch (err) {
            console.error(err);
            toast({
              type: 'error',
              message: `Xảy ra lỗi trong quá trình ${
                data === null ? 'tạo' : 'cập nhật'
              } bài viết`,
            });
            setStatus({ success: false });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          setValues,
        }) => (
          <CustomModal
            open={open}
            handleClose={() => {
              handleExit(values);
            }}
            title={data === null ? 'Tạo bài viết' : 'Chỉnh sửa bài viết'}
            maxWidth="md"
          >
            <form noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                error={Boolean(touched.title && errors.title)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-title">
                  Tên bài viết
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-title"
                  type="text"
                  value={values.title}
                  name="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Tên bài viết"
                  inputProps={{}}
                />
                {touched.title && errors.title && (
                  <FormHelperText error id="standard-weight-helper-text-title">
                    {errors.title as any}
                  </FormHelperText>
                )}
              </FormControl>

              {/* editor */}
              {editorLoading && (
                <Skeleton variant="rounded" width={'100%'} height={160} />
              )}
              <BlogEditorWrapper className={`${editorLoading && 'hidden'}`}>
                <Editor
                  onInit={() => setEditorLoading(false)}
                  apiKey="80ke2uup4721bwhiabqhp9ylmtblpcb8vpibgkpkuajdu52h"
                  value={values.content as string}
                  onEditorChange={(newValue) => {
                    setValues((prev) => ({ ...prev, content: newValue }));
                  }}
                  init={{
                    statusbar: false,
                    plugins: 'autoresize autolink link lists image',
                    toolbar:
                      'bold italic strikethrough image numlist bullist blockquote outdent indent alignleft aligncenter alignright alignjustify h1 h2 h3 blocks',
                    toolbar_mode: 'floating',
                    skin: 'borderless',
                    toolbar_sticky: true,
                    menubar: false,
                    placeholder: 'Chia sẻ nội dung bài viết...',
                    autoresize_bottom_margin: 0,
                    autoresize_min_height: 36,
                    autoresize_max_height: 1000,
                    content_style: `a {
                                        color: #3CACDD;
                                    } 
                                    img {
                                        max-height: 288px; 
                                        max-width: 596px; 
                                        width: auto; 
                                        height: auto; 
                                        object-fit: contain;
                                    }
                                    p {
                                        line-height: 140%;
                                        margin-top: 0;
                                        margin-bottom: 1.4em;
                                    }
                                    p:last-child {
                                        margin-bottom: 0;
                                    }`,
                    paste_data_images: true,
                    paste_remove_spans: true,
                    file_browser_callback: 'image',
                    relative_urls: false,
                    remove_script_host: false,
                    file_picker_callback: function (callback, _value, _meta) {
                      const input = document.createElement('input');
                      input.setAttribute('type', 'file');
                      input.setAttribute('accept', 'image/*');
                      input.click();
                      input.onchange = async function () {
                        try {
                          const file = input.files?.item(0) as File; //single file
                          const url = await resizeImage(file);
                          callback(url, { alt: file?.name });
                        } catch (err) {
                          console.log(err);
                        }
                      };
                    },
                    paste_preprocess: function (plugin, args) {
                      // detect wrapper
                      if (detectWrapper(args.content)) {
                        args.content = args.content.slice(3, -4);
                      }
                      // detect link
                      args.content = detectLink(args.content);
                    },
                  }}
                />
              </BlogEditorWrapper>

              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}

              <Box sx={{ mt: 2 }}>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {data === null ? 'Tạo' : 'Lưu'}
                </Button>
                {!!showAlert && (
                  <Alert
                    sx={{ marginTop: 2 }}
                    severity={showAlert?.type.toString()}
                    color={
                      showAlert?.type.toString() === 'success'
                        ? 'info'
                        : showAlert?.type.toString()
                    }
                    onClose={() => setShowAlert(null)}
                  >
                    {showAlert?.content}
                  </Alert>
                )}
              </Box>
            </form>
          </CustomModal>
        )}
      </Formik>
      <ConfirmModal
        open={showConfirm}
        handleClose={() => {
          setShowConfirm(false);
        }}
        handleConfirm={() => {
          setShowConfirm(false);
          handleClose();
        }}
      />
    </>
  ) : null;
};

export default PostModal;
