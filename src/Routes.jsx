import { Switch, Route } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home/Home'
import { path } from './constants/path'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import NotFound from './pages/NotFound/NotFound'
import RegisterLayout from './components/Layouts/RegisterLayout/RegisterLayout'

export default function Routes() {
  return (
    <Switch>
      <Route path={path.home} exact>
        <Home />
      </Route>
      <Route path={path.login}>
        <RegisterLayout title="Đăng Nhập">
          <Login />
        </RegisterLayout>
      </Route>
      <Route path={path.register}>
        <RegisterLayout title="Đăng Ký">
          <Register />
        </RegisterLayout>
      </Route>
      <Route path={path.notfound}>
        <NotFound />
      </Route>
    </Switch>
  )
}
