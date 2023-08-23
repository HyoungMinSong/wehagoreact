import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axiosApi from '../../../AxiosApi';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  maxWidth: '100px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



function NoticeTable(props) {
  const [open, setOpen] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeNo, setNoticeNo] = useState('');
  const [noticeContent, setNoticeContent] = useState('');

  const handleClickOpen = (user) => {
    console.log(user);
    setNoticeTitle(user.t_notice_title);
    setNoticeContent(user.t_notice_content);
    setNoticeNo(user.t_notice_no);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const titleInput = (e) => {
    setNoticeTitle(e.target.value);
  }

  const handleUpdate = async () => {
    if(noticeTitle ==="" || noticeTitle.length > 30){
      props.setSnackText("제목을 올바르게 입력해주세요.");
      props.setSnackOpen(true);
    }else if(noticeContent === "" || noticeContent.length > 150){
      props.setSnackText("내용을 올바르게 입력해주세요.");
      props.setSnackOpen(true);
    }else{
      updateNotice();
    }
  } 

  const handleDelete = () => {
    deleteNotice();
  }

  const updateNotice = async () => {
    console.log(noticeTitle, noticeContent, noticeNo);
    await axiosApi.put("/updateNotice",{
      t_notice_title : noticeTitle,
      t_notice_content : noticeContent,
      t_notice_no : noticeNo,
    });
    setOpen(false);
    setNoticeTitle('');
    setNoticeContent('');
    setNoticeNo('');
    props.selectAllNotice();
  };

  const deleteNotice = async () => {
    console.log(noticeNo);
    await axiosApi.post("/deleteNotice",{
      t_notice_no : noticeNo,
    });
    setOpen(false);
    setNoticeNo('');
    props.selectAllNotice();
  };

  const contentInput = (e) => {
    setNoticeContent(e.target.value);
  }
  console.log(props.noticeList);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead >
          <TableRow>
            <StyledTableCell align="left" className='col-1' style={{ fontWeight: 'bold'}}>번호</StyledTableCell>
            <StyledTableCell align="left" className='col-3' style={{ fontWeight: 'bold'}}>제목</StyledTableCell>
            <StyledTableCell align="left" className='col-4' style={{ fontWeight: 'bold'}}>공지사항</StyledTableCell>
            <StyledTableCell align="left" className='col-2' style={{ fontWeight: 'bold'}}>작성자</StyledTableCell>
            <StyledTableCell align="left" className='col-2' style={{ fontWeight: 'bold'}}>작성일자</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.noticeList && props.noticeList.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex} onClick={() => handleClickOpen(row)}>
              <StyledTableCell component="th" scope="row" align="left" >
              {rowIndex+1}
              </StyledTableCell>
              <StyledTableCell align="left">{row.t_notice_title}</StyledTableCell>
              <StyledTableCell align="left">{row.t_notice_content}</StyledTableCell>
              <StyledTableCell align="left">{row.t_user_name}</StyledTableCell>
              <StyledTableCell align="left">{row.t_notice_date}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
            <DialogTitle>공지사항 작성</DialogTitle>
            <DialogContent>
              <DialogContentText>
                공지사항은 최대 5개까지 작성가능합니다.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="제목"
                type="text"
                fullWidth
                value={noticeTitle}
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
                value={noticeContent}
                multiline
                onChange={(e) => contentInput(e)}
                variant="standard"
                placeholder="최대 150글자까지 입력 가능합니다."
              />
            </DialogContent>
            <DialogActions style={{ marginBottom: '16px', justifyContent: 'space-between' }}>
              <Button style={{ marginLeft: '16px', color: 'red' }}onClick = {handleDelete}>삭제</Button>
              <div>
              <Button style={{ marginLeft: '16px' }} onClick = {handleUpdate}>수정</Button>
              <Button style={{ marginLeft: '16px', marginRight: '16px' }} onClick={handleClose}>취소</Button>
              </div>
              
            </DialogActions>
          </Dialog>
    </TableContainer>
  );
}export default  NoticeTable;