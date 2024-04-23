import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import PostList from "../components/postlist/PostList";
import { deletePost, fetchPost, fetchPosts } from "../state/PostSlice";
const Index = () => {
  const dispatch = useDispatch();

  const { records, isLoading, error } = useSelector((state) => state.Post);
  const { isLogedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = useCallback(
    (id) => {
      dispatch(deletePost(id));
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (id) => {
      dispatch(fetchPost(id));
    },
    [dispatch]
  );
  return (
    <Loading isLoading={isLoading} error={error}>
      <PostList
        records={records}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        isLogedIn={isLogedIn}
      />
    </Loading>
  );
};

export default Index;
