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
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MenuItem } from '@material-ui/core';
import { MedicalRecordInterface } from '../../model/LabResultUI';
import { ScreeningInterface,DiseaseInterface,NurseInterface } from '../../model/ScreeningUI';
import { Select } from '@material-ui/core';
import { time } from 'console';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";




const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        root: { flexGrow: 1 },
        container: { marginTop: theme.spacing(2) },
        paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },
        table: { minWidth: 20 }
    })
);

function CreateScreening() {
    const classes = useStyles();
  
    const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof Screening;
    setScreening({
      ...Screening,
      [name]: event.target.value,
    });
  };

    const [Screening, setScreening] = useState<Partial<ScreeningInterface>>({});



    const [MedicalRecord, setMedicalRecord] = useState<MedicalRecordInterface[]>([]);
          const getMedicalRecord = async() => {
          const apiUrl = "http://localhost:8080/api/ListMedicalRecord";
          const requestOptions = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
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


        const [success, setSuccess] = useState(false);
        const [error, setError] = useState(false);
        
        const Alert = (props: AlertProps) => {
          return <MuiAlert elevation={6} variant="filled" {...props} />;
        };
        
        const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
          if (reason === "clickaway") {
            return;
          }
          setSuccess(false);
          setError(false);
        };

        //Disease
        const [Disease, setDisease] = useState<DiseaseInterface[]>([]);
          const getDisease = async() => {
          const apiUrl = "http://localhost:8080/api/ListDiseases";
          const requestOptions = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }

          fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
              console.log(res.data);
              if(res.data) {
                setDisease(res.data)
              } else {
                console.log("else")
              }
            });
        }

        //Nurse รับมาเป็น object ฝากไว้ใน losalStorage
        const Nurse: NurseInterface = (JSON.parse(localStorage.getItem("Nurse")|| ""))

        useEffect(() => {
            getMedicalRecord();
            getDisease();
            
          }, []);


          // submit
          const submit = () => {
            let data = {
                MedRecID: Screening.MedRecID,
                NurseID: Nurse?.ID,
                DiseaseID: Screening.DiseaseID,

                Symptoms: Screening.Symptoms,
                Weight:typeof Screening.Weight === "string"? parseFloat(Screening.Weight):Screening.Weight,
                Height: typeof Screening.Height === "string"? parseFloat(Screening.Height):Screening.Height,
                Temperature: typeof Screening.Temperature=== "string"? parseFloat(Screening.Temperature):Screening.Temperature,
                PulseRate: typeof Screening.PulseRate === "string"? parseInt(Screening.PulseRate):Screening.PulseRate,
                RespirationRate: typeof Screening.RespirationRate ==="string"? parseInt(Screening.RespirationRate):Screening.RespirationRate,
                SeveTime:new Date(),
            };
        
            const apiUrl = "http://localhost:8080/api/CreateScreening";
            const requestOptionsPost = {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
               },
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
          console.log(MedicalRecord)

    return (

        <Container className={classes.container} maxWidth="md">
          <Snackbar open={success} autoHideDuration={2000} onClose={handleClose} TransitionProps={{onExit: () => {window.location.href="/HistoryScreening";}}}>
            <Alert onClose={handleClose} severity="success">
               บันทึกข้อมูลสำเร็จ
            </Alert>
          </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
            <Paper className={classes.paper}>
                <Box display="flex" sx={{height: 60}}>
                    <Box flexGrow={1}>
                        <Typography
                            component="h2"
                            variant="h4"
                            color="primary"
                            gutterBottom
                        >
                            ใบบันทึกผลการซักประวัติ
                        </Typography>
                        
                    </Box>
                    <Box flexGrow={1}>
                        <Button style={{ float: "right"}} 
                            variant="outlined"
                            color="primary"

                            component={RouterLink}
                            to="/"   
                            >

                            ข้อมูลการซักประวัติ
                        </Button>
                        </Box>
                </Box>
                <Divider />


                <Grid container className={classes.root}>


                <Grid item xs={6}>
                        <p>ชื่อผู้ป่วย</p>
                        <Select
                             value={Screening.MedRecID}
                             onChange={handleChange}
                             inputProps={{
                             name: "MedRecID",
                            }}
                            style={{ width: 200 }}
                            variant = "outlined"
                        >
                            <MenuItem value={0} key={0}>เลือกชื่อผู้ป่วย</MenuItem>
                            {MedicalRecord.map((item: MedicalRecordInterface) => (
                              <MenuItem value={item.ID} key={item.ID}>{item.Patient_Name}</MenuItem>))}
                        </Select>
                </Grid>


                <Grid item xs={6}>
                        <p>Nurse</p>
                        <Select
                            
                            style={{ width: 250 }}
                            variant = "outlined"
                            defaultValue = {0}
                            disabled
                        >
                              <MenuItem value={0} >{Nurse.Name}</MenuItem>
                        </Select>
                        <p></p>
                  </Grid>
                

                    <Grid item xs={12}>
                        <p>Disease</p>
                        <Select
                             value={Screening.DiseaseID}
                             onChange={handleChange}
                             inputProps={{
                             name: "DiseaseID",
                            }}
                            style={{ width: 200 }}
                            variant = "outlined"
                        >
                            <MenuItem value={0} key={0}>เลือกโรค</MenuItem>
                            {Disease.map((item: DiseaseInterface) => (
                              <MenuItem value={item.ID} key={item.ID}>{item.Name}</MenuItem>))}
                        </Select>
                        <p></p>
                    </Grid>
                
                    <Grid item xs={12}>
                        <p>อาการสำคัญ</p>
                        <TextField
                            fullWidth
                            multiline rows = {3}
                            variant="outlined"
                            placeholder="อาการที่ทำให้ต้องมาโรงพยาบาล" 

                            id = "Symptoms"
                            type = "string"
                            inputProps = {{name:"Symptoms"}}
                            value = {Screening.Symptoms}
                            onChange={handleChange}       
                        />

                    </Grid>


                    <Grid item xs={6}>
                        <p>น้ำหนัก</p>
                        <TextField 
                        variant="outlined" 
                        placeholder="kg" 
                        
                        id = "Weight"
                        type = "number"
                        inputProps = {{name:"Weight"}}
                        value = {Screening.Weight}
                        onChange={handleChange}
                        
                        />
                    </Grid>


                    <Grid item xs={6}>
                        <p>ส่วนสูง</p>
                        <TextField 
                        variant="outlined" 
                        placeholder="cm" 

                        id = "Height"
                        type = "number"
                        inputProps = {{name:"Height"}}
                        value = {Screening.Height}
                        onChange={handleChange}
                        
                        
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <p>อุณหภูมิ</p>
                        <TextField 
                        variant="outlined" 
                        placeholder="°C" 
                        
                        id = "Temperature"
                        type = "number"
                        inputProps = {{name:"Temperature"}}
                        value = {Screening.Temperature}
                        onChange={handleChange}
                        />
                    </Grid>

                    
                    <Grid item xs={6}>
                        <p>Pulse Rate</p>
                        <TextField 
                        variant="outlined" 
                        placeholder="bpm" 
                        
                        id = "PulseRate"
                        type = "number"
                        inputProps = {{name:"PulseRate"}}
                        value = {Screening.PulseRate}
                        onChange={handleChange}
                        />
                        
                    </Grid>

                    <Grid item xs={6}>
                        <p>Respiration Rate</p>
                        <TextField 
                        variant="outlined" 
                        placeholder="bpm " 
                        
                        id = "RespirationRate"
                        type = "number"
                        inputProps = {{name:"RespirationRate"}}
                        value = {Screening.RespirationRate}
                        onChange={handleChange}
                        />
                        
                    </Grid>
                    
                    

                    <Grid item xs={12}>
                        <Button style={{ float: "right" , marginTop: 30}}
                            variant="contained"
                            color="primary"
                            onClick={submit}
                            >

                            บันทึก
                        </Button>
                        <Button style={{ float: "left", marginTop: 30 }}
                            variant="contained"
                            color="inherit"

                            component={RouterLink}
                            to="/Nbody"   
                            >

                            กลับ
                        </Button>

                        
                    </Grid>
                </Grid>
            </Paper>
        </Container>

    )
}

export default CreateScreening;