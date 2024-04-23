import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPost, fetchPosts } from "../state/PostSlice";

const DetailsPost = () => {

  const { id: detailId } = useParams();

  const dispatch = useDispatch();
  
  const { records, record, error, isLoading } = useSelector(
    (state) => state.Post
  );
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchPost(detailId));
  }, [dispatch, detailId]);

  const idTest = records.some((el) => {
    return el.id === parseInt(detailId);
  });

  return { idTest, record, error, isLoading };
};

export default DetailsPost;
