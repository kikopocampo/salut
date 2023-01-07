import { useState } from "react";
import { NextLinkComposed } from "../../src/Link";
import { signOut } from "next-auth/react";

import { Logout, Bookmarks, Liquor, Dashboard } from "@mui/icons-material";

import {
  Avatar,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";

function StyledAvatar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Account">
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar alt={props.name} src={props.image} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <IconButton
            component={NextLinkComposed}
            to={{
              pathname: "/user",
            }}
          >
            <ListItemIcon>
              <Dashboard fontSize="small" />
            </ListItemIcon>
            Dashboard
          </IconButton>
        </MenuItem>

        <MenuItem>
          <IconButton
            component={NextLinkComposed}
            to={{
              pathname: "/user/favorites",
            }}
          >
            <ListItemIcon>
              <Bookmarks fontSize="small" />
            </ListItemIcon>
            Favorites
          </IconButton>
        </MenuItem>

        <MenuItem>
          <IconButton
            component={NextLinkComposed}
            to={{
              pathname: "/user/inventory",
            }}
          >
            <ListItemIcon>
              <Liquor fontSize="small" />
            </ListItemIcon>
            Inventory
          </IconButton>
        </MenuItem>
        <Divider />
        <MenuItem>
          <IconButton onClick={() => signOut({ callbackUrl: "/" })}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </IconButton>
        </MenuItem>
      </Menu>
    </>
  );
}

export default StyledAvatar;
