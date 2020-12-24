import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 300;

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
  const { window, formEmit } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const {
    max_tokens,
    temperature,
    top_p,
    frequency_penalty,
    presence_penalty,
    stop_sequences
  } = props.values;

  const {
    setMax_tokens,
    setTemperature,
    setTop_p,
    setFrequency_penalty,
    setPresence_penalty,
    setStop_sequences
  } = props.hooks;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleStopSequencesChange = (event) => {
    const string = event.target.value;
    setStop_sequences(string)    
  }

  const drawer = (     
    <div id="playground_menu">
        <br/>
        <label htmlFor="engines">Engine:</label>
        <select name="engines" id="engines">
          <option value="davinci">davinci</option>
          <option value="curie">curie</option>
          <option value="babbage">babbage</option>
          <option value="ada">ada</option>
        </select>
        <br/><br/>
        <div>
          <Typography id="discrete-slider-always" gutterBottom>
              Response Length ({max_tokens})
          </Typography>
          <Slider
                defaultValue={max_tokens}
                aria-labelledby="discrete-slider-always"
                step={1}
                min={50}
                max={400}
                value={max_tokens}
                onChange={(event, newValue) => {
                  setMax_tokens(newValue);
                }} 
                valueLabelDisplay="off"
              />
        </div>
        <div>
          <Typography id="discrete-slider-always" gutterBottom>
              Temperature (<span id="temperature_val">{temperature}</span>)
          </Typography>
          <Slider
                defaultValue={temperature}
                aria-labelledby="discrete-slider-always"
                step={0.01}
                min={0}
                max={1}
                value={temperature}
                onChange={(event, newValue) => {
                  setTemperature(newValue);
                }} 
                valueLabelDisplay="off"
              />
        </div>

        <div>
            <Typography id="discrete-slider-always" gutterBottom>
              Top P (<span id="top_p_val">{top_p}</span>)
            </Typography>
            <Slider
                defaultValue={top_p}
                aria-labelledby="discrete-slider-always"
                step={0.01}
                min={0}
                max={1}
                value={top_p}
                onChange={(event, newValue) => {
                  setTop_p(newValue);
                }} 
                valueLabelDisplay="off"
              />
        </div>

        <div>
          <Typography id="discrete-slider-always" gutterBottom>
              Frequency Penalty (<span id="frequency_penalty_val">{frequency_penalty}</span>)
          </Typography>
          <Slider
                defaultValue={frequency_penalty}
                aria-labelledby="discrete-slider-always"
                step={0.01}
                min={0}
                max={1}
                value={frequency_penalty}
                onChange={(event, newValue) => {
                  setFrequency_penalty(newValue);
                }} 
                valueLabelDisplay="off"
              />
        </div>
        <div>
          <Typography id="discrete-slider-always" gutterBottom>
              Presence Penalty (<span id="presence_penalty_val">{presence_penalty}</span>)
          </Typography>
          <Slider
            defaultValue={presence_penalty}
            aria-labelledby="discrete-slider-always"
            step={0.01}
            min={0}
            max={1}
            value={presence_penalty}
            onChange={(event, newValue) => {
              setPresence_penalty(newValue);
            }} 
            valueLabelDisplay="off"
          />
        </div>
        <div>
          <Typography id="discrete-slider-always" gutterBottom>
              Stop Sequences
          </Typography>
          <p>Enter sequence and press Tab</p>
          <TextField
            id="filled-multiline-flexible"
            label="Type here"
            multiline
            rowsMax={3}
            value={stop_sequences}
            onChange={handleStopSequencesChange}
            variant="outlined"
            />
          </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
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
            Kiosk
          </Typography>
        </Toolbar>
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
