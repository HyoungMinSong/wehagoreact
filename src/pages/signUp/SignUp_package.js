import { useState } from "react";
import { Badge, Button, ButtonGroup, Card, CardGroup, Col, Container, Form, Image, ListGroup, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import InputMask from 'react-input-mask';
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


// className="border-danger"
function SignUp_package() {
  let [isMouseHover, setIsMouseHover] = useState(false);
  // let [name, setName] = useState('');
  // let [nameError, setNameError] = useState(false);
  // let [phoneNumber, setPhoneNumber] = useState('');
  // let [phoneNumberError, setphoneNumberError] = useState(false);
  // let [id, setId] = useState('');
  // let [password, setPassword] = useState('');
  // let [confirmPassword, setConfirmPassword] = useState('');
  // let [email, setEmail] = useState('');

  // let regex =  /^[가-힣a-zA-Z]+$/;
  // let numberRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;

  let test = useSelector((state) => { return state.user });
  console.log(test);

  return (

    <div style={{ textAlign: 'center' }}>

      <div className="container" >

        <div className="row d-flex align-items-center">
          <div className="col-1">
            <img src={require('./wehagologo2.png')} width="100" height="30" alt="Logo" />
          </div>
          <div className="col-1">
            <Badge pill bg="info">
              회사이름입니다
            </Badge>
          </div>
          <div className="col-9 small-text text-end" style={{ paddingRight: '0px' }}>
            WEHAGO 고객센터 &gt;
          </div>
          <div className="col-1 text-end">
            <Button variant="outline-secondary" size="sm" className="ml-0 mb-1">로그인</Button>
          </div>
        </div>
      </div>

      <Container style={{ background: 'linear-gradient(90deg, #e6f5ff, #d5eeff)' }} className="pt-5 pb-5 ">

        <h1 className="mt-4" style={{ color: '#133662', fontWeight: 800 }}>우리 회사에 꼭 맞는 플랜을 만나보세요!</h1>
        <p className="mt-4">사용목적, 규모 등에 따라 WEHAGO의 서비스를 다양한 패키지로 만나보실 수 있습니다.</p>
        <div className="mt-5">
          <Badge pill bg="primary" style={{ fontSize: '30px' }}>
            WEHAGO 기본팩
          </Badge>
          <Badge pill bg="light" text="dark" style={{ fontSize: '30px' }}>
            싱글팩
          </Badge>
        </div>
        {/* <CardGroup className="my-5"> */}
        <Row className="mt-5 justify-content-center">
          <Col sm={5}>
            {/* <Card className={`text-center ${isMouseHover ? 'border-2 border-primary' : 'border-0'}`} 
        onMouseEnter={()=>setIsMouseHover(true)}
        onMouseLeave={()=>setIsMouseHover(false)}
      > */}
            <Card className='text-center border-0'>
              <Card.Header className="border-0" style={{
                height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                background: 'linear-gradient(90deg, #e6f5ff, #d5eeff)', paddingLeft: '80px', paddingRight: '30px', paddingBottom: '30px'
              }}><div className='mt-3' style={{ fontSize: '14px', textAlign: 'left', color: '#133662'}}>기업에서 자주 사용하는 서비스들을 모아서 제공하는 플랜입니다.<br></br>
                  저장공간, 사용시간 등의 제약을 줄이고<br></br>
                  <b>합리적인 가격에 효율적인 업무환경</b>을 만나보세요.</div>
                <ButtonGroup size="sm">
                  <Button variant="outline-secondary"> 플랜 상세정보 </Button>
                  <Button variant="outline-secondary"><b>자세히보기 &gt;</b></Button>
                </ButtonGroup>
              </Card.Header>
              <Button variant="outline-primary" size="sm" >
                <Card.Body style={{ background: '#1665ec' }}>
                  <div className="text-start">
                    <span style={{ color: "white" }}>
                      <CheckCircleIcon fontSize="large"  ></CheckCircleIcon>
                    </span>
                    <b className="text-light">CLUB</b>
                    <span className="text-end text-light" style={{ position: 'absolute', right: '35px', fontSize: '14px', }}>
                      <span >사용자당 월3,000</span><br></br>
                      월 기본료 20,000원
                    </span>
                  </div>
                  {/* <Container>
          <Row className="text-center">
            <Col xs={1}>하이</Col>
            <Col xs={1}>하이2</Col>
            <Col xs={8}></Col>
            <Col xs={1}>하이3</Col>
            <Col xs={1}>하이4</Col>
          </Row>
        </Container> */}
                </Card.Body>

                <Card.Footer className="text-muted">
                  <div className="text-start">
                    <img src="https://static.wehago.com/imgs/cw/plan_new_ico01.png" alt="이미지 설명" />
                    <span className="pt-4" style={{ position: 'absolute', right: '35px', fontSize: '14px', }}>더 많은 협업 및 공유 기능과 저장공간이<br />제공됩니다. 1인~30인 규모의 기업에서<br />사용하시기에 적합한 플랜입니다.</span>
                  </div>
                  <hr />
                  <div className="text-start ms-3 my-3">
                    <b>기본 제공 서비스</b>
                  </div>
                  <ListGroup>
                    <Row>
                      <Col>
                        <ListGroup.Item className="border-0">
                          <span className="" style={{ color: "#97a0d3" }}>
                            <CalendarMonthIcon></CalendarMonthIcon>
                          </span>
                          <span className="ms-2" >기본 서비스 포함</span>

                        </ListGroup.Item>
                        <ListGroup.Item className="border-0"><span className="" style={{ color: "#97a0d3" }}>
                          <FaxIcon></FaxIcon>
                        </span>
                          <span className="ms-2" >팩스</span></ListGroup.Item>
                        <ListGroup.Item className="border-0"><span style={{ color: "#97a0d3" }}>
                          <VideoChatIcon></VideoChatIcon>
                        </span>
                          <span className="ms-2" >화상회의 <b>무제한</b> 제공</span></ListGroup.Item>
                        <ListGroup.Item className="border-0"><span style={{ color: "#97a0d3" }}>
                          <CloudIcon></CloudIcon>
                        </span>
                          <span className="ms-2" >웹스토리지 공유 기능</span></ListGroup.Item>
                        <ListGroup.Item className="border-0"><span style={{ color: "#97a0d3" }}>
                          <ResetTvIcon></ResetTvIcon>
                        </span>
                          <span className="ms-2" >내 PC 원격접속</span></ListGroup.Item>
                        <ListGroup.Item className="border-0"><br /></ListGroup.Item>
                      </Col>
                      <Col>
                        <ListGroup.Item className="border-0"><span className="" style={{ color: "#97a0d3" }}>
                          <BusinessIcon></BusinessIcon>
                        </span>
                          <span className="ms-2" >회사저장공간 <b>100GB</b></span></ListGroup.Item>
                        <ListGroup.Item className="border-0"><span className="" style={{ color: "#97a0d3" }}>
                          <ChatIcon></ChatIcon>
                        </span>
                          <span className="ms-2" >메신저 <b>무제한</b> 대화보관</span></ListGroup.Item>
                        <ListGroup.Item className="border-0"><span className="" style={{ color: "#97a0d3" }}>
                          <PreviewIcon></PreviewIcon>
                        </span>
                          <span className="ms-2" >문서/이미지 미리보기</span></ListGroup.Item>
                        <ListGroup.Item className="border-0"><span className="" style={{ color: "#97a0d3" }}>
                          <EmailIcon></EmailIcon>
                        </span>
                          <span className="ms-2" >메일 1GB (사용자당)</span></ListGroup.Item>
                        <ListGroup.Item className="border-0"><br /></ListGroup.Item>
                        <ListGroup.Item className="border-0"><br /></ListGroup.Item>
                      </Col>
                    </Row>
                  </ListGroup>
                </Card.Footer>
              </Button>
            </Card>
          </Col>
          <Col sm={5}>
            <Card className="text-center border-0">
              <Card.Header style={{
                height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                background: 'linear-gradient(90deg, #e6f5ff, #d5eeff)', paddingLeft: '80px', paddingRight: '80px'
              }}><img src="https://static.wehago.com/imgs/cw/plan_new_bg04.png" style={{ maxWidth: '100%', maxHeight: '150px' }} alt="이미지 설명" /></Card.Header>
              <Button variant="outline-info" size="sm">
                <Card.Body style={{ background: '#d9f0f9' }}>
                  <div className="text-start">
                    <span style={{ color: "#008ebc" }}>
                      <CheckCircleIcon fontSize="large"  ></CheckCircleIcon>
                    </span>
                    <b style={{ color: "#008ebc" }}>CLUB</b>
                    <span className="text-end " style={{ position: 'absolute', right: '35px', color: "#008ebc", fontSize: '14px', }}>
                      <span>사용자당 월6,000</span><br></br>
                      월 기본료 30,000원
                    </span>
                  </div>
                </Card.Body>
                <Card.Footer className="text-muted">
                  <div className="text-start">
                    <img src="https://static.wehago.com/imgs/cw/plan_new_ico02.png" alt="이미지 설명" />
                    <span className="pt-4" style={{ position: 'absolute', right: '35px', fontSize: '14px', }}>무제한 화상회의와 웹오피스 편집기능을<br />제공합니다. 30명이상 규모의 기업에서<br />사용하시기에 적합한 플랜입니다.</span>
                  </div>
                  <hr />
                  <div className="text-start ms-3 my-3">
                    <b>기본 제공 서비스</b>
                  </div>
                  <ListGroup>
                    <Row>
                      <Col>
                        <ListGroup.Item className="border-0">
                          <span className="" style={{ color: "#89bac4" }}>
                            <CalendarMonthIcon></CalendarMonthIcon>
                          </span>
                          <span className="ms-2" >기본 서비스 포함</span>

                        </ListGroup.Item>
                        <ListGroup.Item className="border-0"><span className="" style={{ color: "#89bac4" }}>
                          <FaxIcon></FaxIcon>
                        </span>
                          <span className="ms-2" >팩스</span></ListGroup.Item>
                        <ListGroup.Item className="border-0"><span style={{ color: "#89bac4" }}>
                          <VideoChatIcon></VideoChatIcon>
                        </span>
                          <span className="ms-2" >화상회의 <b>무제한</b> 제공</span></ListGroup.Item>
                        <ListGroup.Item className="border-0"><span style={{ color: "#89bac4" }}>
                          <CloudIcon></CloudIcon>
                        </span>
                          <span className="ms-2" >웹스토리지 공유 기능</span></ListGroup.Item>
                        <ListGroup.Item className="border-0"><span style={{ color: "#89bac4" }}>
                          <ResetTvIcon></ResetTvIcon>
                        </span>
                          <span className="ms-2" >내 PC 원격접속</span></ListGroup.Item>
                        <ListGroup.Item className="border-0"><span className="" style={{ color: "#89bac4" }}>
                          <EditNoteIcon></EditNoteIcon>
                        </span>
                          <span className="ms-2" ><b>지식관리 기능 (노트)</b></span></ListGroup.Item>
                      </Col>
                      <Col>
                        <ListGroup.Item className="border-0"><span className="" style={{ color: "#89bac4" }}>
                          <BusinessIcon></BusinessIcon>
                        </span>
                          <span className="ms-2" >회사저장공간 <b>500GB</b></span></ListGroup.Item>
                        <ListGroup.Item className="border-0"><span className="" style={{ color: "#89bac4" }}>
                          <ChatIcon></ChatIcon>
                        </span>
                          <span className="ms-2" >메신저 <b>무제한</b> 대화보관</span></ListGroup.Item>
                        <ListGroup.Item className="border-0"><span className="" style={{ color: "#89bac4" }}>
                          <PreviewIcon></PreviewIcon>
                        </span>
                          <span className="ms-2" >문서/이미지 미리보기</span></ListGroup.Item>
                        <ListGroup.Item className="border-0"><span className="" style={{ color: "#89bac4" }}>
                          <EmailIcon></EmailIcon>
                        </span>
                          <span className="ms-2" >메일 1GB (사용자당)</span></ListGroup.Item>
                        <ListGroup.Item className="border-0"><span className="" style={{ color: "#89bac4" }}>
                          <ContentPasteIcon></ContentPasteIcon>
                        </span>
                          <span className="ms-2" ><b>사내게시판 기능</b></span></ListGroup.Item>
                        <ListGroup.Item className="border-0"><span className="" style={{ color: "#89bac4" }}>
                          <CoPresentIcon></CoPresentIcon>
                        </span>
                          <span className="ms-2" ><b>웹오피스 기능제공</b></span></ListGroup.Item>
                      </Col>
                    </Row>
                  </ListGroup>
                </Card.Footer>
              </Button>
            </Card>
            {/* </CardGroup> */}
          </Col>
        </Row>
      </Container>
      <Container className="my-4">
        <h4 className="text-start"><PaymentIcon style={{ fontSize: '40px' }} className="mb-1 me-1"></PaymentIcon>주문/결제</h4>
        <hr />
        <div>
          <Row className="justify-content-center">
            <Col md={5} className=" me-4" style={{ border: '1px dotted #000', background: '#f2f6fc' }}>
              <div className="m-3">
                <div className="text-start "><b>프로모션 코드 입력</b></div>
                <div className="my-2">
                  <Row>
                    <Col md={10} className="pe-0">
                      <Form.Control type="text" size="sm" placeholder="프로모션 코드를 입력해주세요." className="" />
                    </Col>
                    <Col md={2} className="">
                      <Button size="sm" className=" px-3" variant="outline-secondary">적용</Button>
                    </Col>
                  </Row>
                </div>
                <hr />
                <div className="text-start "><b>서비스이용금액 (월)</b></div>
                <div className="text-start my-1" style={{ fontSize: '14px' }}>
                  <span>CLUB</span><span style={{ float: 'right' }}><b>20,000</b><span>원</span></span><br />
                  <span>사용자 추가(1명)</span><span style={{ float: 'right' }}><b>3,000</b><span>원</span></span>
                </div>
                <hr />
                <div className="text-start mt-0" style={{ color: "#5ea5e6", fontSize: '14px' }}>
                  <span>합계</span><span style={{ float: 'right' }}><b>23,000</b><span>원</span></span><br />
                </div>
              </div>
            </Col>
            <Col md={6} className="" style={{ border: '1px dotted #000' }}>
              <div className="m-3">
                <div className="text-start"><b>납부주기 설정</b></div>
                <div className="d-grid gap-2 mt-2">
                  <ToggleButtonGroup type="radio" name="options" defaultValue={1} className="" >
                    <ToggleButton id="tbg-radio-1" value={1} variant="outline-primary" className="">
                      월단위 결제
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-2" value={2} variant="outline-primary">
                      연단위 결제
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <hr />
                <div className="text-start"><b>납부주기 설정</b></div>
                <div className="text-start my-1" style={{ fontSize: '14px' }}>
                  <span>총 이용금액</span><span style={{ float: 'right' }}><b>23,000</b><span>원</span></span><br />
                  <span>부가세</span><span style={{ float: 'right' }}><b>2,300</b><span>원</span></span>
                </div>
                <hr />
                <div className="text-start mt-0" style={{ fontSize: '21px' }}>
                  <span><b>최종 결제금액</b></span><span style={{ float: 'right' }}><b style={{ color: "#ff003c" }}>25,300</b><span>원</span></span><br />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center my-4" style={{ marginLeft: '31px', marginRight: '31px' }}>
            <div style={{ border: '1px dotted #000', background: '#f5f5f5' }} className="">
              <div className="text-start m-3" style={{ fontSize: '14px' }}>
                <span>다음 결제금액</span><span style={{ float: 'right' }}><b>25,300</b><span>원</span></span><br />
                <span className="text-muted small-text">결제 예정일 :사용 시작일로부터 1개월</span>
              </div>
            </div>
            <div className="text-muted small-text text-start my-3">
              <div>- 모든 서비스에 부가세 10%는 별도로 청구됩니다.</div>
              <div>- 이후 결제예정일에 정기결제 서비스 금액이 청구되며,
                서비스 추가 구매 시 실제 결제금액은 차이가 있을 수 있습니다.</div>
              <div>- 서비스 사용을 원하지 않을 경우, 회사삭제를 진행해주세요.</div>
              <div>- 회사생성 후 90일 이내로 결제를 하지 않을 경우, 생성된 회사가 삭제됩니다.</div>
            </div>
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg">
                결제하기
              </Button>
            </div>
          </Row>

        </div>
      </Container>
    </div>
  );
}

export default SignUp_package;