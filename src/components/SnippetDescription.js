import React, { useState } from 'react';
import { AppContext } from '../utils/AppProvider';
import {
    Text,
    Collapse,
} from '@chakra-ui/core';

import ContentEditable from 'react-contenteditable'


const Description = ({ id, description, handleBlur, handleEdit, styledEdit, ControlButtons }) => {

const [show, setShow] = useState(false);

const handleToggle = (newShow) => {
    setShow(newShow);
}

const descriptionId = `description_${id}`;
return(
    <>
    <Text contenteditable="true" fontSize="sm"> 
    {/* {description} */}
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

