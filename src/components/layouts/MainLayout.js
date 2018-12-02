import React from 'react';
import { compose } from "redux";
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import MenuIcon from '@material-ui/icons/Menu';
import FaceIcon from '@material-ui/icons/Face';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Link } from 'react-router-dom';
import { mainListItems } from './ListItem.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutMurid } from '../../actions/authActions';

import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';

const drawerWidth = 260;
const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        whiteSpace: 'nowrap',
        width: drawerWidth,
        flexShrink: 0,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1, //agar z index MainLayout lebih tinggi dari navbar
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar:theme.mixins.toolbar,
    
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 5,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth+40,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    grow: {
        flexGrow: 1,
    },
 
});

class MainLayout extends React.Component {
    constructor() {
        super();
        this.state = {
            open: true,
            Menu: [
                { title: "Dashboard", icon: "DashboardIcon", link: "/" },
                { title: "Inbox", icon: "MenuIcon", link: "/inbox" },
            ],
        };
    }
    handleDrawerOpen = () => {
        this.setState({ open: !this.state.open });
    };
    onLogoutClick = () => {
        this.props.logoutMurid();
    }
    

    render() {

        const { classes } = this.props;
        const { open } = this.state;
        const {  murid } = this.props.auth;
       
        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}  >
                    <Toolbar disableGutters={!this.state.open} className={classes.toolbar} >
                   
                        <IconButton  onClick={this.handleDrawerOpen} className={classNames(
                            classes.menuButton,
                            this.state.open && classes.menuButtonHidden,
                        )} color="inherit" aria-label="Open drawer">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Bimbingan Konseling
                    </Typography>
                 
                        <div className={classes.grow} />
                      
                        <Button
                            color="inherit"
                            component={Link} to='/login'

                            style={{ textTransform: "none" }}
                         
                        >
                     
                        <PowerSettingsNewIcon />
                            <Typography variant="subtitle1" color="inherit" onClick={this.onLogoutClick} style={{marginLeft:10}}>
                                Logout
                        </Typography>
                        </Button>
                  
                        
                 
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawerPaper}
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
                    }}
                >
                    <div className={classes.toolbar} />
                    <List >
                        {mainListItems}
                    </List>
                    <div />
                </Drawer>
                <main className={classNames(classes.content, {
                    [classes.contentShift]: open,
                })}>
                <div style={{marginTop:40}}>
                   {this.props.children}
                </div>
                
                </main>

            </div>
        );
    }
}

MainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
    logoutMurid:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired

};

const mapStateToProps = (state) => ({
    auth: state.auth,
    classes: state.classes
});

// Menggunakan library recompose
// export default withStyles(styles)(MainLayout);

// Menggunakan library recompose
export default compose(
    connect(mapStateToProps, { logoutMurid}),
)(withStyles(styles)(MainLayout));


// // Menggunakan library recompose
// export default compose(
//     withStyles(styles, { name: 'Login' }),
//     connect(mapStateToProps, { loginmurid })
// )(Login); 