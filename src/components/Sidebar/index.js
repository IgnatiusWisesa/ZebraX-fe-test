import React from 'react'
import { Drawer, List, ListItem, ListItemText, Toolbar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import routes from 'routes'

import useStyle from './style'

const Sidebar = () => {
  const classes = useStyle()

  return (
    <Drawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      variant="permanent"
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {routes.map((route) => (
            <ListItem key={route.id} component={Link} to={route.path} button>
              <ListItemText primary={route.label} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  )
}

export default Sidebar
