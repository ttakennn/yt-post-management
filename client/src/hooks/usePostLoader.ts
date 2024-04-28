import { SearchProps } from "src/interfaces";
import { getPostBySearch } from "src/reducers/postSlice";
import { useAppDispatch } from "./useTypeSelector";
import { useAxios } from "./useAxios";

export const usePostLoader = () => {
  const dispatch = useAppDispatch();
  const axiosInstance = useAxios();

  const fetchPostData = async (searchQuery: SearchProps) => {
    await dispatch(getPostBySearch({ searchQuery, postProps: { axiosInstance } }))
  }

  return { fetchPostData };
}