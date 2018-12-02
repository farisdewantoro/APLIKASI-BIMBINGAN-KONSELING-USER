import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import AssignmentIcon from '@material-ui/icons/Assignment';
import QuestionIcon from '@material-ui/icons/QuestionAnswer';
import FindInPageIcon from '@material-ui/icons/FindInPage';
export const mainListItems = (
    <div>
        <ListItem button component={Link} to='/'>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to='/konsultasi'>
            <ListItemIcon>
                <FindInPageIcon />
            </ListItemIcon>
            <ListItemText primary="Konsultasi" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to='/rapotsiswa'>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Rapot Siswa" />
        </ListItem>
        <Divider />
      
    </div>
);