import React from 'react';
import {
    Box
} from '@chakra-ui/core'
import { ReactComponent as JsIcon } from '../../assets/icons/javascript-plain.svg';
import { ReactComponent as ReactIcon } from '../../assets/icons/react-original.svg';
import { ReactComponent as PythonIcon } from '../../assets/icons/python-plain.svg';
import { ReactComponent as HtmlIcon } from '../../assets/icons/html5-plain.svg';
import { ReactComponent as GoIcon } from '../../assets/icons/go-plain.svg';
import { ReactComponent as RubyIcon } from '../../assets/icons/ruby-plain.svg';
import { IoMdAlert } from 'react-icons/io';
import { FaQuestionCircle } from 'react-icons/fa';

const DevIcon = ({langage, size}) => {
    if(langage === "javascript"){
        return (
            <JsIcon style={{width:"18px", height:"auto"}} />
        )    
    }
    else if (langage === "python"){
        return (
            <PythonIcon style={{width:"18px", height:"auto"}} />
        )    
    }
    else if (langage === "jsx"){
        return (
            <ReactIcon style={{width:"18px", height:"auto"}} />
        )    
    }
    else if (langage === "html"){
        return (
            <HtmlIcon style={{width:"18px", height:"auto"}} />
        )    
    }
    else if (langage === "go"){
        return (
            <GoIcon style={{width:"18px", height:"auto"}} />
        )    
    }
    else if (langage === "ruby"){
        return (
            <RubyIcon style={{width:"18px", height:"auto"}} />
        )    
    }
    else if (langage === "undefined"){
        return (
            <Box as={FaQuestionCircle} size="18px" color="red" style={{animation: "shake 1s"}} />
        )    
    }
    else return <Box as={IoMdAlert} size="18px" color="red" />
}

export default DevIcon