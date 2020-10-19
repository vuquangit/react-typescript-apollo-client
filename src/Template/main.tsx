import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import PrivateRoute from 'Container/PrivateRoute'
import pageConfigs from './pageConfigs'
import Page404 from 'Template/Pages/404'

const Main = () => {
  const _renderPage = () =>
    pageConfigs.map((route, index) =>
      route.privatePage ? (
        <PrivateRoute {...route} key={index} />
      ) : (
        <Route {...route} key={index} />
      )
    )

  return (
    <BrowserRouter>
      <Switch>
        {_renderPage()}
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  )
}

export default Main
