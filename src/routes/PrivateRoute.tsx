import React, { FC } from 'react'
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom'
import { useQuery } from '@apollo/client'

import Loading from '@/components/Loader'
import { IS_LOGGED_IN } from '@/graphql/queries/isUserLoggedIn'

const RedirectRoute = (props: any) => (
  <Redirect
    to={{
      pathname: '/login',
      state: { from: props.location },
    }}
  />
)

interface TPrivateRoute extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
  privatePage?: boolean
}

const PrivateRoute: FC<TPrivateRoute> = ({ component: Component, ...rest }) => {
  const { loading: isLoading, data } = useQuery(IS_LOGGED_IN)
  const isAuthenticated = data.isLoggedIn
  console.log('isAuthenticated: ', isAuthenticated)

  return !isLoading ? (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <RedirectRoute {...props} />
        )
      }
    />
  ) : (
    <Loading size={36} />
  )
}

export default PrivateRoute
