import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from '@material-ui/core/Grid';

import { SigninInterface } from "../model/ISignin";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    
    marginTop: theme.spacing(1),
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  radio: {
    textAlign: "center",
    marginTop: theme.spacing(1),
  },

}));

function SignIn() {
  const classes = useStyles();
  const [signin, setSignin] = useState<Partial<SigninInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const login = () => {

    //Role MedicalTech
    if(signin.Role=="MedicalTech"){
    const apiUrl = "http://localhost:8080/api/LoginMedicalTech";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signin),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("MedicalTech",JSON.stringify(res.data.medicaltech));
          window.location.reload()
        } else {
          setError(true);
        }
      });

      //Role MedicalRecordOfficer
    }else if(signin.Role=="MedicalRecordOfficer"){
      const apiUrl = "http://localhost:8080/api/LoginMedicalRecordOfficer";
      const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signin),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("MedicalRecordOfficer",JSON.stringify(res.data.medicalrecordofficer));
          window.location.reload()
        } else {
          setError(true);
        }
      });

      //Role Nurse
    }else if(signin.Role=="Nurse"){
      const apiUrl = "http://localhost:8080/api/LoginNurse";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signin),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("Nurse",JSON.stringify(res.data.nurses));
          window.location.reload()
        } else {
          setError(true);
        }
      });

      //Role Doctor
    }else if(signin.Role=="Doctor"){
      const apiUrl = "http://localhost:8080/api/LoginDoctor";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signin),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("Doctor",JSON.stringify(res.data.doctor));
          window.location.reload()
        } else {
          setError(true);
        }
      });
      }
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSignin({ ...signin, [id]: value });
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleRoleChange = (event: React.ChangeEvent<{ value: any }>) => {
    let value = event.target.value;
    setSignin({ ...signin, Role: value })
    localStorage.setItem("Role", value);
  }


  return (
    <Container component="main" maxWidth="lg">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          เข้าสู่ระบบสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          อีเมลหรือรหัสผ่านไม่ถูกต้อง
        </Alert>
      </Snackbar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in

        </Typography>
        <RadioGroup row aria-label="role" 
            name="row-radio-buttons-group" 
            onChange={handleRoleChange} 
            value={signin.Role} 
            className={classes.radio}
          >
            <FormControlLabel 
              value="MedicalRecordOfficer" 
              control={<Radio color="primary" />} 
              label="MedicalRecordOfficer"
            />
            <FormControlLabel 
              value="Nurse" 
              control={<Radio color="primary" />} 
              label="Nurse" 
            />
            <FormControlLabel 
              value="Doctor" 
              control={<Radio color="primary" />} 
              label="Doctor" 
            />
            <FormControlLabel 
              value="MedicalTech" 
              control={<Radio color="primary" />} 
              label="MedicalTech"
            />
          </RadioGroup>

            
        <form className={classes.form} noValidate >
        <Grid item xs={3} className={classes.form} >
          <TextField
            variant="outlined"
            style={{ width: 400 }}
            margin="normal"
            required
            fullWidth
            id="Email"
            label="Email Address"
            name="Email"
            autoComplete="email"
            autoFocus
            value={signin.Email || ""}
            onChange={handleInputChange}
          />
          </Grid>
          <Grid item xs={3}>
          <TextField
            variant="outlined"
            style={{ width: 400 }}
            margin="normal"
            required
            fullWidth
            name="Pass"
            label="PassWord"
            type="password"
            id="Pass"
            autoComplete="current-pass"
            value={signin.Pass || ""}
            onChange={handleInputChange}
          />
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={login}
            
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default SignIn;