import React, { useContext, useState } from "react";
import { AppContext } from "../utils/AppProvider";
import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/core";
import matchSorter from "match-sorter";
import Downshift from "downshift";
import styled from "styled-components";
import {
  DropDown,
  DropDownItem,
  SearchStyles
} from "../utils/searchStyles/Dropdown";

// const filteredSnippets = (e, setFilteredSnippets, snippetsData) => {
//   let inputValue = e.target.value;
//   handleFiler(inputValue, snippetsData, setFilteredSnippets);
// };

// const handleFiler = _.debounce(
//   (inputValue, snippetList, setFilteredSnippets) => {
//     //example of debunce
//     //setFilteredSnippets(results);
//   },
//   200
// );

const Search = () => {
  const { state, setFilteredSnippets } = useContext(AppContext);
  const handleOnchange = e => {
    const input = e.target.value;
    filterItems(input);
  };

  const filterItems = inputValue => {
    const result = matchSorter(state.snippetsData, inputValue, {
      keys: ["title", "description"]
    });
    setFilteredSnippets(result);
  };

  return (
    <Root>
      <Downshift itemToString={item => (item === null ? " " : item.title)}>
        {({ getInputProps, getItemProps, isOpen, highlightedIndex }) => (
          <div>
            <InputGroup mt="5px" w={["90%", "90%", "90%", "50%"]}>
              <InputLeftElement>
                <Icon name="search" color="gray.500" />
              </InputLeftElement>
              <Input
                variant="filled"
                _focusBorderColor="teal"
                _placeholder={{ color: "gray.500", opacity: 1 }}
                rounded="lg"
                {...getInputProps({
                  placeholder: "Find a snippet",
                  type: "search",
                  id: "search",
                  onChange: e => {
                    e.persist();
                    // handleOnChange(e);
                  }
                })}
                onKeyUp={e => handleOnchange(e)}
              />
            </InputGroup>
            {isOpen && (
              <DropDown>
                {state.filteredSnippets &&
                  state.filteredSnippets.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({ item })}
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
  );
};

export default Search;

const Root = styled.div`
  width: 100%;
`;
