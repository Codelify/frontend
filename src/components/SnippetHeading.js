import React, { useState } from 'react';
import {
    Heading,
    Collapse,
} from '@chakra-ui/core';

import ContentEditable from 'react-contenteditable'


const SnippetHeading = ({ id, title, handleEdit, styledEdit, ControlButtons }) => {

const handleBlur = (event) => {
    document.getElementById(event.target.id).classList.remove('edited-div');
    handleToggle(false);
}

const [show, setShow] = useState(false);

const handleToggle = (newShow) => {
    setShow(newShow);
}

const titleId = `title_${id}`;

return(
    <>
        <Heading mb="5px" as="h3" size="lg">
        <ContentEditable
            html={title}
            disabled={false}
            id={titleId}
            onBlur={handleBlur}
            onClick={()=>{
            handleToggle(true)
            }}
            onChange={handleEdit}
            onFocus={styledEdit}
            style={{
            outline: "none",
            }}
        />          
        </Heading>
        <Collapse mt={0} isOpen={show}>
        <ControlButtons />
        </Collapse> 
    </>
);
}

export default SnippetHeading