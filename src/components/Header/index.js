import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import useStyle from './style'

const Header = () => {
  const classes = useStyle()

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap>
          My Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
