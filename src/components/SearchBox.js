import React, { useContext, useState } from "react";
import { AppContext } from "../utils/AppProvider";
import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/core";
import matchSorter from "match-sorter";
import DownShift from "downshift";
import styled from "styled-components";
import { DropDown, DropDownItem } from "../utils/searchStyles/Dropdown";

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
  console.log("FILTERED SNIPPETS ", state.filteredSnippets);
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

  const handleDownshift = e => {
    if (e) {
      filterItems(e.title);
    }
  };

  return (
    <Root>
      <DownShift
        onChange={handleDownshift}
        itemToString={item => (item === null ? " " : item.title)}
      >
        {({
          getInputProps,
          getMenuProps,
          isOpen,
          getItemProps,
          highlightedIndex,
        }) => (
          <div>
            <InputGroup mt="5px" w={["90%", "90%", "90%", "50%"]}>
              <InputLeftElement>
                <Icon name="search" color="gray.500" />
              </InputLeftElement>
              <Input
                variant="filled"
                placeholder="Find a snippet"
                focusBorderColor="#319795"
                _placeholder={{ color: "gray.500", opacity: 1 }}
                rounded="lg"
                {...getInputProps({
                  placeholder: "Find a snippet",
                  type: "search",
                  id: "search",
                  onChange: e => {
                    e.persist();
                    handleOnchange(e);
                  }
                })}
              />
            </InputGroup>
            <ul
              {...getMenuProps({
                style: { height: 20, overFlowY: "scroll" }
              })}
            >
              {isOpen && (
                <DropDown>
                  {state.filteredSnippets.length &&
                    state.filteredSnippets.map((item, index) => (
                      <DropDownItem
                        key={item.id}
                        {...getItemProps({ item, key: item.id })}
                        highlighted={index === highlightedIndex}
                      >
                        {item.title}
                      </DropDownItem>
                    ))}
                </DropDown>
              )}
            </ul>
          </div>
        )}
      </DownShift>
    </Root>
  );
};

export default Search;

const Root = styled.div`
  width: 100%;
`;
