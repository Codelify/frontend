import React from "react";
import { Text, Box, IconButton, useDisclosure } from "@chakra-ui/core";
import NewSnippet from "./NewSnippet";
import { MdAddCircle } from "react-icons/md";
import { FaRegSadTear } from "react-icons/fa";
import MainLayout from "../views/layout";
import Spinner from "./~common/Spinner";
import NoSnippetView from "./NoSnippetsView";

const EmptyView = ({ loading }) => {
  const [size, setSize] = React.useState("md");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const handleClick = newSize => {
    setSize(newSize);
    onOpen();
    document.getElementById("FiHome").focus();
  };

  return (
    <MainLayout>
      {loading ? <Spinner /> : <NoSnippetView loading={loading} />}
    </MainLayout>
  );
};

export default EmptyView;
