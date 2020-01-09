import React from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import GoogleLogin from "react-google-login";
import { Button } from "@chakra-ui/core";
import { navigate } from "@reach/router";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import { CREATE_SNIPPET } from "../graphql/mutation";
const LOGIN_WITH_GOOGLE = gql`
  mutation authWithGoogle($input: RegisterInput!) {
    authWithGoogle(input: $input) {
      email
      token
      firstName
      lastName
      avatar
    }
  }
`;

export default function GoogleButton() {
  const [login] = useMutation(LOGIN_WITH_GOOGLE);
  const [createSnippet] = useMutation(CREATE_SNIPPET);

  const responseGoogle = async response => {
    const { profileObj } = response;
    if (profileObj) {
      const {
        googleId: password,
        givenName: firstName,
        familyName: lastName,
        email,
        imageUrl: avatar
      } = profileObj;
      try {
        const { data, error } = await login({
          variables: {
            input: { firstName, lastName, email, password, avatar }
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
              toast("Snippet successfully save 🍹");
            }
            if (error) {
              toast.error("Oops, an error occurred trying to save snippet 😔");
            }
          }
          navigate("/app");
        }
        navigate("/app");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      render={renderProps => (
        <Button
          as="a"
          size="lg"
          href="#"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          leftIcon={props => <AiOutlineGoogle size="1.5em" {...props} />}
        >
          Sign In
        </Button>
      )}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
}
