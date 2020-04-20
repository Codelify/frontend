import axios from 'axios';
import { useMutation } from "@apollo/react-hooks";
import { CREATE_SNIPPET } from "../graphql/mutation";
import { MY_SNIPPETs } from "../graphql/query";
import {
    useToast
  } from '@chakra-ui/core';

export default function useSyncGist({gitUsername = '', gitAccessToken = '' }) {

    const [createSnippet] = useMutation(CREATE_SNIPPET);
    const toastin = useToast();
    const token = window.localStorage.getItem("token");
    const syncGist = async () => {

        if (gitUsername && gitAccessToken) {
          const response = await axios.get(
            `https://cors-anywhere.herokuapp.com/https://api.github.com/users/${gitUsername}/gists`,
            {
              headers: {
                Accept: 'application/json',
                Authorization: `token ${gitAccessToken}`,
              },
            },
          );
          if (response.status === 200 && response.data.length) {
            response.data.forEach(async (gist) => {
              const res = await axios.get(
                `https://cors-anywhere.herokuapp.com/https://api.github.com/gists/${gist.id}`,
                {
                  headers: {
                    Accept: 'application/json',
                    Authorization: `token ${gitAccessToken}`,
                  },
                },
              );
               if (res.status === 200 && res.data) {
                 //save to db
            
                 const { description, files } = res.data
                 const [file] = Object.keys(files)
                 const content = files[file].content
                 const lang = files[file].language
                 const variables = {
                   input: {
                    description,
                    title: file,
                    content: content,
                    lang,
                    gistId: gist.id,
                   },
                   token,
                 }
                 
                 await createSnippet({
                  variables,
                  //fetchPolicy: "no-cache",
                  refetchQueries: [{ query: MY_SNIPPETs, variables: { token }}]
                });
               }
             
            });
            toastin({
              position: "top-right",
              title: "Yooohooo ! 🍹",
              description: "Your snippet has been Synced from Gist",
              status: "success",
              duration: 9000,
              isClosable: true
            });
          }
        }
      };
      return syncGist
}
