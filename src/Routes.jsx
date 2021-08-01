import { Switch, Route } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home/Home'
import { path } from './constants/path'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import NotFound from './pages/NotFound/NotFound'

export default function Routes() {
  return (
    <Switch>
      <Route path={path.home} exact>
        <Home />
      </Route>
      <Route path={path.login}>
        <Login />
      </Route>
      <Route path={path.register}>
        <Register />
      </Route>
      <Route path={path.notfound}>
        <NotFound />
      </Route>
    </Switch>
  )
}
