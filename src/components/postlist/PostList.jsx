import React, { memo } from "react";
import { Table } from "react-bootstrap";
import PostListItems from "./PostListItems";

const PostList = ({ isLogedIn, records, handleDelete, handleEdit }) => {

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th style={{ width: "70%" }}>title</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <PostListItems
          isLogedIn={isLogedIn}
          handleDelete={handleDelete}
          records={records}
        />
      </tbody>
    </Table>
  );
};

export default memo(PostList);
