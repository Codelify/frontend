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
        {
            codeLangage ? (
            <>
            <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" variantColor={codeLangage === "javascript" ? "red" : "gray"} id="javascript" onClick={langageSelection}  >
                <DevIcon langage="javascript" />
                <TagLabel mx="5px">Javascript</TagLabel>
            </Tag>
            <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" variantColor={codeLangage === "python" ? "red" : "gray"} id="python" onClick={langageSelection}  >
                <DevIcon langage="python" />
                <TagLabel mx="5px">Python</TagLabel>
            </Tag>
            <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" variantColor={codeLangage === "jsx" ? "red" : "gray"} id="jsx" onClick={langageSelection} >
                <DevIcon langage="jsx" />
                <TagLabel mx="5px">React</TagLabel>
            </Tag>
            <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" variantColor={codeLangage === "html" ? "red" : "gray"} id="html" onClick={langageSelection}  >
                <DevIcon langage="html" />
                <TagLabel mx="5px">HTML</TagLabel>
            </Tag>
            <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" variantColor={codeLangage === "ruby" ? "red" : "gray"} id="ruby" onClick={langageSelection}  >
                <DevIcon langage="ruby" />
                <TagLabel mx="5px">Ruby</TagLabel>
            </Tag>
            <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" variantColor={codeLangage === "go" ? "red" : "gray"} id="go" onClick={langageSelection}  >
                <DevIcon langage="go" />
                <TagLabel mx="5px">Go</TagLabel>
            </Tag>
            <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" variantColor={codeLangage === "other" ? "red" : "gray"} id="other" onClick={langageSelection}  >
                <TagIcon icon={IoMdRadioButtonOn} />
                <TagLabel mx="5px">Other</TagLabel>
            </Tag>    
            </>
            ) :
            (
                <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" variantColor="red" id="undefined" onClick={langageSelection}  >
                <DevIcon langage="undefined" />
                <TagLabel mx="5px">Select Langage</TagLabel>
                </Tag>
            )
        }
    </>
    )
}

export default CodeLangageBar;