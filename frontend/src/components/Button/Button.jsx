import React from 'react';
import ButtonStyles from './Button.module.css';
const Button = (props) => {
        if(props.mode=="light" || !props.mode)
        return (<button type='submit' onClick={props.onClick} className={ButtonStyles['button-light']} style={props.style}>{props.text}</button>)
        return (<button type='submit' onClick={props.onClick} className={ButtonStyles['button-dark']} style={props.style}>{props.text}</button>)
}


export default Button;