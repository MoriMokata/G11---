import React, { Fragment, useEffect, useState } from "react";
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
import moment from 'moment';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import { format } from 'date-fns'

import { LabresultInterface } from "../../model/LabResultUI";

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    container: {marginTop: theme.spacing(3)},
    paper: {padding: theme.spacing(3)},
    table: {minWidth: 650},
    tableSpace: {marginTop: 20},
    row: {'& > !': {borderBottom: 'unset'},},
  })
);

export default function History() {
    const classes = useStyles();
    const [LabResult, setLabResult] = useState<LabresultInterface[]>([]);
  
    const getLabResult = async() => {
      const apiUrl = "http://localhost:8080/api/ListLabResult";
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",},
      };
  
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setLabResult(res.data);
          } else {
            console.log("else");
          }
        });
    };
  
    useEffect(() => {
      getLabResult();
    }, []);
  
    return (
      <div>
      <Container className={classes.container} maxWidth="lg">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ผลการทดลองจากห้องปฏิบัติการ
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
                  ชื่อผู้บันทึก
                </TableCell>
                <TableCell align="center" width="10%">
                  ชื่อผู้ป่วย
                </TableCell>
                <TableCell align="center" width="12%">
                  ประเภทการตรวจ
                </TableCell>
                <TableCell align="center" width="10%">
                  ผลการตรวจ
                </TableCell>
                <TableCell align="center" width="10%">
                  รายละเอียด
                </TableCell>
                <TableCell align="center" width="12%">
                  ห้องปฎิบัติการ
                </TableCell>
                <TableCell align="center" width="12%">
                  วันที่และเวลา
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {LabResult.map((item: LabresultInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.MedicalTech.Name}</TableCell>
                  <TableCell align="center">{item.MedicalRecord.Patient_Name}</TableCell>
                  <TableCell align="center">{item.LabType.Name}</TableCell>
                  <TableCell align="center">{item.Lab_Result}</TableCell>
                  <TableCell align="center">{item.Lab_Detail}</TableCell>
                  <TableCell align="center">{item.LabRoom.Name}</TableCell>
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