import { Col, Container, ListGroup, Modal, Row, Spinner, Tab, Table, Tabs } from "react-bootstrap";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { useState } from "react";
import axiosApi from "../../AxiosApi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";


function Services() {
  let [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  let [companySerivces, setCompanyServices] = useState('');
  let [packageCount, setPackageCount] = useState(0);
  let [serviceName, setServiceName] = useState('서비스');
  let [unPublishedUserList, setUnPublishedUserList] = useState('');
  let [publishedUserList, setPublishedUserList] = useState('');
  let [checkedService, setCheckedService] = useState(0);
  let [showListAfterConfirm, setShowListAfterConfirm] = useState(false);
  let [stateAssociatedConfirm, setStateAssociatedConfirm] =useState(false);

  // 로그인 유저 정보
  const loginedUser = useSelector((state) => state.loginUserData);
  // let comNo = loginedUser.company.t_company_no;
  console.log(loginedUser);
  let comNo = loginedUser.company && loginedUser.company.length > 0 ? loginedUser.company.find((item) => item.t_company_name === loginedUser.companyName).t_company_no : loginedUser.company[0].t_company_no;
  console.log("comNo : " + comNo)
  console.log("과연 " + loginedUser.companyName);

  useEffect(() => {
    // return () => {
      showCompanySerivces();
  }, [show, loginedUser.companyName])
  // 모달창 띄우기 유무

const showCompanySerivces = async() => {
  setLoading(true);
  if (!show && !stateAssociatedConfirm) {
    
    await axiosApi.post("/findservicelistbycomno", {
      comNo: comNo
    }).then((c) => {
      setCompanyServices(c.data);
      console.log(c.data);
    }).catch(() => { console.log('실패실패') });
    await axiosApi.post("/findpackagecount", {
      comNo: comNo
    }).then((c) => {
      setPackageCount(c.data);
      console.log(c.data);
    }).catch(() => { console.log('실패실패2') })
    // }
  }
  setLoading(false);
}

  useEffect(() => {
    if (showListAfterConfirm) {
      console.log("이건가 ?")
      getUnpublishedUser(comNo, checkedService);
      getPublishedUser(comNo, checkedService);
    }return ()=>{
      


    }
  }, [showListAfterConfirm])

  let getUnpublishedUser = (cn, sn) => {
    axiosApi.post("/findunpublisheduser", {
      comNo: cn, serviceNo: sn
    }).then((c) => {
      console.log(c.data);
      setUnPublishedUserList(c.data);
    }).catch(() => {
      console.log('실패실패3');
    })
  };

  let getPublishedUser = (cn, sn) => {
    axiosApi.post("/findpublisheduser", {
      comNo: cn, serviceNo: sn
    }).then((c) => {
      console.log(c.data);
      setPublishedUserList(c.data);
    }).catch(() => {
      console.log('실패실패3');
    })
  };

  let confirmPublish = (sn, un, cs, en) => {
    Swal.fire({
      title: un + "에게 " + sn + "을 배포하시겠습니까 ?",
      text: "승인을 누르면 해당 직원에게 서비스가 배포됩니다.",
      icon: "warning",
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
      cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
      confirmButtonText: "승인", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      // reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        axiosApi.post("/saveinvitedemployeepublish", {
          serviceNo: cs, employeeNo: en, comNo:comNo, packCt : packageCount
        }).then((c) => {
          if(c.data === 0){
          console.log(c.data);
          setShowListAfterConfirm(true);
          setStateAssociatedConfirm(false);
          }else if(c.data ===1 ){
            console.log("와이")
            Swal.fire({
              icon: 'error',
              title: '배포 실패',
              text: '구매한 패키지를 초과하셨습니다.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: '배포 실패',
              text: '서비스 배포에 실패했습니다.',
            });
          }
        }).catch(() => {
          console.log('실패실패3');
        })
      }
    });
  }

  let confirmUnPublish = (sn, un, cs, en) => {
    Swal.fire({
      title: un + "의 " + sn + "을 배포 해제하시겠습니까 ?",
      text: "승인을 누르면 해당 직원의 서비스가 배포 해제됩니다.",
      icon: "warning",
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
      cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
      confirmButtonText: "승인", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      // reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        axiosApi.post("/updateunpublish", {
          empNo: en, serviceNo: cs
        }).then((c) => {
          console.log(c.data);
          
          setShowListAfterConfirm(true);
          setStateAssociatedConfirm(false);
        }).catch(() => {
          console.log('실패실패4');
        })
      }
    });
  }

  return (
    <div >
      <div className="mx-4 mb-5 mt-4">
        <div className="text-start">
          <span className="mx-1" style={{ fontSize: '20px' }}><b>서비스 배포관리</b></span><span className="text-muted small-text">회사에서 사용중인 서비스에 대하여 사용자 배포현황을 관리할 수 있습니다.</span>
        </div>
        <hr />
        <div className="my-5" >
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row >
              {/* <Col sm={4}>
                <ListGroup>
                  <ListGroup.Item action href="#link1">
                    {loginedUser.companyName}
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link2">
                  &nbsp;
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link3">
                  &nbsp;
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link4">
                  &nbsp;
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link5">
                  &nbsp;
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link6">
                  &nbsp;
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link7">
                  &nbsp;
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link8">
                  &nbsp;
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link9">
                  &nbsp;
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link10">
                  &nbsp;
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col sm={8}> */}
                <Tab.Content>
                  <Tab.Pane eventKey="#link1">
                    <div className="row g-4  row-cols-1 row-cols-lg-5">
                      {companySerivces &&
                        companySerivces.map(function (a) {
                          return (<div className=" col " >
                            <div style={{ backgroundColor: '#f5f7f9' }} className="py-5 rounded " onClick={() => {

                              setServiceName(a.serviceName);
                              setCheckedService(a.serviceNo);
                              setPublishedUserList('')
                              setUnPublishedUserList('')
                              getUnpublishedUser(comNo, a.serviceNo);
                              getPublishedUser(comNo, a.serviceNo);
                              setShowListAfterConfirm(false);
                              setStateAssociatedConfirm(true);
                              setShow(true);
                            }}>
                              <div className="feature-icon d-inline-flex align-items-center justify-content-center  bg-gradient fs-2 mb-3">
                                {/* <CategoryOutlinedIcon style={{ fontSize: '80px' }} />
                           */}
                                <img src={a.serviceMainIconPath} alt="서비스 이미지" width="80px" height="80px" style={{ borderRadius: '12px' }} />
                              </div>
                              <h3 className="fs-2 text-body-emphasis">{a.serviceName}</h3>
                              <p>사용자의 수 [<span className="text-primary">{a.count}</span>/{packageCount}]</p>
                              <a href="#" className="icon-link">
                                Call to action
                                &gt;
                              </a>
                            </div>
                          </div>)
                        })
                      }
                    </div></Tab.Pane>
                  <Tab.Pane eventKey="#link2">Tab pane content 2</Tab.Pane>
                </Tab.Content>
              {/* </Col> */}
            </Row>
          </Tab.Container>
        </div>
      </div>
      <br />
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{serviceName}</Modal.Title>
        </Modal.Header>
        <Tabs
          defaultActiveKey="home"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="home" title="배포">
            <Modal.Body>

              <Table bordered hover>
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>아이디</th>
                    <th>소속</th>
                    <th>직급</th>
                  </tr>
                </thead>
                <tbody>
                  {unPublishedUserList &&
                    unPublishedUserList.map(function (a) {
                      return (
                        <tr onClick={() => {
                          confirmPublish(serviceName, a.userName, checkedService, a.empNo)
                        }}>
                          <td>{a.userName}</td>
                          <td>{a.userId}</td>
                          <td>{a.empDuty}</td>
                          <td>{a.empPosition}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </Modal.Body>
          </Tab>
          <Tab eventKey="profile" title="배포 해제">
            <Modal.Body>

              <Table bordered hover>
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>아이디</th>
                    <th>소속</th>
                    <th>직급</th>
                  </tr>
                </thead>
                <tbody>
                  {publishedUserList &&
                    publishedUserList.map(function (a) {
                      return (
                        <tr onClick={() => {
                          confirmUnPublish(serviceName, a.userName, checkedService, a.empNo);
                        }}>

                            <td>{a.userName}</td>
                            <td>{a.userId}</td>
                            <td>{a.empDuty}</td>
                            <td>{a.empPosition}</td>
                          </tr>
                          )
                    })
                  }
                        </tbody>
              </Table>
            </Modal.Body>
          </Tab>

        </Tabs>



      </Modal>
      {loading && (
            <div className="overlay-loading-box text-center">
        
          {/* 로딩 스피너 컴포넌트 */}
          <Spinner animation="border" variant="primary" style={{ fontSize: '3rem', width: "6rem", height: "6rem" }} />
          <div className="mt-3">서비스 배포 목록이 출력 중입니다.<br />잠시만 기다려주세요.</div>
        </div>
      )}
    </div>
  );

} export default Services;
