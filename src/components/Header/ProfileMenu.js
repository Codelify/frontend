import React from "react";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text
} from "@chakra-ui/core";
import { FaUserAlt, FaRegUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { navigate } from "@reach/router";
import useUserData from "../~common/useUserData";

/**
 * Render the Profile Menu/option from the avatar icon in the header
 * Does not that any paramters
 */

const ProfileMenu = () => {
  const { results } = useUserData();
  const avatar = results.avatar;

  const onLogout = () => {
    // delete token
    window.localStorage.removeItem("token");
    // then direct to landing page
    navigate("/");
  };

  return (
    <Menu autoSelect={false}>
      <MenuButton
        mx="3px"
        variant={avatar !== "" ? "unstyled" : "ghost"}
        as={Button}
        _focus={{
          outline: "none"
        }}
      >
        {avatar !== "" ? (
          <Avatar showBorder={true} size="sm" name="" src={avatar} />
        ) : (
          <Box as={FaUserAlt} />
        )}
      </MenuButton>
      <MenuList placement="bottom-end">
        <MenuItem
          onClick={() => {
            navigate("/profile");
          }}
        >
          <Box mx="8px" as={FaRegUser} size="16px" />
          <Text>Profile</Text>
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <Box mx="8px" as={AiOutlineLogout} size="16px" />
          <Text>Logout</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
