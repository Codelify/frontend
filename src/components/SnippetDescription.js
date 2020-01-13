import React, { useState } from 'react';
import {
    Text,
    Collapse,
} from '@chakra-ui/core';

import ContentEditable from 'react-contenteditable'


const Description = ({ id, description, handleEdit, styledEdit, ControlButtons }) => {

const handleBlur = (event) => {
    document.getElementById(event.target.id).classList.remove('edited-div');
    handleToggle(false);
}

const [show, setShow] = useState(false);

const handleToggle = (newShow) => {
    setShow(newShow);
}

const descriptionId = `description_${id}`;
return(
    <>
    <Text mb="5px" contenteditable="true" fontSize="sm"> 
    <ContentEditable
        html={description}
        disabled={false}
        id={descriptionId}
        onBlur={handleBlur}
        onChange={handleEdit}
        onFocus={styledEdit}
        onClick={()=>{
            handleToggle(true)
        }}        
        style={{
        outline: "none",
        }}
    />
    </Text>
    <Collapse mt={0} isOpen={show}>
    <ControlButtons />
    </Collapse>  
    </>
);
}

export default Description

