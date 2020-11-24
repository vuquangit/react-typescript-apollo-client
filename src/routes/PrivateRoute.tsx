import React, { FC } from 'react'
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { get, isEqual } from 'lodash'

import Loading from '@/components/Loader'

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const profile = useSelector(
    (state = {}) => get(state, 'profile', {}),
    isEqual
  )
  // const isAuthenticated = !isEmpty(profile.data);
  const isAuthenticated = true

  // const isLoading = get(profile, 'isFetching', false)
  const isLoading = false

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
