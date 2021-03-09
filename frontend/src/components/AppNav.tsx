import { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
      color: "white"
    }
  }),
);

type NavProps = {
  title: string
};

const AppNav = ({ title }: NavProps) => {
  const classes = useStyles();
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);

  const onLogin = () => {
    // setLoggedIn(!loggedIn);
  };

  const onLogout = () => {
    setLoggedIn(!loggedIn);
    history.push("/");
  };

  const onRegister = () => {

  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {
            !loggedIn ?
              <>
                <Link to="/login"><Button className={classes.link} onClick={onLogin}>Login</Button></Link>
                <Link to="/register"><Button className={classes.link} onClick={onRegister}>Register</Button></Link>
              </> : <>
              <Button className={classes.link} onClick={onLogout}>Logout</Button>
              </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppNav;