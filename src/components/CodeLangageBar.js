import React, { useState, useEffect, useContext } from 'react';
import {
    Tag,
    TagLabel,
    TagIcon,
    useColorMode
} from '@chakra-ui/core';
import SnippetContext from '../context/SnippetContext';
import { IoMdRadioButtonOn } from 'react-icons/io';
import DevIcon from './DevIcon';
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_SNIPPET } from "../graphql/mutation";


const CodeLangageBar = ({codeLangage, id}) => {
    const [ langage, setLangage ] = useState(codeLangage);
    const [ selectionMode, setSelectionMode ] = useState(false);
    const disableEdit = useContext(SnippetContext);
    const { colorMode } = useColorMode();
    const [ selectedColor, setSelectedColor ] = useState(null);
    const [updateSnippet] = useMutation(UPDATE_SNIPPET);

    useEffect(()=> {
        if(colorMode === "dark") {
            setSelectedColor("orange.900")
        } 
        else setSelectedColor("orange.300")
    },[colorMode]
    )

    const showLangageOptions = () => {
        if(!disableEdit){
            setSelectionMode(true)
        } 
    }
    const handleSelection = (event) => {
      const lang = event.target.parentElement.id; 
      setLangage(lang);  
      setSelectionMode(false)
      handleUpdate(lang)
    }

    const handleUpdate = async (lang) => {
      const token = window.localStorage.getItem("token");
      try {
        // eslint-disable-next-line no-empty-pattern
        const {} = await updateSnippet({
          variables: {
            snippetId: id,
            snippetInfo: { "lang": lang },
            token: token
          }
        });
      } catch (error) {
        console.log("Update error: " + error);
      }
    };
    
    return (
    <>
        {
            !langage ? (
                !selectionMode && (
                    <Tag style={{cursor: "pointer"}} size="lg" mx="5px" variant="solid" variantColor="red" id="undefined" onClick={showLangageOptions}  >
                    <DevIcon langage="undefined" />
                    <TagLabel mx="5px">Select Langage</TagLabel>
                    </Tag>    
                )
            ) : (
                !selectionMode && (
                    <Tag py="3px" borderWidth="1px" borderColor={colorMode === "light" ? "#FAFAFA" : "rgba(45,55,72, 0.1)"} size="sm" style={{cursor: "pointer"}} mx="5px" variant="solid" backgroundColor={selectedColor} onClick={showLangageOptions}>
                    <DevIcon langage={langage} />
                    <TagLabel style={{textTransform: "uppercase", fontSize:"bold"}} mx="5px">{langage}</TagLabel>
                    </Tag>
                )
            )
        }
        {
            selectionMode && (
                <>
                <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" backgroundColor={langage === "javascript" ? selectedColor : "gray.600"} id="javascript" onClick={handleSelection}  >
                    <DevIcon langage="javascript" />
                    <TagLabel mx="5px">Javascript</TagLabel>
                </Tag>
                <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" backgroundColor={langage === "python" ? selectedColor : "gray.600"} id="python" onClick={handleSelection}  >
                    <DevIcon langage="python" />
                    <TagLabel mx="5px">Python</TagLabel>
                </Tag>
                <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" backgroundColor={langage === "jsx" ? selectedColor : "gray.600"} id="jsx" onClick={handleSelection} >
                    <DevIcon langage="jsx" />
                    <TagLabel mx="5px">React</TagLabel>
                </Tag>
                <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" backgroundColor={langage === "html" ? selectedColor : "gray.600"} id="html" onClick={handleSelection}  >
                    <DevIcon langage="html" />
                    <TagLabel mx="5px">HTML</TagLabel>
                </Tag>
                <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" backgroundColor={langage === "ruby" ? selectedColor : "gray.600"} id="ruby" onClick={handleSelection}  >
                    <DevIcon langage="ruby" />
                    <TagLabel mx="5px">Ruby</TagLabel>
                </Tag>
                {/* <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" backgroundColor={langage === "go" ? selectedColor : "gray.600"} id="go" onClick={handleSelection}  >
                    <DevIcon langage="go" />
                    <TagLabel mx="5px">Go</TagLabel>
                </Tag> */}
                <Tag size="lg" style={{cursor: "pointer"}} mx="5px" variant="solid" backgroundColor={langage === "other" ? selectedColor : "gray.600"} id="other" onClick={handleSelection}  >
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