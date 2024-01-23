import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Form from "../components/Form";
import Results from "../components/Results";
import DashBoardLayout from "../dashboard/DashBoardLayout";
import UploadInfo from "../dashboard/UploadInfo";
import ManageInfo from "../dashboard/ManageInfo";
import EditInfo from "../dashboard/EditInfo";
import PrivateRoute from "../private/PrivateRoute";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Logout from "../components/Logout";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Form />,
      },
      {
        path: "/results",
        element: <Results />,
      },
    ],
  },
  //backend
  {
    path: "/admin",
    element: <DashBoardLayout />,
    children: [
      {
        path: "/admin",
        element: <PrivateRoute />,
      },
      {
        path: "/admin/dashboard/upload",
        element: <UploadInfo />,
      },
      {
        path: "/admin/dashboard/manage",
        element: <ManageInfo />,
      },
      {
        path: "/admin/dashboard/edit/:id",
        element: <EditInfo />,
        loader: async (params) => {
          try {
            const response = await fetch(
              `http://localhost:5000/person/${params.id}`,
            );
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            return { data };
          } catch (error) {
            return { error: error.message };
          }
        },
      },
    ],
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

export default Router;
