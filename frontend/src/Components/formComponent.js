import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

function FormComponent(props) {
    // const classes = useStyles();
    const { prompt, setPrompt, formEmit } = props;
    
    return (
      <form 
        onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        formEmit(event)
      }} 
        id="noter-text-area" 
        method="GET" action='#'>
        <TextArea
            id="textarea"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Type your message"
            autoSize={{ minRows: 21 }}
        />
        <input type="submit" value="Save" />
      </form>
    )
}

export default FormComponent;