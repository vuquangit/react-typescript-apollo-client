import { RouteProps, RouteComponentProps } from 'react-router-dom'
import HomePage from 'pages/Home/Loadable'
import LoginPage from 'pages/Login/Loadable'
import SignupPage from 'pages/Signup/Loadable'
import GraphqlPage from 'pages/GraphqlPage/Loadable'
import Notification from 'pages/Notification/Loadable'
import Calender from 'pages/Calendar/Loadable'

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
  {
    path: '/notification',
    component: Notification,
    exact: true,
    privatePage: false,
  },
  {
    path: '/calendar',
    component: Calender,
    exact: true,
    privatePage: false,
  },
]

export default pageConfigs
