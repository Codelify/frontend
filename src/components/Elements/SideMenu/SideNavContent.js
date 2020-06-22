import React, { useState, useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { Box, PseudoBox, Heading, useColorMode } from "@chakra-ui/core";
import localstorage from "../../../utils/localstorage";
import { FiArchive, FiHome, FiStar, FiTag } from "react-icons/fi";
import { Link } from "@reach/router";

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

const SideNavContent = ({ contentHeight = "calc(100vh - 4rem)", ...props }) => {
  const [navMenu, setNavMenu] = useState(localstorage.get() || "FiHome");
  const { state, setCurentView } = useContext(AppContext);
  const { colorMode } = useColorMode();
  const formatCount = list => {
    if (list.length > 0) {
      return `(${list.length})`;
    } else {
      return "";
    }
  };
  const browseLinks = [
    {
      name: "My Snippets",
      icon: FiHome,
      id: "FiHome",
      link: "/app/list",
      count: formatCount(state.snippetsData)
    },
    {
      name: "Archives",
      icon: FiArchive,
      id: "FiArchive",
      link: "/app/archive",
      count: formatCount(state.archivedSnippets)
    }
  ];

  const filterLinks = [
    {
      name: "Favorites",
      icon: FiStar,
      id: "FiStar",
      link: "/app/favorites",
      count: formatCount(state.favoritesSnippets)
    },
    {
      name: "Tags",
      icon: FiTag,
      id: "FiTag",
      link: "/app/tags",
      count: ""
    }
  ];

  const onActivate = newVavMenu => {
    //console.log(newVavMenu);
    setCurentView(newVavMenu);
    localstorage.set(newVavMenu);
    // first we remove the class active from current link
    document.getElementById(navMenu).classList.remove("active");
    // then we update the state with the new active link
    setNavMenu(localstorage.get() || "FiHome");
  };

  return (
    <Box
      top="4rem"
      ml="20px"
      position="relative"
      overflowY="auto"
      w="200px"
      {...props}
    >
      <Box
        as="nav"
        height={contentHeight}
        aria-label="Main navigation"
        fontSize="sm"
        mt="30px"
      >
        <NavGroupHeading mb="15px">Browse</NavGroupHeading>
        {browseLinks.map(linkObject => (
          <Link to={linkObject.link} key={linkObject.id}>
            <PseudoBox
              className="nav-buttom"
              as="button"
              color={ linkObject.id === navMenu ? "#319795" : "#4A5568"}
              bg={linkObject.id === navMenu ? "teal.100" : "none"}
              opacity={colorMode === "dark" ? "0.8" : "1"}
              onClick={() => {
                onActivate(linkObject.id);
              }}
              id={linkObject.id}
            >
              <Box mr="10px" fontSize="20px" as={linkObject.icon} />
              {/* {`${linkObject.name} ${linkObject.count}`} */}
              {`${linkObject.name}`}
              </PseudoBox>
          </Link>
        ))}
        <NavGroupHeading mb="15px" mt="30px">
          Filter
        </NavGroupHeading>
        {filterLinks.map(linkObject => (
          <Link to={linkObject.link} key={linkObject.id}>
            <PseudoBox
              className="nav-buttom"
              as="button"
              color={ linkObject.id === navMenu ? "#285E61" : "#4A5568"}
              bg={linkObject.id === navMenu ? "teal.100" : "none"}
              opacity={colorMode === "dark" ? "0.8" : "1"}
              onClick={() => {
                onActivate(linkObject.id);
              }}
              id={linkObject.id}
            >
              <Box
                mr="10px"
                key={linkObject.id}
                fontSize="20px"
                as={linkObject.icon}
              />
              {/* {`${linkObject.name} ${linkObject.count}`} */}
              {`${linkObject.name}`}
            </PseudoBox>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default SideNavContent;
