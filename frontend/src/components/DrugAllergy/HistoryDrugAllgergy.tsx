import React, {  useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from '@material-ui/core/Container';
import { format } from 'date-fns'
import { DrugAllergyInterface } from "../../model/DrugAllergyUI";



const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    container: {marginTop: theme.spacing(3)},
    paper: {padding: theme.spacing(3)},
    table: {minWidth: 650},
    tableSpace: {marginTop: 20},
    row: {'& > !': {borderBottom: 'unset'},},
  })
);


export default function HistoryDrugAllgergy() {
    const classes = useStyles();
    const [DrugAllergy, setDrugAllergy] = useState<DrugAllergyInterface[]>([]);
  
    const getDrugAllergy = async() => {
      const apiUrl = "http://localhost:8080/api/ListDrugAllergy";
      const requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",},
      };
  
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setDrugAllergy(res.data);
          } else {
            console.log("else");
          }
        });
    };
  
    useEffect(() => {
      getDrugAllergy();
    }, []);
  
    return (
      <div>
          
      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ผลการบันทึก
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/link/body"
              variant="contained"
              color="primary"

            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="5%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="10%">
                  ชื่อผู้ป่วย
                </TableCell>
                <TableCell align="center" width="10%">
                  ชื่อผู้บันทึก
                </TableCell>
                <TableCell align="center" width="12%">
                  ชื่อยา
                </TableCell>
                <TableCell align="center" width="10%">
                    อาการแพ้
                </TableCell>
                <TableCell align="center" width="12%">
                  วันที่และเวลา
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {DrugAllergy.map((item: DrugAllergyInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.MedicalRecord.Patient_Name}</TableCell>
                  <TableCell align="center">{item.Nurse.Name}</TableCell>
                  <TableCell align="center">{item.Drug.Drug_Name}</TableCell>
                  <TableCell align="center">{item.DrugAllergy}</TableCell>
                  <TableCell align="center">{format((new Date(item.AddedTime)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
      )
    }