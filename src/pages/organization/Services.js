import { Col, Container, ListGroup, Modal, Row, Tab, Table } from "react-bootstrap";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { useState } from "react";
import axiosApi from "../../AxiosApi";
import { useSelector } from "react-redux";

// const Feature = ({ icon, title, description, cta }) => (
//   <div className=" col " >
//     <div style={{ backgroundColor: '#f5f7f9' }} className="py-5 rounded " onClick={() => setShow(true)}>
//       <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
//         <CategoryOutlinedIcon style={{ fontSize: '80px' }} />
//       </div>
//       <h3 className="fs-2 text-body-emphasis">메신저</h3>
//       <p>사용자의 수 [1/10]</p>
//       <a href="#" className="icon-link">
//         Call to action
//         &gt;
//       </a>
//     </div>
//   </div>
// );

function Services() {

  const [show, setShow] = useState(false);
  let [companySerivces, setCompanyServices] = useState('');

  // 로그인 유저 정보
  const loginedUser = useSelector((state) => state.loginUserData);
  // let comNo = loginedUser.company.t_company_no;
  console.log(loginedUser);
  let comNo = loginedUser.company && loginedUser.company.length > 0 ? loginedUser.company.find((item) => item.t_company_name === loginedUser.companyName).t_company_no : loginedUser.company[0].t_company_no;
  console.log("comNo" + comNo)

  // axiosApi.post("/findservicelistbycomno", {
  //   comNo: comNo
  // }).then((c) => {
  //   setCompanyServices(c.data);
  //   console.log(c.data);
  // }).catch(() => {console.log('실패실패')})

  // 모달창 띄우기 유무
  

  return (
    <>
      <div className="mx-5 mb-5 mt-4">
        <div className="text-start">
          <span className="mx-1" style={{ fontSize: '20px' }}><b>서비스 배포관리</b></span><span className="text-muted small-text">회사에서 사용중인 서비스에 대하여 사용자 배포현황을 관리할 수 있습니다.</span>
        </div>
        <hr />
        <div className="m-5">
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
              <Col sm={4}>
                <ListGroup>
                  <ListGroup.Item action href="#link1">
                    Link 1
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link2">
                    Link 2
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  <Tab.Pane eventKey="#link1">
                    <div className="row g-4  row-cols-1 row-cols-lg-3">
                      <div className=" col " >
                        <div style={{ backgroundColor: '#f5f7f9' }} className="py-5 rounded " onClick={() => setShow(true)}>
                          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                            <CategoryOutlinedIcon style={{ fontSize: '80px' }} />
                          </div>
                          <h3 className="fs-2 text-body-emphasis">메신저</h3>
                          <p>사용자의 수 [1/10]</p>
                          <a href="#" className="icon-link">
                            Call to action
                            &gt;
                          </a>
                        </div>
                      </div>
                      <div className=" col " >
                        <div style={{ backgroundColor: '#f5f7f9' }} className="py-5 rounded " onClick={() => setShow(true)}>
                          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                            <CategoryOutlinedIcon style={{ fontSize: '80px' }} />
                          </div>
                          <h3 className="fs-2 text-body-emphasis">메신저</h3>
                          <p>사용자의 수 [1/10]</p>
                          <a href="#" className="icon-link">
                            Call to action
                            &gt;
                          </a>
                        </div>
                      </div>
                      <div className=" col " >
                        <div style={{ backgroundColor: '#f5f7f9' }} className="py-5 rounded " onClick={() => setShow(true)}>
                          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                            <CategoryOutlinedIcon style={{ fontSize: '80px' }} />
                          </div>
                          <h3 className="fs-2 text-body-emphasis">메신저</h3>
                          <p>사용자의 수 [1/10]</p>
                          <a href="#" className="icon-link">
                            Call to action
                            &gt;
                          </a>
                        </div>
                      </div>
                      <div className=" col " >
                        <div style={{ backgroundColor: '#f5f7f9' }} className="py-5 rounded " onClick={() => setShow(true)}>
                          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                            <CategoryOutlinedIcon style={{ fontSize: '80px' }} />
                          </div>
                          <h3 className="fs-2 text-body-emphasis">메신저</h3>
                          <p>사용자의 수 [1/10]</p>
                          <a href="#" className="icon-link">
                            Call to action
                            &gt;
                          </a>
                        </div>
                      </div>
                      <div className=" col " >
                        <div style={{ backgroundColor: '#f5f7f9' }} className="py-5 rounded " onClick={() => setShow(true)}>
                          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                            <CategoryOutlinedIcon style={{ fontSize: '80px' }} />
                          </div>
                          <h3 className="fs-2 text-body-emphasis">메신저</h3>
                          <p>사용자의 수 [1/10]</p>
                          <a href="#" className="icon-link">
                            Call to action
                            &gt;
                          </a>
                        </div>
                      </div>
                      <div className=" col " >
                        <div style={{ backgroundColor: '#f5f7f9' }} className="py-5 rounded " onClick={() => setShow(true)}>
                          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                            <CategoryOutlinedIcon style={{ fontSize: '80px' }} />
                          </div>
                          <h3 className="fs-2 text-body-emphasis">메신저</h3>
                          <p>사용자의 수 [1/10]</p>
                          <a href="#" className="icon-link">
                            Call to action
                            &gt;
                          </a>
                        </div>
                      </div>

                    </div></Tab.Pane>
                  <Tab.Pane eventKey="#link2">Tab pane content 2</Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>메신저</Modal.Title>
        </Modal.Header>
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
        <tr>
          <td>송형민</td>
          <td>shmin11</td>
          <td>3조</td>
          <td>직급없음</td>
        </tr>
        <tr>
          <td>이주용</td>
          <td>Jacob</td>
          <td>3조</td>
          <td>직급없음</td>
        </tr>
        <tr>
          <td>최종원</td>
          <td>twitter</td>
          <td>3조</td>
          <td>직급없음</td>
        </tr>
      </tbody>
    </Table>
        </Modal.Body>
      </Modal>
    </>
  );

} export default Services;
