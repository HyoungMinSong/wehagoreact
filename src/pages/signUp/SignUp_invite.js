import { useState,useEffect, useRef } from "react";
import { useLocation  } from 'react-router-dom'
import axiosApi from "../../AxiosApi";
import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import InputMask from 'react-input-mask';
import { increase } from "../../store";
import { useNavigate } from "react-router-dom";
import SignUpHeader from "./SignUpHeader";
import { Slide, Snackbar } from "@mui/material";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function SignUp_invite() {
    let location = useLocation();
let queryParams = new URLSearchParams(location.search);
let userName = queryParams.get('t_user_name');
let userPhone = queryParams.get('t_user_phone');
let userEmail = queryParams.get('t_user_email');

let [name, setName] = useState(userName);
let [nameError, setNameError] = useState(false);
let [phoneNumber, setPhoneNumber] = useState(userPhone);
let [phoneNumberError, setphoneNumberError] = useState(false);
let [email, setEmail] = useState(userEmail);
let [emailError, setEmailError] = useState(false);
let [id, setId] = useState('');
let [idError, setIdError] = useState(false);
let [password, setPassword] = useState('');
let [passwordError, setPasswordError] = useState(false);
let [confirmPassword, setConfirmPassword] = useState('');
let [confirmPasswordError, setConfirmPasswordError] = useState(false);
let [loading, setLoading] = useState(false);

let regex = /^[가-힣a-zA-Z]+$/;
let numberRegex = /^\d{11}$/;
let idRegex = /^[a-zA-Z0-9]*$/;
let pwRegex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
let emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

let nameInputRef = useRef(null);
let idInputRef = useRef(null);
let emailInputRef = useRef(null);
let passwordInputRef = useRef(null);
let confirmPasswordInputRef = useRef(null);


useEffect(() => {
  if (name != '') {
    regex.test(name) ? setNameError(false) : setNameError(true);
  }
  if (phoneNumber != '') {
    numberRegex.test(phoneNumber) ? setphoneNumberError(false) : setphoneNumberError(true);
  }
  if (email != '') {
    emailRegex.test(email) ? setEmailError(false) : setEmailError(true);
  }
  if (id != '') {
    idRegex.test(id) ? setIdError(false) : setIdError(true);
  }
  if (password != '') {
    pwRegex.test(password) ? setPasswordError(false) : setPasswordError(true);
  }
  if (confirmPassword != '') {
    password === confirmPassword ? setConfirmPasswordError(false) : setConfirmPasswordError(true);
  }
}, [name,id,phoneNumber,email, password, confirmPassword]);


const { abc } = location.state || {};

let navigate = useNavigate();

const handleSnackClose = () => {
  setSnackOpen(false);
};
const [snackOpen, setSnackOpen] = useState(false);
// 스낵바 메세지
const [snackText, setSnackText] = useState("오류");
  return (

    <>
    <SignUpHeader/>
<div style={{ backgroundColor: '#f5f5f5', width: '100%', height: '100%'}}>
    <Container style={{ backgroundColor: '#f5f5f5' }} className="pt-5 pb-3">
      <Row className="justify-content-center mb-5">

        <Col md={10} >
          <div style={{ marginLeft: '120px' }}>
            <Card style={{ width: '800px', display: 'flex', alignItems: 'center' }}>
              <Card.Img variant="top" src={require('./signUp.png')} style={{ height: '150px' }} />
              <div className="horizontal-line "></div>

              <Card.Body className="text-center h2">
                <Card.Title>WEHAGO 회원정보입력 (회원초대)</Card.Title>
                <div className="horizontal-line2"></div>
                <Card.Text className="text-muted small-text mt-3">
                  회원님의 정보를 입력해주세요.

                </Card.Text>

              </Card.Body>
              <Container style={{ width: '600px' }}>
                <Form >
                  <div className="text-start">
                    <Form.Group className="my-2" controlId="formBasicName">

                      <Form.Label style={{ fontWeight: 'bold' }}>사용자 이름</Form.Label>

                      <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => {
                            setName(e.target.value);
                            // regex.test(name) ? setNameError(false) : setNameError(true);
                          }} className={nameError ? "border-danger" : ""} ref={nameInputRef} />
                          {nameError ?
                            <Form.Text className="text-danger" style={{ fontSize: '11px' }}   >
                              한글과 영문만 입력 가능합니다.
                            </Form.Text>
                            : ""
                          }

                    </Form.Group>

                    <Form.Group className="my-2 " controlId="formBasicPhone">
                      <Form.Label style={{ fontWeight: 'bold' }}>휴대전화번호</Form.Label>
                      <InputMask
                        mask="999-9999-9999"
                        maskChar="_"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={(e) => {

                          setPhoneNumber(e.target.value.replace(/-/g, ''));
                          // numberRegex.test(phoneNumber) ? setphoneNumberError(false) : setphoneNumberError(true);
                        }}

                        className={phoneNumberError ? "form-control border-danger" : "form-control"}
                      />
                          {phoneNumberError ?
                            <Form.Text className="text-danger" style={{ fontSize: '11px' }}   >
                              휴대전화번호 11자리를 입력하세요.
                            </Form.Text>
                            : <Form.Text className="text-muted" style={{ fontSize: '11px' }}   >
                              * 입력된 휴대전화번호는 아이디, 비밀번호 찾기 등 본인 확인 용도 또는 WEHAGO로부터 알림
                              을 받을 때 사용됩니다.
                            </Form.Text>
                          }
                    </Form.Group>

                    <Form.Group className="my-2" controlId="formBasicEmail" >
                      <Form.Label style={{ fontWeight: 'bold' }}>아이디</Form.Label>
                      <Form.Control type="text" placeholder="Enter id" onChange={(e) => {
                        setId(e.target.value);
                        // idRegex.test(id) ? setIdError(false) : setIdError(true);
                      }} className={idError ? "border-danger" : ""} ref={idInputRef} />
                      {idError ?
                        <Form.Text className="text-danger" style={{ fontSize: '11px' }}   >
                          영문자로 시작하는 영문자 또는 숫자 6~20자를 입력하세요.
                        </Form.Text>
                        : <Form.Text className="text-muted" style={{ fontSize: '11px' }} >
                          * 생성하신 아이디는 변경할수없으니 가입하시는 본인의 아이디로 생성하시기 바랍니다.

                        </Form.Text>
                      }

                    </Form.Group>

                    <Form.Group className="my-2" controlId="formBasicPassword" >
                      <Form.Label style={{ fontWeight: 'bold' }}>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" onChange={(e) => {
                        setPassword(e.target.value);
                        // pwRegex.test(password) ? setPasswordError(false) : setPasswordError(true);
                      }} className={passwordError ? "border-danger" : ""} ref={passwordInputRef} />
                      {passwordError ?
                        <Form.Text className="text-danger" style={{ fontSize: '11px' }}   >
                          8 ~ 16자 영문, 숫자, 특수문자를 최소 한가지씩 조합해서 입력하세요.
                        </Form.Text>
                        : <Form.Text className="text-muted" style={{ fontSize: '11px' }} >
                          * 비밀번호는 8자~16자의 영문 대문자, 소문자, 숫자 및 특수문자 중 2가지 이상의 조합으로
                          입력해주세요
                        </Form.Text>
                      }
                    </Form.Group>

                    <Form.Group className="my-2" controlId="formBasicPassword2" >
                      <Form.Label style={{ fontWeight: 'bold' }}>Confirm password</Form.Label>
                      <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        // password === confirmPassword ? setConfirmPasswordError(false) : setConfirmPasswordError(true);
                      }} className={confirmPasswordError ? "border-danger" : ""} ref={confirmPasswordInputRef} />
                      {confirmPasswordError ?
                        <Form.Text className="text-danger" style={{ fontSize: '11px' }}   >
                          비밀번호가 일치하지 않습니다.
                        </Form.Text>
                        : ""
                      }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail" >
                      <Form.Label style={{ fontWeight: 'bold' }}>이메일 주소</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" 
                        value={email} onChange={(e) => {
                          setEmail(e.target.value);
                          // emailRegex.test(email) ? setEmailError(false) : setEmailError(true);
                        }} className={emailError ? "border-danger" : ""} ref={emailInputRef} />
                        {emailError ?
                          <Form.Text className="text-danger" style={{ fontSize: '11px' }}   >
                            이메일 형식이 아닙니다.
                          </Form.Text>
                          : <Form.Text className="text-muted" style={{ fontSize: '11px' }} >
                            * 아이디, 비밀번호 찾기 등 본인확인이 필요한 경우 사용할 이메일 주소입니다.

                          </Form.Text>
                        }

                    </Form.Group>

                  </div>
                  <div className="pt-3 pb-2 text-muted" style={{ backgroundColor: '#F8FFFF', fontSize: '11px' }}>
                    <p>- 회사/단체 이름은 가입완료 후 변경할 수 없으므로 정확한 정보를 입력하세요.</p>
                    <p>- 가입완료 후 회사설정에서 회사인증 절차를 완료하면 더 다양한 서비스를 이용하실 수 있습니다.</p>
                  </div>
                  <div className="my-4">
                    <Button variant="light"  className="mx-2" onClick={()=>{
                      navigate(-1)
                    }
                    }>
                      &lt; 이전
                    </Button>
                    <Button variant="primary" className="mx-3" onClick={() => {
                      setLoading(true);
                      if (name === '' || nameError === true) {
                        setNameError(true);
                        nameInputRef.current.focus();
                      } else if (phoneNumber === '' || phoneNumberError === true) {
                        setphoneNumberError(true);
                        window.document.getElementById("phoneInput").focus();
                      } else if (id === '' || idError === true) {
                        setIdError(true);
                        idInputRef.current.focus();
                      } else if (password === '' || passwordError === true) {
                        setPasswordError(true);
                        passwordInputRef.current.focus();
                      } else if (confirmPassword === '' || confirmPasswordError === true) {
                        setConfirmPasswordError(true);
                        confirmPasswordInputRef.current.focus();
                      } else if (email === '' || emailError === true) {
                        setEmailError(true);
                        emailInputRef.current.focus();
                      } else {
                        axiosApi.post("/idcheck", {
                          id: id, email: email, phoneNumber: phoneNumber
                        }).then((c) => {
                          if (c.data.checkId === id) {
                            // handleShow();
                            setSnackText("중복된 ID입니다.");
                            setSnackOpen(true);
                          } else if (c.data.checkEmail === email) {
                            // handleShow2();
                            setSnackText("중복된 이메일입니다.");
                            setSnackOpen(true);
                          } else if (c.data.checkPhoneNumber === phoneNumber) {
                            // handleShow3()
                            setSnackText("중복된 휴대전화번호입니다.");
                            setSnackOpen(true);
                          } else {
                            axiosApi.post("/signupinviteupdate", {
                              empNo: abc, userId : id, userPw : password, userName : name, userEmail : email, userPhone : phoneNumber
                            }).then((d) => {
                              console.log(d.data)
                               navigate('/signup/complete')
                            }).catch(()=>{
                              console.log('두번째 엑시오스 실패.')
                            })
                          }
                          console.log(c.data);
                          
                        }).catch(() => {
                          console.log('실패함')
                        })
                      } 
                        setLoading(false);
                      }
                      // console.log(name, phoneNumber, id, password, confirmPassword, email) 


                    }>
                      다음 &gt;
                    </Button>
                  </div>
                </Form>
              </Container>
            </Card>
          </div>
        </Col>
      </Row>
      {loading && (
            <div className="overlay-loading-box text-center">
        
          {/* 로딩 스피너 컴포넌트 */}
          <Spinner animation="border" variant="primary" style={{ fontSize: '3rem', width: "6rem", height: "6rem" }} />
          <div className="mt-3">회원가입이 진행 중입니다.<br />잠시만 기다려주세요.</div>
        </div>
      )}
    </Container>
    </div>
    <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={TransitionUp}
        message={snackText}
      // key={transition ? transition.name : ''}
      />
    </>
    
  );
}

export default SignUp_invite;