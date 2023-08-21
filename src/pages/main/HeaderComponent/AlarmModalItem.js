import { styled } from "styled-components";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const LogBody = styled.div`
      border-bottom: solid 1px;
      font-size: 11px;
      padding: 5px;

      .rowDiv {
        display: flex;
        justify-content: space-between;
      }
`;

function AlarmModalItem(props) {
  let myLog = props.log;

  return(
    <LogBody>
      <div className="rowDiv">
        <span style={{ fontWeight: 'bold', color: 'skyblue', fontSize: '12px'}}>{myLog.t_log_type}</span>
        <div>
          <span>{myLog.t_log_date}</span>
          {myLog.t_log_state == 0 ? <PriorityHighIcon style={{color: 'red', fontSize: '17px'}} /> : null}
        </div>
      </div>
      <div className="rowDiv">
        <span>{myLog.t_log_content}</span>
      </div>
    </LogBody>
  );
}

export default AlarmModalItem;