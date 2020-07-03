import React from 'react';
import { Box, Toolbar } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import routes from 'routes'

function Index() {
  return (
    <>
      <Header />
      <Box display="flex">
        <Box flexShrink={0}>
          <Sidebar />
        </Box>
        <Box flexGrow={1}>
          <Toolbar />
          <Box p={3}>
            <Switch>
              {routes.map((route) => (
                <Route key={route.id} path={route.path} component={route.component} exact={route.exact} />
              ))}
            </Switch>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Index;
