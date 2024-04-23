import { useFormik } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import DetailsPost from "../hooks/use-details-post";
import { editPost } from "../state/PostSlice";
import { PostSchema } from "../util/PostSchima";
import WithGuard from "../util/WithGuard";

const EditPost = () => {
  const { idTest, isLoading, error, record } = DetailsPost();
  const dispatch = useDispatch();
  const Nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: record ? record?.title : "",
      description: record ? record?.description : "",
    },
    enableReinitialize: true,
    validationSchema: PostSchema,
    onSubmit: (values) => {
      dispatch(
        editPost({
          ...record,
          title: values.title,
          description: values.description,
        })
      )
        .unwrap()
        .then(Nav("/", { replace: true }));
    },
  });
  console.log(record);
  return (
    <>
      {!idTest ? (
        <p className="err">no posting in the list with this id</p>
      ) : (
        <Form style={{ padding: "20px 0" }} onSubmit={formik.handleSubmit}>
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
              name="description"
              rows={3}
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
      )}
    </>
  );
};

export default WithGuard(EditPost);
