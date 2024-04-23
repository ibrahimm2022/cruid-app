import { useFormik } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import DetailsPost from "../hooks/use-details-post";
import { insertPost } from "../state/PostSlice";
import { PostSchema } from "../util/PostSchima";
import WithGuard from "../util/WithGuard";

const AddPost = (props) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { error, isLoading, record } = DetailsPost();

  const formik = useFormik({
    initialValues: {
      title:  "",
      description: "",
    },
    validationSchema: PostSchema,
    onSubmit: (values) => {
      const id = Math.floor(Math.random() * 500);
      dispatch(
        insertPost({ id, title: values.title, description: values.description })
      )
        .unwrap()
        .then(() => {
          nav("/");
        });
    },
  });
  console.log(record)

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label className="title">title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.title}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="title">description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.description}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.description}
        </Form.Control.Feedback>
      </Form.Group>

      <Loading isLoading={isLoading} error={error}>
        <Button variant="primary" type="submit">
          submit
        </Button>
      </Loading>
    </Form>
  );
};

export default WithGuard(AddPost);
