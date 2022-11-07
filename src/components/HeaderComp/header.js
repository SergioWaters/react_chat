import React from 'react';
import { Link } from 'react-router-dom';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core/';
import { RateReview, AccountCircle, Mail, MoreVert } from '@material-ui/icons';
import { signOut } from 'firebase/auth'
import { auth } from "../../api/firebase";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
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
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export const Header = ({ session }) => {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <>
      {session ? <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem>
          {session?.displayName || session?.email}
        </MenuItem>
        <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <MenuItem onClick={handleMenuClose}>Edit Profile</MenuItem>
        </Link>
        <MenuItem onClick={() => { handleMenuClose(); signOut(auth) }}>LogOut</MenuItem>
      </Menu> :
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}  >
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <MenuItem onClick={handleMenuClose}>Log In</MenuItem>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <MenuItem onClick={handleMenuClose}>Sign Up</MenuItem>
          </Link>
        </Menu>
      }
    </>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <>{
      session ?
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
              <p>Profile</p>
            </MenuItem >
          </Link>
          <Link to="/chat" style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem>
              <IconButton color="inherit">
                <Mail />
              </IconButton>
              <p>Messages</p>
            </MenuItem>
          </Link>
          <Link to='/chat/create' style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem>
              <IconButton color="inherit">
                <RateReview />
              </IconButton>
              <p>Create</p>
            </MenuItem>
          </Link>
        </Menu > :
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem onClick={handleMenuClose}>Log In</MenuItem>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem onClick={handleMenuClose}>Sign Up</MenuItem>
          </Link>
        </Menu >
    }</>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {new Intl.DateTimeFormat("ru-RU").format(Date.now())}
          </Typography>
          <Link to="/gists" style={{ textDecoration: 'none', color: 'inherit', marginLeft: '10px' }}>
            Gist
          </Link>
          <Link to="/axios" style={{ textDecoration: 'none', color: 'inherit', marginLeft: '10px' }}>
            AxiosGist
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" onClick={handleProfileMenuOpen}>
              <AccountCircle />
            </IconButton>
            <Link to="/chat" style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton color="inherit">
                <Mail />
              </IconButton>
            </Link>
            <Link to='/chat/create' style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton color="inherit">
                <RateReview />
              </IconButton>
            </Link>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreVert />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div >
  );
}
