import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

function FormComponent(props) {
    const classes = useStyles();
    const { prompt, setPrompt, formEmit } = props;
    
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <form onSubmit={formEmit} id="emit" method="GET" action='#'>
                <textarea rows={30} cols={100} 
                    name="prompt_text" id="prompt_text" placeholder="Message"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    style={{"fontSize": "15px"}}
                />
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </main>
    )
}

export default FormComponent;