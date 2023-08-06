import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import axiosApi from "../../AxiosApi";
import { clearChosenOnes, pushSwitch } from "../../store";
import Swal from "sweetalert2";

const ActionFooterBar = styled.div`
    .wrappingActionFooterBarO{
      position: fixed;
      left: 0px;
      padding: 12px 0px;
      background: rgb(80, 89, 108);
      right: 0px;
      bottom: 0px;
      z-index: 50;
      min-height: 31px;
      // visibility: visible;
      transform: translateY(0); /* 초기 위치 */
      transition: transform 0.4s;
    }
    .wrappingActionFooterBarX{
      position: fixed;
      left: 0px;
      padding: 12px 0px;
      background: rgb(80, 89, 108);
      right: 0px;
      bottom: 0px;
      z-index: 50;
      // visibility: hidden;
      transform: translateY(100%); /* 완전히 숨길 위치 (예를 들어, 100%로 설정) */
      transition: transform 0.4s;
    }
    .howManyHaveBeenChosen{
      display: block;
      float: left;
      min-width: 230px;
      padding: 4px 30px 4px 78px;
      white-space: nowrap;
    }
    .chosenOnes{
      font-size: 14px;
      color: rgb(255, 255, 255);
    }
    .chosenOnes > em{
      color: rgb(26, 224, 237);
      font-style: normal;
      padding-right: 10px;
    }
    .buttonBoxOfTheChosen{
      float: right;
      margin-right: 5px;
    }
    .adjustmentButtonBox{
      margin-right:30px;
    }
    .buttonOfTheChosen{
      box-sizing: border-box;
      cursor: pointer;
      display: inline-block;
      outline: none;
      position: relative;
      text-align: center;
      vertical-align: top;
      border-radius: 0px;
      border: 1px solid rgb(181, 181, 181);
      background: transparent;
      color: rgb(222, 222, 222);
      text-decoration: none;
      font-size: 15px;
      font-family: "Nanum Square", "Malgun Gothic", Helvetica, "Apple SD Gothic Neo", sans-serif;
      height: 32px;
      line-height: initial;
      padding: 1px 20px 0px;
      width: auto;
      margin-right: 3px;
    }
    .buttonOfTheHideen{
      display:none;
    }
  `;

  function ActionFooter(){
  const dataOfTheChosenOnes = useSelector(state => state.areThereAnyChosenOnes);
  const fromUser = useSelector((state) => state.loginUserData);
  const dispatch = useDispatch();
  
  // 메일 발송 버튼 이벤트
  const handleSendMailButton = () => {
    try {
      Swal.fire({
        title: "메일을 발송합니다.",
        text: "선택한 직원들에게 메일을 보내시겠습니까?",
        icon: "question",
        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
        cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
        confirmButtonText: "확인", // confirm 버튼 텍스트 지정
        cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      }).then((result) => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) {
          // 만약 모달창에서 confirm 버튼을 눌렀다면
          requestSendMailToEmployee();
        }
      });
    } catch (error) {
      console.error("메일 전송 중 오류 발생:", error);
      // 오류 상황을 처리하거나 오류 메시지를 표시하는 등의 작업을 수행합니다.
    }
  };
  
  // 직원 삭제 요청 메서드
  const requestSendMailToEmployee = async () => {
    dispatch(pushSwitch(true));
    await axiosApi.post("/sendMailToEmployee", {
      employer: fromUser.user.name,
      checkedEmployee: dataOfTheChosenOnes.checkedEmployee,
    });
    dispatch(clearChosenOnes());
    dispatch(pushSwitch(false));
  };

  // 직원 삭제 버튼
  const handleDeleteEmployeesButton = () => {
    try {
      Swal.fire({
        title: "직원을 삭제합니다.",
        text: "선택한 직원들을 정말로 삭제하시겠습니까?",
        icon: "warning",
        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
        cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
        confirmButtonText: "확인", // confirm 버튼 텍스트 지정
        cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      }).then((result) => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) {
          // 만약 모달창에서 confirm 버튼을 눌렀다면
          requestUpdateEmployeeState();
        }
      });
    } catch (error) {
      console.error("메일 전송 중 오류 발생:", error);
      // 오류 상황을 처리하거나 오류 메시지를 표시하는 등의 작업을 수행합니다.
    }
  };

  // 직원 삭제 요청 메서드
  const requestUpdateEmployeeState = async () => {
    dispatch(pushSwitch(true));
    await axiosApi.put("/updateEmployeeState", {
      t_employee_state: -1,
      checkedEmployee: dataOfTheChosenOnes.checkedEmployee,
    });
    dispatch(clearChosenOnes());
    dispatch(pushSwitch(false));
  };

  return(
    <ActionFooterBar>
      <div className={dataOfTheChosenOnes.checkedEmployee && dataOfTheChosenOnes.checkedEmployee.length>0 ? "wrappingActionFooterBarO" : "wrappingActionFooterBarX"}>
        <div className="howManyHaveBeenChosen">
          <div className="wrappingChosenOnes">
            <span className="chosenOnes">
              <em>{dataOfTheChosenOnes.checkedEmployee && dataOfTheChosenOnes.checkedEmployee.length} 명</em>
                선택됨
            </span>
          </div>
        </div>
        <div className="buttonBoxOfTheChosen">
          <div className="adjustmentButtonBox">
            <button className="buttonOfTheChosen" onClick={handleDeleteEmployeesButton}>직원삭제</button>
            <button className="buttonOfTheChosen" onClick={handleSendMailButton}>초대메일 발송</button>
          </div>
        </div>
      </div>
    </ActionFooterBar>
  );
}export default ActionFooter;