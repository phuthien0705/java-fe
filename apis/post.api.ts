import httpRequest from '@/services/httpRequest';
import { IPaginationResponse } from '@/interfaces/general.interface';
import { IEachPostData } from '@/interfaces/post.interface';
import { QueryFunctionContext } from 'react-query';

/** Querykey format: [key] */
export const getListPost = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return httpRequest.get<IPaginationResponse<IEachPostData>>(
    `/posts?page=${page}&limit=${limit}`
  );
};

export const postCreatePost = (data: { content: string; title: string }) => {
  return httpRequest.post(`/posts`, data);
};

export const postUpdatePost = (
  data: { content: string; title: string },
  postId: string
) => {
  return httpRequest.post(`/posts?postId=${postId}`, data);
};

export const deletePost = (postId: string) => {
  return httpRequest.delete(`/posts/${postId}`);
};
/** queryKey: [key, postId] */
export const getPostDetail = ({ queryKey }: QueryFunctionContext) => {
  return httpRequest.get<IEachPostData>(`/posts/${queryKey[1]}`);
};
