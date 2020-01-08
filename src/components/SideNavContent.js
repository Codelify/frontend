import React, { useEffect, useState } from "react";
import { 
    Box, 
    PseudoBox,
    Heading,
} from "@chakra-ui/core";  
import { FiArchive, FiHome, FiStar, FiTag } from "react-icons/fi"

const browseLinks = [
    {
    name: "My Snippets",
    icon: FiHome,
    id: "FiHome"
    },
    {
    name: "Archives",
    icon: FiArchive,
    id: "FiArchive"    
    },
];

const filterLinks = [
    {
    name: "Favorites",
    icon: FiStar,
    id: "FiStar"    
    },
    {
    name: "Tags",
    icon: FiTag,
    id: "FiTag"    
    },
];




const NavGroupHeading = props => (
    <Heading
    fontSize="xs"
    color="gray.400"
    letterSpacing="wide"
    mb={2}
    textTransform="uppercase"
    {...props}
    />
);  


const SideNavContent = ({
    contentHeight = "calc(100vh - 4rem)",
    ...props
}) => {
    const [navMenu, setNavMenu] = useState("FiHome")

    const onActivate = (newVavMenu) =>{
        // first we remove the class active from current link
        document.getElementById(navMenu).classList.remove('active');
        // then we update the state with the new active link
        setNavMenu(newVavMenu);
    }    

    useEffect( () => {
        document.getElementById(navMenu).classList.add('active');
    },[navMenu]

    );

    return (
        <Box
        top="4rem"
        ml="20px"
        position="relative"
        overflowY="auto"
        w="250px"
        pos="fixed" 
        {...props}
        >
        <Box
            as="nav"
            height={contentHeight}
            aria-label="Main navigation"
            fontSize="sm"
            mt="30px"
        >
            <NavGroupHeading>Browse</NavGroupHeading>
            {browseLinks.map(linkObject => (
                <PseudoBox
                d="flex"
                textAlign="left"
                mb="4px"
                as="button"
                fontWeight="bold"
                w="100%"
                py={3}
                px={4}
                rounded="md"
                color="#4A5568"
                onClick={()=>{
                    onActivate(linkObject.id)
                }}
                id={linkObject.id}            
                key={linkObject.id} 
                _hover={{ color: "#319795" }}
                _focus={{
                    outline: "none",
                    bg: "teal.50",
                    borderColor: "none",
                    color: "#319795"
                }}                                
                >
    
                <Box mr="10px" fontSize="20px" as={linkObject.icon} />
                {linkObject.name}
                </PseudoBox>
            ))}
            <NavGroupHeading mt="30px">Filter</NavGroupHeading>
            {filterLinks.map(linkObject => (
                <PseudoBox
                d="flex"
                textAlign="left"
                mb="4px"
                as="button"
                fontWeight="bold"
                w="100%"
                py={3}
                px={4}
                rounded="md"
                onClick={()=>{
                    onActivate(linkObject.id)
                }}
                id={linkObject.id}
                key={linkObject.id} 
                color="#4A5568"            
                _hover={{ color: "#319795" }}
                _focus={{
                    outline: "none",
                    bg: "teal.50",
                    borderColor: "none",
                    color: "#319795"
                }}                  
                >
    
                <Box mr="10px" key={linkObject.id} fontSize="20px" as={linkObject.icon}/>
                {linkObject.name}
                </PseudoBox>
            ))}
        </Box>
        </Box>
    );
}

export default SideNavContent;