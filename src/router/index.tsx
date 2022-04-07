import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'

import BasicLayout from '../BasicLayout'
import UserLayout from '../UserLayout'
import Login from '../UserLayout/index'

// 按照 Layout 分组路由
// UserLayout 对应的路由：/user/xxx
// BasicLayout 对应的路由：/xxx
export default () => {
  return (
    <HashRouter>
      <Switch>
        {/* <Redirect exact from='/' to='/home' /> */}
        <Redirect exact from='/' to='/login' />
        <Route path="/main" component={BasicLayout} />
        <Route path="/user" component={UserLayout} />
        <Route exact path='/login' component={Login}  />
      </Switch>
    </HashRouter>
  )

}
