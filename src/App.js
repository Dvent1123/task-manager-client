import React from 'react'
import {BrowserRouter, BrowserRouter as Switch} from 'react-router-dom'
import {Home} from './components/Main/Home'
// import Tasks from './components/Main/Tasks'
import Users from './components/Main/Users'
import Settings from './components/Main/Settings'
import Landing from './components/LandingPage/Landing'
import Register from './components/LandingPage/Register'
import Login from './components/LandingPage/Login'
import useToken from './utils/useToken'
import PrivateRoute from './utils/PrivateRoute'
import PublicRoute from './utils/PublicRoute'
import {SocketContext, socket} from './services/socketService'

const App = () => {
  const { token } = useToken()

  return (
    <BrowserRouter>
      <Switch>
        <SocketContext.Provider value={socket}>
          <PrivateRoute component={Home} token={token} path='/home' exact />
          <PublicRoute restricted={false} token={token} component={Landing} path='/' exact/>
          <PublicRoute restricted={false} token={token} component={Register} path='/register' exact />
          <PublicRoute restricted={true} token={token} component={Login} path='/login' exact/>
          {/* <PrivateRoute component={Tasks} token={token} path='/tasks' exact /> */}
          <PrivateRoute component={Users} token={token} path='/users' exact />
          <PrivateRoute component={Settings} token={token} path='/settings' exact />
        </SocketContext.Provider>
      </Switch>
    </BrowserRouter>
  )
}

export default App

