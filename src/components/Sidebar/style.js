import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const style = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
}))

export default style
