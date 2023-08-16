import { styled } from "styled-components";
import NoticeTable from "./management/NoticeTable";
import React, { useEffect, useRef, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axiosApi from "../../AxiosApi";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { Slide, Snackbar } from "@mui/material";


const CsContainer = styled.div`
  margin-bottom: 80px;
  padding: 0 35px;
  display: block;
`;
const CsSubTitle = styled.div`
  position: relative;
  height: 62px;
  margin-bottom: 5px;
  padding: 28px 0 0;
  border-bottom: 1px solid #e5e5e5;
  h2 {
    float: left;
    margin-right: 10px;
    font-size: 20px;
    color: #555;
    letter-spacing: -1px;
    margin: 0;
    padding: 0;
  }
  p {
    float: left;
    margin: 6px 10px 0;
    font-size: 13px;
    font-weight: 200;
    color: #4a4a4a;
    vertical-align: top;
    padding: 0;
  }
`;

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function Administrator() {
  const [open, setOpen] = useState(false);
  // 로그인 유저 정보 리덕스에서 추출
  const loginedUser = useSelector((state) => state.loginUserData);

  const [tCompanyNo, setTCompanyNo] = useState('');

  const [noticeTitle, setNoticeTitle] = useState('');

  const [noticeContent, setNoticeContent] = useState('');

  const [loading, setLoading] = useState(false);
  //불리안 값인데 초기값은 false라고 정의한거

  const [noticeList,setNoticeList] = useState([]);
  //배열값인데 초기값이 비어있는 배열임
  // 스낵바
  const [snackOpen, setSnackOpen] = useState(false);
  // 스낵바 메세지
  const [snackText, setSnackText] = useState("최대 5개의 공지사항만 입력가능합니다.");

  const maxSnackOpen = async () => {
    setSnackText("최대 5개의 공지사항만 입력가능합니다.");
    setSnackOpen(true);
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  // 로그인한 회사로 첫 렌더링
  useEffect(() => {
    // 유저의 회사 중에 헤더의 회사이름과 같은 회사의 PK추출
    const lastCompanyNo =
      loginedUser.company && loginedUser.company.length > 0
        ? loginedUser.company.find(
          (item) => item.t_company_name === loginedUser.companyName
        ).t_company_no
        : loginedUser.company[0].t_company_no;
    setTCompanyNo(lastCompanyNo);

  }, []); // 첫 렌더링

  // 회사 변경마다 회사 업데이트
  useEffect(() => {
    // 유저의 회사 중에 헤더의 회사이름과 같은 회사의 PK추출
    const lastCompanyNo =
      loginedUser.company && loginedUser.company.length > 0
        ? loginedUser.company.find(
          (item) => item.t_company_name === loginedUser.companyName
        ).t_company_no
        : loginedUser.company[0].t_company_no;
    setTCompanyNo(lastCompanyNo);
    console.log(tCompanyNo);
  }, [loginedUser.companyName]); // 헤더의 선택된 회사이름

  useEffect(() => {
    if(tCompanyNo){
  
    selectAllNotice();    
  }
  }, [tCompanyNo])

  // 공지사항 목록 불러오는 요청
  const selectAllNotice = async () => {
    setLoading(true);
    //로딩값이 트루이고  // 로딩에 트루값을 대입
    const res = await axiosApi.get("/selectNotice", {
    // res 변수에 해당 주소로 요청 보냄 // res변수에 요청을 보낸 응답의 값을 저장
      params: {
        t_company_no: tCompanyNo,
      //tCompanyNo를 key value로 데이터를 표현하는 방법
      },
    });
    setNoticeList(res.data);
    //res.data == tCompanyno
    setLoading(false);
  }

  const handleClickOpen = () => {
    if(noticeList && noticeList.length > 4){
      maxSnackOpen();
    }else{
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const titleInput = (e) => {
    setNoticeTitle(e.target.value);
  }

  const contentInput = (e) => {
    setNoticeContent(e.target.value);
  }

  const handleRequestCreateNotice = async () => {
    if(noticeTitle ==="" || noticeTitle.length > 30){
      setSnackText("제목을 올바르게 입력해주세요.");
      setSnackOpen(true);
    }else if(noticeContent === "" || noticeContent.length > 150){
      setSnackText("내용을 올바르게 입력해주세요.");
      setSnackOpen(true);
    }else{
      requestCreateNotice();
    }
  }

  const requestCreateNotice = async () => {
    console.log(noticeTitle, noticeContent, loginedUser.user.name, tCompanyNo);
    await axiosApi.post("/createNotice",{
      t_notice_title : noticeTitle,
      t_notice_content : noticeContent,
      t_user_name : loginedUser.user.name,
      t_company_no : tCompanyNo
    });
    setOpen(false);
    setNoticeTitle('');
    setNoticeContent('');
    selectAllNotice();
  };

  return (
    <div>
      <CsContainer>
        <CsSubTitle>
          <div>
            <h2>공지사항 관리</h2>
            <p>등록된 회사의 공지사항을 관리할 수 있습니다.</p>
          </div>
        </CsSubTitle>
        <NoticeTable 
          selectAllNotice = {selectAllNotice} 
          noticeList = {noticeList} 
          tCompanyNo = {tCompanyNo} 
          setSnackText = {setSnackText}
          setSnackOpen = {setSnackOpen}
        />
        <Button 
        // variant="contained" endIcon={<SendIcon />}
        onClick={handleClickOpen}
        >
          글쓰기
        </Button>
        <div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>공지사항 작성</DialogTitle>
            <DialogContent>
              <DialogContentText>
                공지사항 작성 하는 설명
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="제목"
                type="text"
                fullWidth
                onChange={(e) => titleInput(e)}
                variant="standard"
                placeholder="최대 30글자까지 입력 가능합니다."
              />
              <TextField
                margin="dense"
                id="content"
                label="내용"
                type="text"
                fullWidth
                multiline
                onChange={(e) => contentInput(e)}
                variant="standard"
                placeholder="최대 150글자까지 입력 가능합니다."
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleRequestCreateNotice}>추가</Button>
              <Button onClick={handleClose}>취소</Button>
            </DialogActions>
          </Dialog>
        </div>
      </CsContainer>
      {loading && (
              <div className="overlay-loading-box text-center">
                {/* 로딩 스피너 컴포넌트 */}
                <Spinner
                  animation="border"
                  variant="primary"
                  style={{ fontSize: "3rem", width: "6rem", height: "6rem" }}
                />
                <div className="mt-3">
                  불러오는 중입니다.
                  <br />
                  잠시만 기다려주세요.
                </div>
              </div>
            )}
            <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
        TransitionComponent={TransitionUp}
        message={snackText}
        // key={transition ? transition.name : ''}
      />
    </div>
  );

} export default Administrator;
