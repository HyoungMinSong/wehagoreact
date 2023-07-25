import { useState } from "react";
import { Badge, Button, ButtonGroup, Card,  Col, Container, Form,  ListGroup, Row, Spinner, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FaxIcon from '@mui/icons-material/Fax';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import CloudIcon from '@mui/icons-material/Cloud';
import ResetTvIcon from '@mui/icons-material/ResetTv';
import EditNoteIcon from '@mui/icons-material/EditNote';
import BusinessIcon from '@mui/icons-material/Business';
import ChatIcon from '@mui/icons-material/Chat';
import PreviewIcon from '@mui/icons-material/Preview';
import EmailIcon from '@mui/icons-material/Email';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import PaymentIcon from '@mui/icons-material/Payment';
import Swal from "sweetalert2";
import axiosApi from "../../AxiosApi";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";


// className="border-danger"
function Test_up() {
    let [loading, setLoading] = useState(false);

  return (

    <div>
        <button onClick={()=>{
            setLoading(true);
            setTimeout(()=>{
                
            setLoading(false);}, 10000)
        }}>
테스트입니다~~~~~~~~~~~~~~~~~~~~~~~~~~~
        </button>
        {loading && (
            <div className="overlay-loading-box text-center">
        
          {/* 로딩 스피너 컴포넌트 */}
          <Spinner animation="border" variant="primary" style={{ fontSize: '3rem', width: "6rem", height: "6rem" }} />
          <div className="mt-3">회원가입이 진행 중입니다.<br />잠시만 기다려주세요.</div>
        </div>
      )}
    </div>
    
  );
}

export default Test_up;