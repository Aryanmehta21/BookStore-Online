import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";
import logo from "../../assets/circles.png";
import useStyles from "./styles";
import { useAuth0 } from "@auth0/auth0-react";
import { StyledButton } from './Style';

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h5"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="Book Store App"
              height="50px"
              className={classes.image}
            />
            <strong>BookStore</strong>
          </Typography>

          <div className={classes.grow} />
          <div className={classes.button}>
            <IconButton
              component={Link}
              to="/cart"
              aria-label="Show cart items"
              color="inherit"
            >
              {
                isAuthenticated ? <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge> : <ShoppingCart/>
              }
              
            </IconButton>
            
            {isAuthenticated ? (
              
              <StyledButton
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </StyledButton>
            ) : (
              <StyledButton onClick={() => loginWithRedirect()}>Log In</StyledButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
