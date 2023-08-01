import { useSelector } from "react-redux";
import { styled } from "styled-components";
import axiosApi from "../../AxiosApi";

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

  
  const handleSendMailButton = () =>{
    console.log(fromUser.user.name);
    console.log(JSON.stringify(dataOfTheChosenOnes));
    console.log(dataOfTheChosenOnes);
    
    axiosApi.post("/sendMailToEmployee", {
      employer: fromUser.user.name,
    checkedEmployee: dataOfTheChosenOnes,
    });

  };


  return(
    <ActionFooterBar>
      <div className={dataOfTheChosenOnes.length>0 ? "wrappingActionFooterBarO" : "wrappingActionFooterBarX"}>
        <div className="howManyHaveBeenChosen">
          <div className="wrappingChosenOnes">
            <span className="chosenOnes">
              <em>{dataOfTheChosenOnes.length} 명</em>
                선택됨
            </span>
          </div>
        </div>
        <div className="buttonBoxOfTheChosen">
          <div className="adjustmentButtonBox">
            <button className="buttonOfTheChosen">직원삭제</button>
            <button className="buttonOfTheChosen" onClick={handleSendMailButton}>초대메일 발송</button>
          </div>
        </div>
      </div>
    </ActionFooterBar>
  );
}export default ActionFooter;