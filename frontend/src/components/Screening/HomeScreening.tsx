import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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

function HomeScreening() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบซักประวัติเบื้องต้น</h1>
        <h4><u>Requirements</u></h4>
        <p>
        ระบบประวัติผู้ป่วยเป็นระบบหลักที่ช่วยอำนวยความสะดวกให้บุคลากรทางการแพทย์สามารถเข้าถึงประวัติต่างๆของผู้ป่วยได้ง่าย
         โดยระบบนี้จะมีระบบย่อยต่างๆเพื่อง่ายต่อการเข้าถึงข้อมูลที่ต้องการ ซึ่งระบบซักประวัติเบื้องต้น จะบันทึกการซักประวัติเบื้องต้นของผู้ป่วย 
         อาทิ อาการสำคัญ, ความดันโลหิต, ดัชนีมวลกาย เพื่อง่ายต่อการเข้าถึงข้อมูลของผู้ป่วยและนำไปประกอบการรักษาต่อไป
        </p>
        <br />
        <h4><u>User Story</u> (ระบบซักประวัติเบื้องต้น)</h4>
        <p> 
          <b>ในบทบาทของ</b>	พยาบาล<br />
          <b>ฉันต้องการ</b>	 ให้บันทึกข้อมูลการซักประวัติเบื้องต้นของผู้ป่วยได้<br />
          <b>เพื่อ</b>	ให้สามารถบันทึกข้อมูลการซักประวัติเบื้องต้นของผู้ป่วยได้ง่าย<br />
        </p>
      </Container>
    </div>
  );
}
export default HomeScreening;