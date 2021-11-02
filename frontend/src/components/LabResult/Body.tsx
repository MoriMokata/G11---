import React, { ChangeEvent,
    useEffect,
    useState, 
    Fragment, 
    SyntheticEvent } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Box, Paper } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { FormControl } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { MedicalRecordInterface ,
        LabresultInterface,
        LabRoomInterface,
        LabTypeInterface,
        MedicalTechInterface} from "../../model/LabResultUI";


const useStyles = makeStyles((theme: Theme) =>

    createStyles({

        root: { flexGrow: 1 },

        container: { marginTop: theme.spacing(2) },

        paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },

        table: { minWidth: 20 },

        textfield: { width: 400, },

        datefield: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },

    })
);

export default function Body() {
    useEffect(() => {
        getMedicalRecord();
        getLabRoom();
        getLabType();
      }, []);

    const classes = useStyles();
    const [Labresult,setLabresult] = useState<Partial<LabresultInterface>>({});
    const MedicalTech: MedicalTechInterface = (JSON.parse(localStorage.getItem("MedicalTech")|| ""));

    const  [AddedTime,setAddedTime] = useState<Date|null>(new Date());
    const handleAddedTime = (date: Date | null) => {
      setAddedTime(date);
    }
    
    
    const [MedicalRecord, setMedicalRecord] = useState<MedicalRecordInterface[]>([]);
    const getMedicalRecord = async() => {
        const apiUrl = "http://localhost:8080/api/ListMedicalRecord";
        const requestOptions = {
          method: "GET",
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",},
        }
    
        fetch(apiUrl, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            console.log(res.data);
            if(res.data) {
              setMedicalRecord(res.data)
            } else {
              console.log("else")
            }
          });
      }
      
      const [LabRoom, setLabRoom] = useState<LabRoomInterface[]>([]);
      const getLabRoom = async() => {
          const apiUrl = "http://localhost:8080/api/ListLabRoom";
          const requestOptions = {
            method: "GET",
            headers: { 
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",},
          }
      
          fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
              console.log(res.data);
              if(res.data) {
                setLabRoom(res.data)
              } else {
                console.log("else")
              }
            });
        }

        const [LabType, setLabType] = useState<LabTypeInterface[]>([]);
        const getLabType = async() => {
          const apiUrl = "http://localhost:8080/api/ListLabType";
          const requestOptions = {
            method: "GET",
            headers: { 
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",},
          }
      
          fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
              console.log(res.data);
              if(res.data) {
                setLabType(res.data)
              } else {
                console.log("else")
              }
            });
        }
      
      const handleLabresultChange = (event: ChangeEvent<{name?: string; value: unknown}>) => {
        const name = event.target.name as keyof typeof Labresult;
        setLabresult({...Labresult, [name]: event.target.value,});
      }; 

      /* --- SUBMIT --- */
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };
  const submitLabresult = () => {
    let data = {
	    MedicalTechID:  MedicalTech?.ID,
      MedicalRecordID:    Labresult.MedicalRecordID,
      LabTypeID:  Labresult.LabTypeID,
      Lab_Result: Labresult.Lab_Result,
	    Lab_Detail: Labresult.Lab_Detail,
	    LabRoomID:  Labresult.LabRoomID,
	    AddedTime:  AddedTime
    };

    const apiUrl = "http://localhost:8080/api/CreateLabResult";
    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",},
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
    });
  }

    return (
        <Container className={classes.container} maxWidth="md">
          <Snackbar open={success} autoHideDuration={1000} onClose={handleClose} TransitionProps={{onExit:()=>(window.location.href="/History")}}>
            <Alert onClose={handleClose} severity="success">
              บันทึกข้อมูลสำเร็จ
            </Alert>
          </Snackbar>
          <Snackbar open={error} autoHideDuration={1000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              บันทึกข้อมูลไม่สำเร็จ
            </Alert>
          </Snackbar>
            <Paper className={classes.paper}>
                <Box display="flex">
                    <Box flexGrow={1}>
                        <Typography
                            component="h2"

                            variant="h6"

                            color="primary"

                            gutterBottom
                        >
                            บันทึกผลการทดลองจากห้องปฏิบัติการ (Lab)
                        </Typography>

                    </Box>
                </Box>
                <Divider />

                <Grid container spacing={3} className={classes.root}>


                    <Grid item xs={6} alignContent="center" >
                        <p>ผู้ทำการบันทึกผลการทดลอง</p>
                        <Select variant="outlined"
                            disabled
                            defaultValue={0}
                            fullWidth
                        >
                            <MenuItem value={0}>{MedicalTech.Name}</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={6}>
                        <p>ชื่อผู้ป่วย</p>
                        <Select variant="outlined"
                            value={Labresult.MedicalRecordID}
                            inputProps={{name: "MedicalRecordID"}}
                            onChange={handleLabresultChange}
                            fullWidth
                        >
                            <MenuItem value={0} key={0}>เลือกชื่อผู้ป่วย</MenuItem>
                            {MedicalRecord.map((item: MedicalRecordInterface) => (
                              <MenuItem value={item.ID} key={item.ID}>{item.Patient_Name}</MenuItem>))}
                        </Select>
                        
                    </Grid>
                    

                    <Grid item xs={6}>
                        <p>ประเภทการตรวจ</p>
                        <Select variant="outlined"
                            value={Labresult.LabTypeID}
                            inputProps={{name: "LabTypeID"}}
                            onChange={handleLabresultChange}
                            fullWidth
                        >
                            <MenuItem value={0} key={0}>เลือกห้องปฎิบัติการ</MenuItem>
                            {LabType.map((item: LabTypeInterface) => (
                            <MenuItem value={item.ID} key={item.ID}>{item.Name}</MenuItem>))}
                        </Select>
                    </Grid>

                    <Grid item xs={6}>
                        <p>ผลการตรวจ</p>
                        <TextField 
                            id="Lab_Result"
                            type="string"
                            inputProps={{name:"Lab_Result"}}
                            value={Labresult.Lab_Result || ""}
                            onChange={handleLabresultChange}
                            fullWidth
                            variant="outlined" />
                    </Grid>

                    <Grid item xs={6}>
                        <p>รายละเอียดผลการตรวจ</p>
                        <TextField 
                            id="Lab_Detail"
                            type="string"
                            inputProps={{name:"Lab_Detail"}}
                            value={Labresult.Lab_Detail || ""}
                            onChange={handleLabresultChange}
                            fullWidth
                            variant="outlined" /> 
                    </Grid>

                    <Grid item xs={6}>
                        <p>ห้องปฎิบัติการ</p>
                            <Select variant="outlined"
                                value={Labresult.LabRoomID}
                                inputProps={{name: "LabRoomID"}}
                                onChange={handleLabresultChange}
                                fullWidth
                            >
                                <MenuItem value={0} key={0}>เลือกห้องปฎิบัติการ</MenuItem>
                                {LabRoom.map((item: LabRoomInterface) => (
                                <MenuItem value={item.ID} key={item.ID}>{item.Name}</MenuItem>))}
                            </Select>
                    </Grid>

                  
                    <Grid item xs={12}>
                        <FormControl style={{float: "right",width:400,marginRight:27 }} variant="outlined">
                          <p>วันที่และเวลาที่ทำการบันทึก</p>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDateTimePicker
                                name="WatchedTime"
                                value={AddedTime}
                                onChange={handleAddedTime}
                                minDate={new Date("2018-01-01T00:00")}
                                format="yyyy/MM/dd hh:mm a"
                            />
                            </MuiPickersUtilsProvider>
                          </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <Button 
                                variant="contained" 
                                color="primary" 
                                component={RouterLink}
                                to="/"
                                >BACK</Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button style={{ float: "right" }} 
                                variant="contained" 
                                color="primary" 
                                onClick={submitLabresult} 
                                
                                >SUBMIT</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}