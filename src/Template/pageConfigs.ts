import { RouteProps, RouteComponentProps } from 'react-router-dom'
import HomePage from './Pages/Home/Loadable'
import LoginPage from './Pages/Login/Loadable'
import SignupPage from './Pages/Signup/Loadable'
import GraphqlPage from './Pages/GraphqlPage/Loadable'
// import Page404 from "./Pages/Page404/Loadable";

interface IPageConfigs extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
  privatePage?: boolean
}

const pageConfigs: IPageConfigs[] = [
  {
    path: '/',
    component: HomePage,
    exact: true,
    privatePage: false,
  },
  // {
  //   path: "/404",
  //   component: Page404,
  //   exact: true,
  //   privatePage: false,
  // },
  {
    path: '/login',
    component: LoginPage,
    exact: true,
    privatePage: false,
  },
  {
    path: '/signup',
    component: SignupPage,
    exact: true,
    privatePage: false,
  },
  {
    path: '/graphql',
    component: GraphqlPage,
    exact: true,
    privatePage: true,
  },
]

export default pageConfigs
