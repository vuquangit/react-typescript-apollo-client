import React, { FC, ElementType } from "react";
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { get, isEqual, isEmpty } from "lodash";

import Loading from "Components/Loading";

const RedirectRoute = (props: any) => (
  <Redirect
    to={{
      pathname: "/login",
      state: { from: props.location },
    }}
  />
);

interface TPrivateRoute extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
  privatePage?: boolean

}

const PrivateRoute: FC<TPrivateRoute> = ({ component: Component, ...rest }) => {
  const profile = useSelector(
    (state = {}) => get(state, "profile", {}),
    isEqual
  );
  const isAuthenticated = !isEmpty(profile.data);
  const isLoading = get(profile, "isFetching", false);

  return !isLoading ? (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <RedirectRoute {...props} />
      }
    />
  ) : (
    <Loading />
  );
};

export default PrivateRoute;
