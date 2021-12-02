import React, { useState } from "react";
import "./Header.css";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import AppsIcon from "@material-ui/icons/Apps";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useHistory, Link } from "react-router-dom";
import youtubeLogo from "../../images/logo.png";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import { isAuth, signout } from "../../actions/auth";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  let history = useHistory();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleLogout = () => {
    signout(() => {
      history.push("/signin");
    });
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      {isAuth() ? (
        <>
          <DialogTitle id="simple-dialog-title">Your Account</DialogTitle>
          <List>
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={isAuth() && isAuth().email} />
            </ListItem>

            <ListItem
              autoFocus
              button
              onClick={() => handleListItemClick("addAccount")}
            >
              <ListItemAvatar onClick={handleLogout}>
                <Avatar>
                  <ExitToAppIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Logout" onClick={handleLogout} />
            </ListItem>
          </List>
        </>
      ) : (
        <>
          <List>
            <ListItem
              autoFocus
              button
              onClick={() => handleListItemClick("addAccount")}
            >
              <ListItemText
                primary="Sign In"
                onClick={(e) => history.push("/signin")}
              />
            </ListItem>
          </List>
        </>
      )}
    </Dialog>
  );
}

const Header = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    history.push(`/search/${inputSearch}`);
  };

  return (
    <div className="header">
      <div className="header__left">
        <MenuIcon />
        <Link to="/">
          <img className="header__logo" src={youtubeLogo} alt="yt_logo" />
        </Link>
      </div>
      <form className="header__input" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setInputSearch(e.target.value)}
          value={inputSearch}
          placeholder="Search"
          type="text"
        />
        <Link to={`/search/${inputSearch}`}>
          <SearchIcon className="header__inputButton" />
        </Link>
      </form>

      <div className="header__icons">
        {isAuth() ? (
          <>
            <VideoCallIcon
              style={{ cursor: "pointer" }}
              className="header__icon"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            />
            <AppsIcon className="header__icon" />
            <NotificationsIcon className="header__icon" />
            <Avatar
              style={{ cursor: "pointer" }}
              onClick={handleClickOpen}
              src={isAuth() && isAuth().image && isAuth().image}
            />
            <SimpleDialog open={open} onClose={handleClose} />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  history.push("/video/upload");
                }}
              >
                Upload Video
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <VideoCallIcon
              style={{ cursor: "pointer" }}
              className="header__icon"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            />
            <AppsIcon className="header__icon" />
            <NotificationsIcon className="header__icon" />
            <Avatar style={{ cursor: "pointer" }} onClick={handleClickOpen} />
            <SimpleDialog open={open} onClose={() => setAnchorEl(null)} />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => history.push("/signin")}>
                Sign In
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
