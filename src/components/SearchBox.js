import React, { useContext } from "react";
import { AppContext } from "../utils/AppProvider";
import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/core";
import matchSorter from "match-sorter";

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
    console.log(e.target.value);
    const input = e.target.value;
    const result = matchSorter(state.snippetsData, input, {
      keys: ["title", "description"]
    });
    //console.log(result);
    setFilteredSnippets(result);
  };

  return (
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
        onChange={e => handleOnchange(e)}
      />
    </InputGroup>
  );
};

export default Search;
