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
                    <Tag py="3px" borderWidth="1px" borderColor="transparent" size="sm" style={{cursor: "pointer"}} mx="5px" variant="solid" backgroundColor="orange.300" onClick={showLangageOptions}>
                    <DevIcon langage={langage} />
                    <TagLabel style={{textTransform: "uppercase", fontSize:"bold"}} mx="5px">{langage}</TagLabel>
                    </Tag>
                )
            )
        }
        {
            selectionMode && (
                <>
                <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" backgroundColor={langage === "javascript" ? "orange.300" : "gray.600"} id="javascript" onClick={handleSelection}  >
                    <DevIcon langage="javascript" />
                    <TagLabel mx="5px">Javascript</TagLabel>
                </Tag>
                <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" backgroundColor={langage === "python" ? "orange.300" : "gray.600"} id="python" onClick={handleSelection}  >
                    <DevIcon langage="python" />
                    <TagLabel mx="5px">Python</TagLabel>
                </Tag>
                <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" backgroundColor={langage === "jsx" ? "orange.300" : "gray.600"} id="jsx" onClick={handleSelection} >
                    <DevIcon langage="jsx" />
                    <TagLabel mx="5px">React</TagLabel>
                </Tag>
                <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" backgroundColor={langage === "html" ? "orange.300" : "gray.600"} id="html" onClick={handleSelection}  >
                    <DevIcon langage="html" />
                    <TagLabel mx="5px">HTML</TagLabel>
                </Tag>
                <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" backgroundColor={langage === "ruby" ? "orange.300" : "gray.600"} id="ruby" onClick={handleSelection}  >
                    <DevIcon langage="ruby" />
                    <TagLabel mx="5px">Ruby</TagLabel>
                </Tag>
                {/* <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" backgroundColor={langage === "go" ? "orange.300" : "gray.600"} id="go" onClick={handleSelection}  >
                    <DevIcon langage="go" />
                    <TagLabel mx="5px">Go</TagLabel>
                </Tag> */}
                <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" backgroundColor={langage === "other" ? "orange.300" : "gray.600"} id="other" onClick={handleSelection}  >
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