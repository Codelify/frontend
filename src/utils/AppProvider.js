import React, { useReducer, createContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { MY_SNIPPETs } from '../graphql/query';

const FETCH_SNIPPETS_DATA = 'FETCH_SNIPPETS_DATA';
const ADD_SNIPPET = 'ADD_SNIPPET';
const DELETE_SNIPPET = 'DELETE_SNIPPET';
const FILTER_SNIPPETS = 'FILTER_SNIPPETS';

const initialState = {
  snippetsData: null,
  filteredSnippets: null,
};

export const AppContext = createContext();

const reducer = (state, { type, payload }) => {
  switch (type) {
    case FETCH_SNIPPETS_DATA:
      return {
        ...state,
        snippetsData: payload,
      };
    case ADD_SNIPPET:
      return {
        ...state,
        snippetsData: state.snippetsData.concat(payload),
      };
    case DELETE_SNIPPET:
      return {
        ...state,
        snippetsData: state.snippetsData.filter(
          snippet => snippet.id !== payload
        ),
      };
    case FILTER_SNIPPETS:
      return {
        ...state,
        filteredSnippets: payload,
      };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token =
    typeof window !== 'undefined' && window.localStorage.getItem('token');
  const { loading, error, data } = useQuery(MY_SNIPPETs, {
    variables: { token },
  });

  useEffect(() => {
    fetchSnippetsData();
  }, [data]);

  const fetchSnippetsData = async () => {
    try {
      const { getAuthUserSnippets } = await data;
      //console.log('PROVIDER API', getAuthUserSnippets);
      dispatch({ type: FETCH_SNIPPETS_DATA, payload: getAuthUserSnippets });
    } catch (error) {
      //console.warn(error);
    }
  };

  const setFilteredSnippets = filteredSnippets => {
    dispatch({ type: FILTER_SNIPPETS, payload: filteredSnippets });
  };

  const value = { state, dispatch, setFilteredSnippets };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
