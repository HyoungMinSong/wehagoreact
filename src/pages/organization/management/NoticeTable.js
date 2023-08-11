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
import { Button } from 'react-bootstrap';
import { TextField } from '@mui/material';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
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

  const [noticeContent, setNoticeContent] = useState('');

  const handleClickOpen = (user) => {
    console.log(user);
    setNoticeTitle(user.t_notice_title);
    setNoticeContent(user.t_notice_content);
    setOpen(true);
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
  console.log(props.noticeList);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>번호</StyledTableCell>
            <StyledTableCell align="right">제목</StyledTableCell>
            <StyledTableCell align="right">공지사항</StyledTableCell>
            <StyledTableCell align="right">작성자</StyledTableCell>
            <StyledTableCell align="right">작성일자</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.noticeList && props.noticeList.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex} onClick={() => handleClickOpen(row)}>
              <StyledTableCell component="th" scope="row">
              {rowIndex+1}
              </StyledTableCell>
              <StyledTableCell align="right">{row.t_notice_title}</StyledTableCell>
              <StyledTableCell align="right">{row.t_notice_content}</StyledTableCell>
              <StyledTableCell align="right">{row.t_user_name}</StyledTableCell>
              <StyledTableCell align="right">{row.t_notice_date}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
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
                value={noticeTitle}
                onChange={(e) => titleInput(e)}
                variant="standard"
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
              />
            </DialogContent>
            <DialogActions>
              <Button>추가</Button>
              <Button onClick={handleClose}>취소</Button>
            </DialogActions>
          </Dialog>
    </TableContainer>
  );
}export default  NoticeTable;