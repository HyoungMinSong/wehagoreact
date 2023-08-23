import { Col, Container, ListGroup, Modal, Row, Spinner, Tab, Table, Tabs } from "react-bootstrap";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { useState } from "react";
import axiosApi from "../../AxiosApi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';




function Services() {
  let [loading, setLoading] = useState(false);
  let [loading2, setLoading2] = useState(false);

  const [show, setShow] = useState(false);
  let [companySerivces, setCompanyServices] = useState('');
  let [packageCount, setPackageCount] = useState(0);
  let [serviceName, setServiceName] = useState('서비스');
  let [unPublishedUserList, setUnPublishedUserList] = useState('');
  let [publishedUserList, setPublishedUserList] = useState('');
  let [checkedService, setCheckedService] = useState(0);
  let [showListAfterConfirm, setShowListAfterConfirm] = useState(false);
  let [stateAssociatedConfirm, setStateAssociatedConfirm] = useState(false);
  // 하위 체크박스의 개수만큼의 초기 상태 배열 생성
  const [checkboxStates, setCheckboxStates] = useState([]);
  const [checkboxStates2, setCheckboxStates2] = useState([]);
  let [countCheckBoxArray, setCountCheckBoxArray] = useState([]);
  let [countCheckBoxArray2, setCountCheckBoxArray2] = useState([]);

  // useEffect(() => {
  //   setCountCheckBox(checkboxStates.reduce((count, value) => count + value, 0)); // 예시: countA의 두 배 값을 countB로 설정
  // }, [checkboxStates]);

  useEffect(() => {
    setCountCheckBoxArray(checkboxStates.map((element, index) => element === true ? index : undefined).filter(index => index !== undefined)); // 예시: countA의 두 배 값을 countB로 설정
  }, [checkboxStates]);
  useEffect(() => {
    setCountCheckBoxArray2(checkboxStates2.map((element, index) => element === true ? index : undefined).filter(index => index !== undefined)); // 예시: countA의 두 배 값을 countB로 설정
  }, [checkboxStates2]);
  // 상위 체크박스의 선택 여부 계산
  const isParentChecked = checkboxStates.every((isChecked) => isChecked);
  const isParentIndeterminate = checkboxStates.some((isChecked) => isChecked) && !isParentChecked;
  console.log("isParentChecked : " + isParentChecked);
  console.log("isParentIndeterminate : " + isParentIndeterminate);
  // 상위 체크박스 선택 여부 변경 시 처리
  const handleParentChange = (event) => {
    const newCheckboxStates = checkboxStates.map(() => event.target.checked);
    setCheckboxStates(newCheckboxStates);
  };

  // 하위 체크박스 선택 여부 변경 시 처리
  const handleChildChange = (index) => (event) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = event.target.checked;
    setCheckboxStates(newCheckboxStates);
  };

  const isParentChecked2 = checkboxStates2.every((isChecked) => isChecked);
  const isParentIndeterminate2 = checkboxStates2.some((isChecked) => isChecked) && !isParentChecked2;
  console.log("isParentChecked2 : " + isParentChecked2);
  console.log("isParentIndeterminate2 : " + isParentIndeterminate2);
  // 상위 체크박스 선택 여부 변경 시 처리
  const handleParentChange2 = (event) => {
    const newCheckboxStates = checkboxStates2.map(() => event.target.checked);
    setCheckboxStates2(newCheckboxStates);
  };

  // 하위 체크박스 선택 여부 변경 시 처리
  const handleChildChange2 = (index) => (event) => {
    const newCheckboxStates = [...checkboxStates2];
    newCheckboxStates[index] = event.target.checked;
    setCheckboxStates2(newCheckboxStates);
  };

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
  }, [loginedUser.companyName])
  // 모달창 띄우기 유무

  useEffect(() => {
    if (!show && !stateAssociatedConfirm) {
    showCompanySerivces()
  }}, [show])

  const showCompanySerivces = async () => {
    setLoading(true);
      await axiosApi.post("/findservicelistbycomno", {
        comNo: comNo
      }).then((c) => {
        setCompanyServices(c.data);
        console.log(c.data);
      }).catch((error) => {
        if (error.response.status === 401) {
          alert("로그인 시간이 만료되었습니다. 다시 로그인 하세요.");
          window.location.replace('/login');
        } else {
          console.error(error);
        }
      });
      await axiosApi.post("/findpackagecount", {
        comNo: comNo
      }).then((c) => {
        setPackageCount(c.data);
        console.log(c.data);
      }).catch((error) => {
        if (error.response.status === 401) {
          window.location.replace('/login');
        } else {
          console.error(error);
        }
      });
      // }
    
    setLoading(false);
  }

  useEffect(() => {
    if (showListAfterConfirm) {
      console.log("이건가 ?")
      getUnpublishedUser(comNo, checkedService);
      getPublishedUser(comNo, checkedService);
      setShowListAfterConfirm(false);
    } return () => {



    }
  }, [showListAfterConfirm])

  let getUnpublishedUser = (cn, sn) => {
    axiosApi.post("/findunpublisheduser", {
      comNo: cn, serviceNo: sn
    }).then((c) => {
      console.log(c.data);
      setUnPublishedUserList(c.data);
      setCheckboxStates(new Array(c.data.length).fill(false));
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
      setCheckboxStates2(new Array(c.data.length).fill(false));
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
    }).then(  (result) => {
      // 만약 Promise리턴을 받으면,
      
      if (result.isConfirmed) {
        console.log("로딩스따트")
        setLoading2(true);
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        axiosApi.post("/saveinvitedemployeepublish", {
          serviceNo: cs, employeeNo: en, comNo: comNo, packCt: packageCount
        }).then((c) => {
          if (c.data === 0) {
            console.log(c.data);
            setShowListAfterConfirm(true);
            setStateAssociatedConfirm(false);
          } else if (c.data === 1) {
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
        }).finally(()=>{
          console.log('파이널리임')
          setLoading2(false);
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
        setLoading2(true);
        axiosApi.post("/updateunpublish", {
          empNo: en, serviceNo: cs
        }).then((c) => {
          console.log(c.data);

          setShowListAfterConfirm(true);
          setStateAssociatedConfirm(false);
        }).catch(() => {
          console.log('실패실패4');
        }).finally(()=>{
          console.log('파이널리임')
          setLoading2(false);
        })
      }
    });
  }

  let confirmArrayPublish = () => {
    Swal.fire({
      title: "총 " + countCheckBoxArray.length + "명에게 " + serviceName + "를 배포하시겠습니까 ?",
      text: "승인을 누르면 해당 직원들에게 서비스가 배포됩니다.",
      icon: "warning",
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
      cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
      confirmButtonText: "승인", // confirm 버튼 텍스트 지정
      cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      // reverseButtons: true, // 버튼 순서 거꾸로
    })
      .then((result) => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) {
          setLoading2(true);
          // 만약 모달창에서 confirm 버튼을 눌렀다면
          let newArray = countCheckBoxArray.map(index => unPublishedUserList[index].empNo);
          axiosApi.post("/savearrayinvitedemployeepublish", {
            serviceNo: checkedService, arrayEmployeeNo: newArray, comNo: comNo, packCt: packageCount, totalAddEmployeeCount: countCheckBoxArray.length
          }).then((c) => {
            if (c.data === 0) {
              console.log(c.data);
              setShowListAfterConfirm(true);
              setStateAssociatedConfirm(false);
            } else if (c.data === 1) {
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
          }).finally(()=>{
            console.log('파이널리임')
            setLoading2(false);
          })
        }
      });
  }
  let confirmArrayUnPublish = () => {
    Swal.fire({
      title: "총 " + countCheckBoxArray2.length + "명의 " + serviceName + "을 배포 해제하시겠습니까 ?",
      text: "승인을 누르면 해당 직원들의 서비스가 배포 해제됩니다.",
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
        setLoading2(true);
        let newArray = countCheckBoxArray2.map(index => publishedUserList[index].empNo);
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        axiosApi.post("/updatearrayunpublish", {
          arrayEmployeeNo: newArray, serviceNo: checkedService
        }).then((c) => {
          console.log(c.data);

          setShowListAfterConfirm(true);
          setStateAssociatedConfirm(false);
        }).catch(() => {
          console.log('실패실패4');
        }).finally(()=>{
          console.log('파이널리임')
          setLoading2(false);
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
            <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)'}}>

              <Table bordered hover>
                <thead>
                  <tr>
                    <th className="col-1"><FormControlLabel
                      control={
                        <Checkbox
                          checked={isParentChecked}
                          indeterminate={isParentIndeterminate}
                          onChange={handleParentChange}
                        />
                      }

                    /></th>
                    <th className="col-3">이름</th>
                    <th className="col-3">아이디</th>
                    <th className="col-3">소속</th>
                    <th className="col-2">직급</th>
                  </tr>
                </thead>
                <tbody>
                  {unPublishedUserList &&
                    unPublishedUserList.map(function (a, index) {
                      return (
                        <tr onClick={() => {
                          confirmPublish(serviceName, a.userName, checkedService, a.empNo)
                        }}>
                          <td onClick={(e) => e.stopPropagation()}><FormControlLabel
                            key={index}
                            control={
                              <Checkbox
                                checked={checkboxStates[index]}
                                onChange={handleChildChange(index)}
                              />
                            }

                          /></td>
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
            <Modal.Footer>
            {(isParentChecked || isParentIndeterminate) && (
              
                <Button variant="contained" endIcon={<SendIcon />} onClick={() => {
                  confirmArrayPublish();
                }}>
                  {countCheckBoxArray.length}명 배포하기
                </Button>
              
            )}
            </Modal.Footer>
          </Tab>
          <Tab eventKey="profile" title="배포 해제">
            <Modal.Body  style={{ maxHeight: 'calc(100vh - 210px)'}}>

              <Table bordered hover>
                <thead>
                  <tr>
                    <th className="col-1"><FormControlLabel
                      control={
                        <Checkbox
                          checked={isParentChecked2}
                          indeterminate={isParentIndeterminate2}
                          onChange={handleParentChange2}
                        />
                      }

                    /></th>
                    <th className="col-3">이름</th>
                    <th className="col-3">아이디</th>
                    <th className="col-3">소속</th>
                    <th className="col-2">직급</th>
                  </tr>
                </thead>
                <tbody>
                  {publishedUserList &&
                    publishedUserList.map(function (a, index) {
                      return (
                        <tr onClick={() => {
                          confirmUnPublish(serviceName, a.userName, checkedService, a.empNo);
                        }}>
                          <td onClick={(e) => e.stopPropagation()}><FormControlLabel
                            key={index}
                            control={
                              <Checkbox
                                checked={checkboxStates2[index]}
                                onChange={handleChildChange2(index)}
                              />
                            }

                          /></td>
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
            <Modal.Footer>
            {(isParentChecked2 || isParentIndeterminate2) && (
              
                <Button variant="contained" color="warning" endIcon={<SendIcon />} onClick={() => {
                  confirmArrayUnPublish();
                }}>
                  {countCheckBoxArray2.length}명 배포 해제하기
                </Button>
              
            )}
            </Modal.Footer>
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
           {loading2 && (
        <div className="overlay-loading-box text-center">

          {/* 로딩 스피너 컴포넌트 */}
          <Spinner animation="border" variant="primary" style={{ fontSize: '3rem', width: "6rem", height: "6rem" }} />
          <div className="mt-3">배포 정보가 업데이트 중입니다.<br />잠시만 기다려주세요.</div>
        </div>
      )}
    </div>
  );

} export default Services;
