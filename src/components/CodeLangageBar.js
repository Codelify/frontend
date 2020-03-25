import React from 'react';
import {
    Box,
    Tag,
    TagLabel,
    TagIcon
} from '@chakra-ui/core'
import { ReactComponent as JsIcon } from '../assets/icons/javascript-plain.svg';
import { ReactComponent as ReactIcon } from '../assets/icons/react-original.svg';
import { ReactComponent as PythonIcon } from '../assets/icons/python-plain.svg';
import { ReactComponent as HtmlIcon } from '../assets/icons/html5-original.svg';
import { ReactComponent as GoIcon } from '../assets/icons/go-plain.svg';
import { ReactComponent as RubyIcon } from '../assets/icons/ruby-plain.svg';
import { IoMdRadioButtonOn } from 'react-icons/io'


const CodeLangageBar = ({langageSelection, codeLangage}) => {
    return (
    <>
        <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variantColor={codeLangage === "javascript" ? "orange" : "gray"} id="javascript" onClick={langageSelection}  >
        <JsIcon style={{width:"20px", height:"auto"}} />
        <TagLabel mx="5px">Javascript</TagLabel>
        </Tag>
        <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variantColor={codeLangage === "python" ? "orange" : "gray"} id="python" onClick={langageSelection}  >
        <PythonIcon style={{width:"20px", height:"auto"}} />
        <TagLabel mx="5px">Python</TagLabel>
        </Tag>
        <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variantColor={codeLangage === "jsx" ? "orange" : "gray"} id="jsx" onClick={langageSelection} >
        <ReactIcon style={{width:"20px", height:"auto"}} />
        <TagLabel mx="5px">React</TagLabel>
        </Tag>
        <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variantColor={codeLangage === "html" ? "orange" : "gray"} id="html" onClick={langageSelection}  >
        <HtmlIcon style={{width:"20px", height:"auto"}} />
        <TagLabel mx="5px">HTML</TagLabel>
        </Tag>
        <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variantColor={codeLangage === "ruby" ? "orange" : "gray"} id="ruby" onClick={langageSelection}  >
        <RubyIcon style={{width:"20px", height:"auto"}} />
        <TagLabel mx="5px">Ruby</TagLabel>
        </Tag>
        <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variantColor={codeLangage === "go" ? "orange" : "gray"} id="go" onClick={langageSelection}  >
        <GoIcon style={{width:"20px", height:"auto"}} />
        <TagLabel mx="5px">Go</TagLabel>
        </Tag>
        <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variantColor={codeLangage === "other" ? "orange" : "gray"} id="other" onClick={langageSelection}  >
        <TagIcon icon={IoMdRadioButtonOn} />
        <TagLabel mx="5px">Other</TagLabel>
        </Tag>
    </>
    )
}

export default CodeLangageBar;