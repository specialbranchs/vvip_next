"use client";
import { Box, ListItemButton, Toolbar, Typography } from "@mui/material";
import actions from "../../state/actions";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { RootState } from "../../state/reducer";
import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { sxStyle } from "@/extra/utils/config";
import { User } from "@/extra/typings/structures";
import { useRouter } from "next/navigation";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Topbar = () => {
  const dispatch = useDispatch();
  const route=useRouter()
  const user = useSelector(
    (state: RootState) => state.currentUser.user
  ) as User;
  return (
    <Toolbar
      sx={{
        // mr: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontFamily: sxStyle.fontFamily,
          }}
        >
          {user && user.email}
        </Typography>
      </Box>
      <Box ml={2}>
        <ListItemButton
          sx={{
            borderRadius: 10,
            fontFamily: sxStyle.fontFamily,
            fontSize: 14,
            backgroundColor: "#aa94d6",
            color: "white",
            fontWeight: "100",
          }}
          onClick={() => {
              route.push('/login')
            dispatch(actions.user.removeUser());
          }}
        >
          LOGOUT
        </ListItemButton>
      </Box>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          // sx={sxStyle}
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </Toolbar>
  );
};

export default Topbar;
