import { RouteProps, RouteComponentProps } from "react-router-dom";
import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import ProfilePage from "./Pages/Profile";
import Page404 from "./Pages/404";

interface IPageConfigs extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
  privatePage?: boolean

}

const pageConfigs: IPageConfigs[]  = [
  {
    path: "/",
    component: HomePage,
    exact: true,
    privatePage: false,
  },
  {
    path: "/404",
    component: Page404,
    exact: true,
    privatePage: false,
  },
  {
    path: "/login",
    component: LoginPage,
    exact: true,
    privatePage: false,
  },
  {
    path: "/signup",
    component: SignupPage,
    exact: true,
    privatePage: false,
  },
  {
    path: "/profile",
    component: ProfilePage,
    exact: true,
    privatePage: true,
  },
];

export default pageConfigs;
