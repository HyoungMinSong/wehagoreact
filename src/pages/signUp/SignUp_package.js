import { useState } from "react";
import { Badge, Button, ButtonGroup, Card, Col, Container, Form, ListGroup, Row, Spinner, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
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
import SignUpHeader from "./SignUpHeader";
import { Link } from 'react-router-dom';

const VerticalLine = styled.div`
  border-left: 1px solid black;
  height: 100px; /* 원하는 높이로 설정 */
`;

// className="border-danger"
function SignUp_package() {
  let [packagePrice, setPackagePrice] = useState({ servicePrice: 20000, perUserPrice: 3000, selectPackge: 'CLUB' });
  let [payPeriod, setPayPeriod] = useState(0); //0 월단위, 1 연단위
  let [loading, setLoading] = useState(false);
  let [rangeValue, setRangeValue] = useState(1);

  let test11 = useSelector((state) => { return state.user });
  let navigate = useNavigate();
  console.log(rangeValue)

  return (
<>
{/* <SignUpHeader></SignUpHeader> */}
    <div style={{ textAlign: 'center' }}>

      <div className="container" >

        <div className="row d-flex align-items-center">
          <div className="col-1">
          <Link to={'/'}><img src={require('./wehagologo2.png')} width="100" height="30" alt="Logo" /></Link>
          </div>
          <div className="col-1">
            {/* <Badge pill bg="info">
              회사이름입니다
            </Badge> */}
          </div>
          <div className="col-9 small-text text-end" style={{ paddingRight: '0px' }}>
            WEHAGO 고객센터 &gt;
          </div>
          <div className="col-1 text-end">
          <Link to={'/login'}><Button variant="outline-secondary" size="sm" className="ml-0 mb-1">로그인</Button></Link>
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
        </div>
        <Row className="mt-5 justify-content-center">
          <Col sm={5}>
            <Card className='text-center border-0'>
              <Card.Header className="border-0" style={{
                height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                background: 'linear-gradient(90deg, #e6f5ff, #d5eeff)', paddingLeft: '80px', paddingRight: '30px', paddingBottom: '30px'
              }}><div className='mt-3' style={{ fontSize: '14px', textAlign: 'left', color: '#133662' }}>기업에서 자주 사용하는 서비스들을 모아서 제공하는 플랜입니다.<br></br>
                  저장공간, 사용시간 등의 제약을 줄이고<br></br>
                  <b>합리적인 가격에 효율적인 업무환경</b>을 만나보세요.</div>
                <ButtonGroup size="sm">
                  <Button variant="outline-secondary"> 플랜 상세정보 </Button>
                  <Button variant="outline-secondary"><b>자세히보기 &gt;</b></Button>
                </ButtonGroup>
              </Card.Header>
              <Button variant="outline-primary" size="sm" onClick={() => {
                setPackagePrice({ servicePrice: 20000, perUserPrice: 3000, selectPackge: 'CLUB' });
              }} >
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
              <Button variant="outline-info" size="sm" onClick={() => {
                setPackagePrice({ servicePrice: 30000, perUserPrice: 6000, selectPackge: 'PRO' });
              }}>
                <Card.Body style={{ background: '#d9f0f9' }}>
                  <div className="text-start">
                    <span style={{ color: "#008ebc" }}>
                      <CheckCircleIcon fontSize="large"  ></CheckCircleIcon>
                    </span>
                    <b style={{ color: "#008ebc" }}>PRO</b>
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
          <div style={{ border: '1px dotted #000', marginLeft: '31px', marginRight: '31px' }} className="my-4 justify-content-center">
            {/* <span md={6} className="m-3" > */}
            <div className="row align-items-center">
              <div className="col-md-7 m-3">
                <div className="row">

                  <Form.Label>WEHAGO 사용 직원수</Form.Label>
                  <div className="col-md-11 mt-1"><Form.Range min={1}
                    max={100}
                    step={1}
                    value={rangeValue} onChange={(e) => setRangeValue(e.target.value)} /></div>
                  <div className="col-md-1 px-0">
                    <Form.Control size="sm" type="number" min={1}
                      max={100}
                      value={rangeValue} onChange={(e) => {
                        let value = e.target.value;
                        if (value < 1) {
                          value = 1;
                        } else if (value > 100) {
                          value = 100;
                        }
                        setRangeValue(value);
                      }} />
                  </div>
                </div>
                <div className="mt-3 text-primary small-text">최대 1만명까지 구매가능</div>
              </div>
              {/* </span> */}
              {/* <span > */}
              <div className="col-md-4 ps-5 my-4" style={{ height: '100%', borderLeft: '1px dotted #000' }}>
                <div className="text-muted small-text">
                  <span className="text-primary" style={{ fontSize: "17px" }}><b>{rangeValue}명</b></span> 사용자 추가설정 = <span style={{ fontSize: "17px" }}><b>{rangeValue}명</b></span> 전체사용직원
                </div>
                <hr />
                <span>{(packagePrice.perUserPrice * rangeValue).toLocaleString()}원/월</span><br /><span className="text-muted small-text">사용자당 {(packagePrice.perUserPrice).toLocaleString()}원</span>
              </div>
              {/* </span> */}
            </div>
          </div>
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
                <div className="text-start "><b>서비스이용금액 ({payPeriod == 0 ? '월' : '년'})</b></div>
                <div className="text-start my-1" style={{ fontSize: '14px' }}>



                  <span>{packagePrice.selectPackge}</span><span style={{ float: 'right' }}><b>
                    {payPeriod == 0 ? (packagePrice.servicePrice).toLocaleString() : (packagePrice.servicePrice * 12).toLocaleString()}
                  </b><span>원</span></span><br />
                  <span>사용자 추가({rangeValue}명)</span><span style={{ float: 'right' }}><b>
                    {payPeriod == 0 ? (packagePrice.perUserPrice * rangeValue).toLocaleString() : (packagePrice.perUserPrice * rangeValue * 12).toLocaleString()}
                  </b><span>원</span></span>
                </div>
                <hr />
                <div className="text-start mt-0" style={{ color: "#5ea5e6", fontSize: '14px' }}>
                  <span>합계</span><span style={{ float: 'right' }}><b>{payPeriod == 0 ? (packagePrice.servicePrice + (packagePrice.perUserPrice * rangeValue)).toLocaleString() : (packagePrice.servicePrice * 12 + packagePrice.perUserPrice * rangeValue * 12).toLocaleString()}</b><span>원</span></span><br />
                </div>
              </div>
            </Col>
            <Col md={6} className="" style={{ border: '1px dotted #000' }}>
              <div className="m-3">
                <div className="text-start"><b>납부주기 설정</b></div>
                <div className="d-grid gap-2 mt-2">
                  <ToggleButtonGroup type="radio" name="options" defaultValue={1}  >
                    <ToggleButton id="tbg-radio-1" value={1} variant="outline-primary" onClick={() => {
                      setPayPeriod(0);

                    }}>
                      월단위 결제
                    </ToggleButton>
                    <ToggleButton id="tbg-radio-2" value={2} variant="outline-primary" onClick={() => {
                      setPayPeriod(1);
                    }}>
                      연단위 결제
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <hr />
                <div className="text-start"><b>납부주기 설정</b></div>
                <div className="text-start my-1" style={{ fontSize: '14px' }}>
                  <span>총 이용금액</span><span style={{ float: 'right' }}><b>{payPeriod == 0 ? (packagePrice.servicePrice + (packagePrice.perUserPrice * rangeValue)).toLocaleString() : ((packagePrice.servicePrice + (packagePrice.perUserPrice * rangeValue)) * 12).toLocaleString()}</b><span>원</span></span><br />
                  <span>부가세</span><span style={{ float: 'right' }}><b>{payPeriod == 0 ? ((packagePrice.servicePrice + (packagePrice.perUserPrice * rangeValue)) * 0.1).toLocaleString() : (((packagePrice.servicePrice + (packagePrice.perUserPrice * rangeValue)) * 12) * 0.1).toLocaleString()}</b><span>원</span></span>
                </div>
                <hr />
                <div className="text-start mt-0" style={{ fontSize: '21px' }}>
                  <span><b>최종 결제금액</b></span><span style={{ float: 'right' }}><b style={{ color: "#ff003c" }}>{payPeriod == 0 ? ((packagePrice.servicePrice + (packagePrice.perUserPrice * rangeValue)) + ((packagePrice.servicePrice + (packagePrice.perUserPrice * rangeValue)) * 0.1)).toLocaleString() : (((packagePrice.servicePrice + (packagePrice.perUserPrice * rangeValue)) * 12) + (((packagePrice.servicePrice + (packagePrice.perUserPrice * rangeValue)) * 12) * 0.1)).toLocaleString()}</b><span>원</span></span><br />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center my-4" style={{ marginLeft: '31px', marginRight: '31px' }}>
            <div style={{ border: '1px dotted #000', background: '#f5f5f5' }} className="">
              <div className="text-start m-3" style={{ fontSize: '14px' }}>
                <span>다음 결제금액</span><span style={{ float: 'right' }}><b>{payPeriod == 0 ? ((packagePrice.servicePrice + (packagePrice.perUserPrice * rangeValue)) + ((packagePrice.servicePrice + (packagePrice.perUserPrice * rangeValue)) * 0.1)).toLocaleString() : (((packagePrice.servicePrice + (packagePrice.perUserPrice * rangeValue)) * 12) + (((packagePrice.servicePrice + (packagePrice.perUserPrice * rangeValue)) * 12) * 0.1)).toLocaleString()}</b><span>원</span></span><br />
                <span className="text-muted small-text">결제 예정일 :사용 시작일로부터 {payPeriod == 0 ? '1개월' : '1년'}</span>
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
              <Button variant="primary" size="lg" onClick={() => {
                let test = payPeriod == 0 ? ((packagePrice.servicePrice + (packagePrice.perUserPrice * rangeValue)) + ((packagePrice.servicePrice + (packagePrice.perUserPrice * rangeValue)) * 0.1)).toLocaleString() : (((packagePrice.servicePrice + (packagePrice.perUserPrice * rangeValue)) * 12) + (((packagePrice.servicePrice + (packagePrice.perUserPrice * rangeValue)) * 12) * 0.1)).toLocaleString()
                Swal.fire({
                  title: " 최종 결제 금액 " + test + "원입니다.",
                  text: "위의 금액으로 최종 결제를 진행합니다.",
                  icon: "warning",
                  showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
                  confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
                  cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
                  confirmButtonText: "승인", // confirm 버튼 텍스트 지정
                  cancelButtonText: "취소", // cancel 버튼 텍스트 지정
                  reverseButtons: false, // 버튼 순서 거꾸로
                }).then((result) => {
                  if (result.isConfirmed) {
                    // 만약 Promise리턴을 받으면,
                    setLoading(true);
                    let finalTest;
                    if (result.isConfirmed) {
                      console.log('name : ' + test11.name + 'id : ' + test11.id + 'businessCategory : ' + test11.businessCategory);
                      if (packagePrice.selectPackge === 'CLUB') {
                        finalTest = { ...test11, packageNo: 1, packageCount: rangeValue };
                      } else {
                        finalTest = { ...test11, packageNo: 2, packageCount: rangeValue };
                      }


                      axiosApi.post("/signupinsert", finalTest).then((c) => {
                        console.log(c.data);
                        navigate('/login');
                      }).catch(() => {
                        console.log('실패함');
                        Swal.fire({
                          title: "회원 가입 오류",
                          text: "다시 한번 시도해 주세요.",
                          icon: "error",
                          confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
                          confirmButtonText: "확인", // confirm 버튼 텍스트 지정
                        })
                      }).finally(() => {
                        setLoading(false);
                      });
                      // 만약 모달창에서 confirm 버튼을 눌렀다면
                      // fetchData();
                      // setEditingOrganization(false);
                    }
                  }
                })
              }}>
                결제하기
              </Button>
            </div>
          </Row>

        </div>
      </Container>
      {loading && (
        <div className="overlay-loading-box text-center">

          {/* 로딩 스피너 컴포넌트 */}
          <Spinner animation="border" variant="primary" style={{ fontSize: '3rem', width: "6rem", height: "6rem" }} />
          <div className="mt-3">회원가입이 진행 중입니다.<br />잠시만 기다려주세요.</div>
        </div>
      )}
    </div>
    </>
  );
}

export default SignUp_package;