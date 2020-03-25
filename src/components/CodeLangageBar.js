import React from 'react';
import {
    Tag,
    TagLabel,
    TagIcon
} from '@chakra-ui/core'
import { IoMdRadioButtonOn } from 'react-icons/io';
import DevIcon from './DevIcon';


const CodeLangageBar = ({langageSelection, codeLangage}) => {
    return (
    <>
        <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variantColor={codeLangage === "javascript" ? "orange" : "gray"} id="javascript" onClick={langageSelection}  >
            <DevIcon langage="javascript" />
            <TagLabel mx="5px">Javascript</TagLabel>
        </Tag>
        <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variantColor={codeLangage === "python" ? "orange" : "gray"} id="python" onClick={langageSelection}  >
            <DevIcon langage="python" />
            <TagLabel mx="5px">Python</TagLabel>
        </Tag>
        <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variantColor={codeLangage === "jsx" ? "orange" : "gray"} id="jsx" onClick={langageSelection} >
            <DevIcon langage="jsx" />
            <TagLabel mx="5px">React</TagLabel>
        </Tag>
        <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variantColor={codeLangage === "html" ? "orange" : "gray"} id="html" onClick={langageSelection}  >
            <DevIcon langage="html" />
            <TagLabel mx="5px">HTML</TagLabel>
        </Tag>
        <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variantColor={codeLangage === "ruby" ? "orange" : "gray"} id="ruby" onClick={langageSelection}  >
            <DevIcon langage="ruby" />
            <TagLabel mx="5px">Ruby</TagLabel>
        </Tag>
        <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variantColor={codeLangage === "go" ? "orange" : "gray"} id="go" onClick={langageSelection}  >
            <DevIcon langage="go" />
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