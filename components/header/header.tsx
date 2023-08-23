"use client"

import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import HandymanIcon from '@mui/icons-material/Handyman';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRouter } from "next/navigation";
import { useAuth, useAuthDispatch } from "../../context/authContext";
import { Avatar, Stack } from "@mui/material";
import { UserActionType } from "../../types/intefaces";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const pages = ['Feed', 'Vehicles', 'My Profile', 'My Projects'];




export default function Header () {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter()
  const auth = useAuth()
  const authDispatch = useAuthDispatch()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (page?: string) => {
    if (page === 'personalDetails' || page === 'profilePic') {
      router.push(`/${page}`)
    }
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authDispatch({type: UserActionType.Logout, context:{}})
    localStorage.clear();
    router.push('/')

  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return(

    <AppBar position="static" sx={{zIndex: 1500}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HandymanIcon sx={{ display: { md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            onClick={(event) => {event.preventDefault(); router.push('/')}}
            sx={{
              mr: 20,
              display: { md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AutoMasterWizard
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

          </Box>

          {auth?.user ? (
          <>
          <Box sx={{flexGrow: 0}}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 0,
                display: { md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Hello, {`${auth.user.firstName}`}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>

            <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar alt={auth?.user?.firstName} 
                    src={auth?.user?.imgUrl} />
                </IconButton>
                

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={() => handleClose()}
                >
                  <MenuItem onClick={() => handleClose('personalDetails')}>Personal Details</MenuItem>
                  <MenuItem onClick={() => handleClose('profilePic')}>Profile Picture</MenuItem>
                  <MenuItem onClick={() => {
                    handleClose()
                    handleLogout()}}>
                    Logout
                  </MenuItem>
                  
                </Menu>
              </div>

          </Box> </>) 
          :(

          <Stack spacing={1} direction='row' justifyContent='center' alignItems='center'>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/login"
              sx={{
                mr: 2,
                display: { md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Login
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/signup"
              sx={{
                mr: 2,
                display: { md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Signup
            </Typography>
          </Stack>)}



        </Toolbar>
      </Container>
    </AppBar>

  )
}