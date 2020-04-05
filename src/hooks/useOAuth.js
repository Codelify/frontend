
import { useMutation } from "@apollo/react-hooks";
import { useToast } from "@chakra-ui/core";
import { navigate } from "@reach/router";
import { LOGIN_WITH_GOOGLE, CREATE_SNIPPET } from "../graphql/mutation";

import { handleRouteChange } from "../utils/handleRouteChange";

export default function useOAuth() {
  const [OAuth ] = useMutation(LOGIN_WITH_GOOGLE);
  const [createSnippet] = useMutation(CREATE_SNIPPET);
  const toasting = useToast();

  const login = async user => {
    try {
      const { data } = await OAuth({
        variables: {
          input: user
        }
      });
      if (data) {
        localStorage.setItem("token", data.authWithGoogle.token);
        if (localStorage.getItem("snippetData")) {
          const snippetData = {
            ...JSON.parse(
              typeof window !== "undefined" &&
                window.localStorage.getItem("snippetData")
            ),
            token: data.authWithGoogle.token
          };
          const { data: res, error } = await createSnippet({
            variables: snippetData
          });
          if (res) {
            typeof window !== "undefined" &&
              window.localStorage.removeItem("snippetData");
            toasting({
              position: "top-right",
              title: "Yooohooo ! 🍹",
              description: "Your snippet has been saved",
              status: "success",
              duration: 9000,
              isClosable: true
            });
          }
          if (error) {
            toasting({
              position: "top-right",
              title: "An error occurred.",
              description: "Unable to create this snippet.",
              status: "error",
              duration: 9000,
              isClosable: true
            });
          }
        }
        navigate(handleRouteChange());
      }
      navigate(handleRouteChange());
    } catch (error) {
      console.log(error);
    }
  };

  return [login]
}

