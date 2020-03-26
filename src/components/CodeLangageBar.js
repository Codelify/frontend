import React, { useState, useEffect } from 'react';
import {
    Tag,
    TagLabel,
    TagIcon
} from '@chakra-ui/core'
import { IoMdRadioButtonOn } from 'react-icons/io';
import DevIcon from './DevIcon';


const CodeLangageBar = ({langageSelection, codeLangage}) => {
    const [ langage, setLangage ] = useState(codeLangage);
    const [ selectionMode, setSelectionMode ] = useState(false);

    const showLangageOptions = () => {
        setSelectionMode(true)
    }
    const handleSelection = (e) => {
        langageSelection(e);
        setSelectionMode(false)
    }

    useEffect(()=> {
        setLangage(codeLangage);
    },[codeLangage]
    )
    
    return (
    <>
        {
            !langage ? (
                !selectionMode && (
                    <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" variantColor="red" id="undefined" onClick={showLangageOptions}  >
                    <DevIcon langage="undefined" />
                    <TagLabel mx="5px">Select Langage</TagLabel>
                    </Tag>    
                )
            ) : (
                !selectionMode && (
                    <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" variantColor="red" onClick={showLangageOptions}>
                    <DevIcon langage={langage} />
                    <TagLabel style={{textTransform: "uppercase"}} mx="5px">{langage}</TagLabel>
                </Tag>
                )
            )
        }
        {
            selectionMode && (
                <>
                <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" variantColor={langage === "python" ? "red" : "gray"} id="python" onClick={handleSelection}  >
                    <DevIcon langage="python" />
                    <TagLabel mx="5px">Python</TagLabel>
                </Tag>
                <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" variantColor={langage === "jsx" ? "red" : "gray"} id="jsx" onClick={handleSelection} >
                    <DevIcon langage="jsx" />
                    <TagLabel mx="5px">React</TagLabel>
                </Tag>
                <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" variantColor={langage === "html" ? "red" : "gray"} id="html" onClick={handleSelection}  >
                    <DevIcon langage="html" />
                    <TagLabel mx="5px">HTML</TagLabel>
                </Tag>
                <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" variantColor={langage === "ruby" ? "red" : "gray"} id="ruby" onClick={handleSelection}  >
                    <DevIcon langage="ruby" />
                    <TagLabel mx="5px">Ruby</TagLabel>
                </Tag>
                <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" variantColor={langage === "go" ? "red" : "gray"} id="go" onClick={handleSelection}  >
                    <DevIcon langage="go" />
                    <TagLabel mx="5px">Go</TagLabel>
                </Tag>
                <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" variantColor={langage === "other" ? "red" : "gray"} id="other" onClick={handleSelection}  >
                    <TagIcon icon={IoMdRadioButtonOn} />
                    <TagLabel mx="5px">Other</TagLabel>
                </Tag>    
                </>
            )
        }
    </>
    )
}

export default CodeLangageBar;