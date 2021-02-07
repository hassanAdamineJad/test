import React, { useContext } from "react";
//Store
import { store } from "../../store/store";
import { CHANGE_RESULT } from "../../store/constant";
//UI
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
//Helper
import { onlyUniqueArray } from "../../utils/helper";

// Styles
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },

    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const handleSearch = (e) => {
    const keyword = e.target.value;
    dispatch({
      type: CHANGE_RESULT,
      value: searchArrayWithKeyAndKeyword(state.city, "city", keyword)
        .concat(searchArrayWithKeyAndKeyword(state.city, "admin_name", keyword))
        .filter(onlyUniqueArray),
    });
  };

  const searchArrayWithKeyAndKeyword = (array, key, keyword) => {
    return array.filter(
      (item) =>
        String(item[key]).toLowerCase().indexOf(keyword.toLowerCase()) > -1
    );
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              onChange={handleSearch}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton> */}
          </div>
          <div className={classes.sectionMobile}>
            {/* <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton> */}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
