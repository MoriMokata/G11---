import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import HomeIcon from "@material-ui/icons/Home";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import History from '@material-ui/icons/Book';
import Divider from "@material-ui/core/Divider";
import HistoryDrugAllgergy from '../DrugAllergy/HistoryDrugAllgergy';
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
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
      list: { width: 300 },
  }),
);






export default function ButtonAppBar() {
  const classes = useStyles();

  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  
  const menu = [
    { name: "ระบบการซักประวัติเบื้องต้น", icon: <HomeIcon />, path: "/" },
    { name: "ข้อมูลการซักประวัติเบื้องต้น", icon: <History />, path: "/HistoryScreenings" },
    { name: "บันทึกผลการซักประวัติเบื้องต้น", icon: <AssignmentIcon  />, path: "/CreateScreening" },
  ]

  const menu2 = [
    { name: "ระบบประวัติการแพ้ยา", icon: <HomeIcon />, path: "/" },
    { name: "ข้อมูลประวัติการแพ้ยา", icon: <History />, path: "/HistoryDrugAllgergy" },
    { name: "บันทึกประวัติการแพ้ยา", icon: <AssignmentIcon  />, path: "/CreateDrugAllergy" },
  ]


  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = (state: boolean) => (event: any) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpenDrawer(state);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <IconButton 
            onClick={toggleDrawer(true)} 
            edge="start" 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>          
          <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
            <List 
              className={classes.list} 
              onClick={toggleDrawer(false)} 
              onKeyDown={toggleDrawer(false)}
            >
              
              {menu.map((item, index) => (
                <ListItem key={index} button component={RouterLink} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.name}</ListItemText>
                </ListItem>
              ))}
                <Divider />
                {menu2.map((item, index) => (
                <ListItem key={index} button component={RouterLink} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.name}</ListItemText>
                </ListItem>
                
              ))}
              <Divider />
              <ListItem button onClick={signout}>
              <ListItemIcon> <ExitToAppIcon/></ListItemIcon>
              <ListItemText>SignOut</ListItemText>
              </ListItem>
              
            </List>
          </Drawer>

          <Typography variant="h6" className={classes.title}>
          ระบบย่อย: ระบบซักประวัติเบื้องต้น
          
          </Typography>

          <Button style={{ float: "right"}} 
            
            variant="contained"
            color="primary"
            
            onClick={signout}
          >
            Sign out
          </Button>
          
        </Toolbar>
        
      </AppBar>
    </div>
  );
}