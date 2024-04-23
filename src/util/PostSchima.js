import * as Yup from "yup";

export const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "please insert at least 2 words")
    .max(20, "please insert maxmun 20 words")
    .required("Required"),
  description: Yup.string()
    .min(2, "please insert at least 2 words")
    .required("Required"),
});
