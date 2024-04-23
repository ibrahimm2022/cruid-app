import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Err404 from "./pages/Error/Err404";
import Index from "./pages/Index";
import RootLayout from "./pages/RootLayout";
import reportWebVitals from "./reportWebVitals";
import store from "./state";

const AddPost = React.lazy(() => import("./pages/AddPost"));
const Details = React.lazy(() => import("./pages/Details"));
const EditPost = React.lazy(() => import("./pages/EditPost"));

const loader = ({ params }) => {
  if (isNaN(params.id)) {
    throw new Response("Bad Request", {
      statusText: "Please make sure to insert correct id ",
      status: 400,
    });
  }
  return null;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Err404 />,
    children: [
      { index: true, element: <Index /> },
      { path: "user", element: <Index /> },
      {
        path: "user/add",
        element: (
          <Suspense fallback="please wait ....">
            <AddPost />
          </Suspense>
        ),
      },
      {
        path: "user/:id/details",
        element: (
          <Suspense fallback="please wait ....">
            <Details />
          </Suspense>
        ),
        loader: loader,
      },
      {
        path: "user/:id/edit",
        element: (
          <Suspense fallback="please wait ....">
            <EditPost />
          </Suspense>
        ),
        loader: loader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
