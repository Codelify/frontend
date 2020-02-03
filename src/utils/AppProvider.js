import React, { useReducer, createContext, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { MY_SNIPPETs } from "../graphql/query";
import localstorage from "../utils/localstorage";

const FETCH_SNIPPETS_DATA = "FETCH_SNIPPETS_DATA";
const ADD_SNIPPET = "ADD_SNIPPET";
const DELETE_SNIPPET = "DELETE_SNIPPET";
const FILTER_SNIPPETS = "FILTER_SNIPPETS";
const SET_SIDE_VIEW = "SET_SIDE_VIEW";

const initialState = {
  snippetsData: [],
  archivedSnippets: [],
  filteredSnippets: null,
  currentView: localstorage.get() || "FiHome",
  searchTerm: ""
};

export const AppContext = createContext();

const reducer = (state, { type, payload }) => {
  switch (type) {
    case FETCH_SNIPPETS_DATA:
      return {
        ...state,
        snippetsData: payload
          .sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
          .filter(snippet => {
            return snippet.archivedAt === null;
          }),
        archivedSnippets: payload
          .sort((a, b) => {
            return new Date(b.archivedAt) - new Date(a.archivedAt);
          })
          .filter(snippet => {
            return snippet.archivedAt !== null;
          }),
        favoritesSnippets: payload
          .sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
          .filter(snippet => {
            return snippet.isFav;
          })
      };

    case ADD_SNIPPET:
      return {
        ...state,
        snippetsData: [payload, ...state.snippetsData]
      };
    case DELETE_SNIPPET:
      return {
        ...state,
        filteredSnippets: null,
        snippetsData: state.snippetsData.filter(
          snippet => snippet.id !== payload
        )
      };
    case FILTER_SNIPPETS:
      return {
        ...state,
        filteredSnippets: payload
      };
    case SET_SIDE_VIEW:
      return {
        ...state,
        currentView: payload,
        filteredSnippets: null
      };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token =
    typeof window !== "undefined" && window.localStorage.getItem("token");
  const { data, loading } = useQuery(MY_SNIPPETs, {
    variables: { token }
  });

  useEffect(() => {
    fetchSnippetsData();
  }, [data]);

  const fetchSnippetsData = async () => {
    try {
      const { getAuthUserSnippets } = await data;
      dispatch({ type: FETCH_SNIPPETS_DATA, payload: getAuthUserSnippets });
    } catch (error) {
      //console.warn(error);
    }
  };

  const setFilteredSnippets = filteredSnippets => {
    dispatch({ type: FILTER_SNIPPETS, payload: filteredSnippets });
  };

  const setCurentView = menuName => {
    dispatch({ type: SET_SIDE_VIEW, payload: menuName });
  };

  const value = {
    state,
    loading,
    dispatch,
    setFilteredSnippets,
    setCurentView
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
