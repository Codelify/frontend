import React, { useEffect } from "react";
import {
  Box,
  useDisclosure,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text
} from "@chakra-ui/core";
import NewSnippet from "./NewSnippet";
import DialogModal from "./DialogModal";
import { MdAdd } from "react-icons/md";
import {
  FaRegNewspaper,
  FaGithubAlt,
  FaSurprise,
  FaSmile
} from "react-icons/fa";
import useUserData from "./~common/useUserData";
import useSyncGist from "../hooks/useSyncGist";

const AddSnippetMenu = () => {
  const { results } = useUserData();

  const [size, setSize] = React.useState("md");
  const [isAlert, setIsAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [isGitSynching, setIsGistSynching] = React.useState(false);
  const [isSyncError, setIsSyncError] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { gitUsername = "", gitAccessToken = "" } = results;
  const isLogedInWithGit = gitUsername && gitAccessToken;
  const syncGistSnippet = useSyncGist({ gitUsername, gitAccessToken });

  const firstField = React.useRef();
  const handleClick = newSize => {
    setSize(newSize);
    onOpen();
    document.getElementById("FiHome").focus();
  };

  const handleGistSync = () => {
    setIsAlert(true);
    setIsGistSynching(true);
  };

  useEffect(() => {
    async function triggerGitSync() {
      if (!isLogedInWithGit) {
        setIsGistSynching(false);
        setIsSyncError(true)
        setAlertMessage(
          "You must be logged in with Github for this feature to work"
        );
      } else {
        setAlertMessage("Wiring Github, synching in progress ...");
        const attemptToSynch = await syncGistSnippet();
        if (attemptToSynch) {
          setAlertMessage("Congratulation your Gists have been imported");
        } else {
          setAlertMessage("Ooops an error occured linking to gist");
          setIsSyncError(true)
        }
        setIsGistSynching(false);
      }
    }
    if (isGitSynching) {
      triggerGitSync();
    }
  }, [isGitSynching, isLogedInWithGit, syncGistSnippet]);

  return (
    <>
      <Menu autoSelect={false}>
        <MenuButton
          variant="ghost"
          as={Button}
          aria-label="Add new Snippet"
          _focus={{
            outline: "none"
          }}
          p={0}
          m={0}
        >
          <Box as={MdAdd} size="32px" />
        </MenuButton>
        <MenuList placement="bottom-end">
          <MenuItem
            onClick={() => {
              handleClick("full");
            }}
          >
            <Box mx="8px" as={FaRegNewspaper} size="16px" />
            <Text>New Snippet</Text>
          </MenuItem>
          <MenuItem onClick={handleGistSync}>
            <Box mx="8px" as={FaGithubAlt} size="16px" />
            <Text>Import from Gist</Text>
          </MenuItem>
        </MenuList>
      </Menu>
      <NewSnippet
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        firstField={firstField}
        size={size}
        setSize={setSize}
      />
      <DialogModal
        isOpen={isAlert}
        onClose={() => {
          setIsAlert(false);
          setIsGistSynching(false);
        }}
        dialogContent={alertMessage}
        dialogIcon={
          isGitSynching 
            ? null 
            : !isLogedInWithGit 
              ? FaSurprise
              : isSyncError
                ? FaSurprise
                : FaSmile
        }
        spinner={isGitSynching}
        isError={isSyncError}
        cancelButton="OK"
      />
    </>
  );
};

export default AddSnippetMenu;
