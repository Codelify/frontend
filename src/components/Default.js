import React, { useContext } from 'react';
import { AppContext } from '../utils/AppProvider';
import EmptyView from './EmptyView';
import SnippetList from './List';
import FuzzySearch from 'react-fuzzy';
import MainLayout from "../views/layout";

const Default = () => {
  const { state } = useContext(AppContext);
  const token =
    typeof window !== 'undefined' && window.localStorage.getItem('token');

  // Render the list of snippets if their are any and user has token
  if (state.snippetsData && state.snippetsData.length && token) {
    return(
      <MainLayout>
        <SnippetList data={state.filteredSnippets} />
      </MainLayout>
    ); 
  }
  // default view if there is no snippets
  else {
    return(
      <MainLayout>
        <EmptyView />
      </MainLayout>
    );
  }
};

export default Default;
