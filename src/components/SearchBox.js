import React, { useContext } from 'react';
import { AppContext } from '../utils/AppProvider';
import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/core';
import _ from 'lodash';
import fuzzy from 'fuzzy';

const filteredSnippets = (e, setFilteredSnippets, snippetsData) => {
  let inputValue = e.target.value;
  handleFiler(inputValue, snippetsData, setFilteredSnippets);
};

const handleFiler = _.debounce(
  (inputValue, snippetList, setFilteredSnippets) => {
    console.log(inputValue);
    var options = {
      pre: '<b>',
      post: '</b>',
      extract: function(snippetList) {
        return snippetList.title + ' ' + snippetList.description;
      },
    };
    var results = fuzzy
      .filter(inputValue, snippetList, options)
      .map(item => item.original);

    console.log(results);
    setFilteredSnippets(results);
  },
  200
);

const Search = () => {
  const { state, setFilteredSnippets } = useContext(AppContext);

  return (
    <InputGroup mt="5px" w={['90%', '90%', '90%', '50%']}>
      <InputLeftElement>
        <Icon name="search" color="gray.500" />
      </InputLeftElement>
      <Input
        variant="filled"
        placeholder="Find a snippet"
        focusBorderColor="#319795"
        _placeholder={{ color: 'gray.500', opacity: 1 }}
        rounded="lg"
        onKeyUp={e =>
          filteredSnippets(e, setFilteredSnippets, state.snippetsData)
        }
      />
    </InputGroup>
  );
};

export default Search;
