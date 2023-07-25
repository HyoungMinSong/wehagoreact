import { useState } from "react";
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import InputMask from 'react-input-mask';
import { useSelector } from "react-redux";
import SignUpHeader from "./SignUpHeader";
import { useNavigate } from "react-router-dom";


// className="border-danger"
function SignUp_complete() {
  let [name, setName] = useState('');
  let [nameError, setNameError] = useState(false);
  let [phoneNumber, setPhoneNumber] = useState('');
  let [phoneNumberError, setphoneNumberError] = useState(false);
  let [id, setId] = useState('');
  let [password, setPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');
  let [email, setEmail] = useState('');

  let regex =  /^[가-힣a-zA-Z]+$/;
  let numberRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;

  let test = useSelector((state) => { return state.user });
  console.log(test);
  let navigate = useNavigate();
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
        <Image src={require('./wehagologo.png')} fluid  className="my-5"/>
          <Card.Text className="" style={{ fontWeight: 'bold' }}>
          위하고 회원가입이 완료되었습니다.

          </Card.Text>
          
        </Card.Body>
        <div className="my-4 text-center">
          <p>회원가입 절차가 모두 완료되었습니다.</p>
          <p>로그인 후 편리하고 안전한 위하고 서비스를 확인해 보세요.</p>
        </div>
        <Button variant="primary" size="lg" className="mb-5" onClick={()=>{
          navigate('/login')
        }}>
          로그인
        </Button>
      </Card>
      </div>
    </Col>
  </Row>
</Container>
</div>
</>
    );
}

export default SignUp_complete;