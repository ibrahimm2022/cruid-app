import React from "react";
import Loading from "../components/Loading";
import DetailsPost from "../hooks/use-details-post";

const Details = () => {
  const { idTest, record, error, isLoading } = DetailsPost();

  return (
    <>
      <Loading isLoading={isLoading} error={error}>
        {
          !idTest ? <p className="err">no posting in the list with this id</p> :
          <div>
          <h2>title</h2>
          <p> {record.title}</p>
          <h2>description</h2>
          <p>{record.description}</p>
        </div>}
      </Loading>
    </>
  );
};

export default Details;
