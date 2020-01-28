import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../utils/AppProvider";
import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Box
} from "@chakra-ui/core";
import matchSorter from "match-sorter";
import Downshift from "downshift";
import { DropDown, DropDownItem, Root } from "../utils/searchStyles/Dropdown";

// const filteredSnippets = (e, setFilteredSnippets, snippetsData) => {
//   let inputValue = e.target.value;
//   handleFiler(inputValue, snippetsData, setFilteredSnippets);
// };

// use debounce in case we don't want to fire so many action on search
// const handleFiler = _.debounce(
//   (inputValue, snippetList, setFilteredSnippets) => {
//     //example of debunce
//     //setFilteredSnippets(results);
//   },
//   200
// );

const Search = () => {
  const [value, setValue] = useState("");
  const { state, setFilteredSnippets } = useContext(AppContext);
  const handleOnchange = e => {
    const input = e.target.value;
    filterItems(input);
  };

  const filterItems = inputValue => {
    const result =
      state.snippetsData.length > 0 &&
      matchSorter(state.snippetsData, inputValue, {
        keys: ["title", "description"]
      });
    setFilteredSnippets(result);
  };

  const handleDownshiftChange = searchTerm => {
    searchTerm && filterItems(searchTerm.title);
  };
  const handleStateChange = changes => {
    if (changes.hasOwnProperty("selectedItem")) {
      setValue(changes.selectedItem);
    } else if (changes.hasOwnProperty("inputValue")) {
      setValue(changes.inputValue);
    }
  };
  return (
    <Box w={["90%", "90%", "90%", "50%"]}>
      <Root>
        <Downshift
          //onStateChange={handleStateChange}
          onChange={handleDownshiftChange}
          //selectedItem={value}
          itemToString={item => (item === null ? "" : item.title)}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            highlightedIndex,
            clearSelection
          }) => (
            <div>
              <InputGroup mx="auto" mt="5px" w="100%">
                <InputLeftElement>
                  <Icon name="search" color="gray.500" />
                </InputLeftElement>
                <Input
                  variant="filled"
                  focusBorderColor="#319795"
                  _placeholder={{ color: "gray.500", opacity: 1 }}
                  rounded="lg"
                  {...getInputProps({
                    placeholder: `${
                      state.snippetsData.length
                        ? "Find a snippet"
                        : "No Snippets to search"
                    }`,
                    type: "search",
                    id: "search",
                    onChange: e => {
                      e.persist();
                      handleOnchange(e);
                      if (e.target.value.length === 0) {
                        clearSelection();
                      }
                    }
                  })}
                  onKeyUp={e => handleOnchange(e)}
                />
              </InputGroup>
              {isOpen && (
                <DropDown
                  hasPaddingBottom={
                    state.snippetsData.length > 0 ? true : false
                  }
                >
                  {state.filteredSnippets &&
                    state.filteredSnippets.map((item, index) => (
                      <DropDownItem
                        {...getItemProps({
                          item,
                          index
                        })}
                        key={item.id}
                        highlighted={index === highlightedIndex}
                      >
                        {item.title}
                      </DropDownItem>
                    ))}
                  {state.filteredSnippets &&
                    state.filteredSnippets.length === 0 && (
                      <DropDownItem>No Snippets Found</DropDownItem>
                    )}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </Root>
    </Box>
  );
};

export default Search;
