import { SearchProps } from "src/interfaces";
import { getPostBySearch } from "src/reducers/postSlice";
import { useAppDispatch } from "./useTypeSelector";

export const usePostLoader = () => {
  const dispatch = useAppDispatch();

  const fetchPostData = async (searchQuery: SearchProps) => {
    await dispatch(getPostBySearch({ searchQuery }))
  }

  return { fetchPostData };
}