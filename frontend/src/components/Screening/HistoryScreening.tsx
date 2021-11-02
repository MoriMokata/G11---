import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ScreeningInterface } from "../../model/ScreeningUI";
import { format } from 'date-fns'
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function PreloadScreenings() {
  const classes = useStyles();
  const [Screenings, setScreenings] = useState<ScreeningInterface[]>([]);
  const apiUrl = "http://localhost:8080/api/ListScreenings";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getScreeningInter = async () => {
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setScreenings(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getScreeningInter();
  }, []);

  return (
    <div>
      <Container className={classes.container} maxWidth = "xl" >
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h4"
              color="primary"
              gutterBottom
            >
              ข้อมูลการซักประวัติ
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/CreateScreening"
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
                <TableCell align="center" width="15%">
                  ชื่อผู้ป่วย
                </TableCell>
                <TableCell align="center" width="10%">
                  โรค
                </TableCell>
                <TableCell align="center" width="20%">
                  อาการสำคัญ
                </TableCell>
                <TableCell align="center" width="5%">
                  น้ำหนัก
                </TableCell>
                <TableCell align="center" width="5%">
                  ส่วนสูง
                </TableCell>
                <TableCell align="center" width="5%">
                  อุณหภูมิ
                </TableCell>
                <TableCell align="center" width="5%">
                PulseRate
                </TableCell>
                <TableCell align="center" width="5%">
                RespirationRate
                </TableCell>
                <TableCell align="center" width="15%">
                  ผู้บันทึก
                </TableCell>
                <TableCell align="center" width="20%">
                  วันที่และเวลา
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Screenings.map((item: ScreeningInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.MedRec.MedRecOfficer_Name}</TableCell>
                  <TableCell align="center">{item.Disease.Name}</TableCell>
                  <TableCell align="center">{item.Symptoms}</TableCell>
                  <TableCell align="center">{item.Weight}</TableCell>
                  <TableCell align="center">{item.Height}</TableCell>
                  <TableCell align="center">{item.Temperature}</TableCell>
                  <TableCell align="center">{item.PulseRate}</TableCell>
                  <TableCell align="center">{item.RespirationRate}</TableCell>
                  <TableCell align="center">{item.Nurse.Name}</TableCell>
                  <TableCell align="center">{moment(item.SeveTime).format("YYYY-MM-DDTHH:mm")}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default PreloadScreenings;