import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window, values, hooks } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  console.log(values)
  const {
    max_tokens,
    temperature,
    top_p,
    frequency_penalty,
    presence_penalty
  } = values;

  const {
    setMax_tokens,
    setTemperature,
    setTop_p,
    setFrequency_penalty,
    setPresence_penalty
  } = hooks;

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <div id="playground_menu">
              <label htmlFor="engines">Engine:</label>
              <select name="engines" id="engines">
                <option value="davinci">davinci</option>
                <option value="curie">curie</option>
                <option value="babbage">babbage</option>
                <option value="ada">ada</option>
              </select> 
          
              <h3>
                  Response Length ({max_tokens})
                  <br/>
                  <input 
                    type="range" min="50" max="400" 
                    step="1" className="slider" id="max_tokens"
                    value={max_tokens} 
                    onChange={e => setMax_tokens(e.target.value)} 
                  />
              </h3>
              <h3>
                  Temperature (<span id="temperature_val">{temperature}</span>)
                  <br/>
                  <input 
                    type="range" min="0" max="1" 
                    step="0.01" className="slider" id="temperature"
                    value={temperature} 
                    onChange={e => setTemperature(e.target.value)}  
                  />
              </h3>

              <h3>
                  Top P (<span id="top_p_val">{top_p}</span>)
                  <br/>
                  <input 
                    type="range" min="0" max="1" 
                    step="0.01" className="slider" id="top_p"
                    value={top_p} 
                    onChange={e => setTop_p(e.target.value)} 
                  />
              </h3>

              <h3>
                  Frequency Penalty (<span id="frequency_penalty_val">{frequency_penalty}</span>)
                  <br/>
                  <input 
                    type="range" min="0" max="1" 
                    step="0.01" className="slider" id="frequency_penalty" 
                    value={frequency_penalty} 
                    onChange={e => setFrequency_penalty(e.target.value)} 
                  />
              </h3>
              <h3>
                  Presence Penalty (<span id="presence_penalty_val">{presence_penalty}</span>)
                  <br/>
                  <input 
                    type="range" min="0" max="1" 
                    step="0.01" className="slider" id="presence_penalty"
                    value={presence_penalty} 
                    onChange={e => setPresence_penalty(e.target.value)} 
                  />
              </h3>
              <h3>
                  Stop Sequences
              </h3>
          </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        {/* <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar> */}
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;