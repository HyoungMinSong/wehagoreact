import { Form } from "react-bootstrap";

function Administrator() {

  return(
    <div><Form>
    <Form.Check // prettier-ignore
      type="switch"
      id="custom-switch"
      label="Check this switch"
    />
  </Form></div>
  );

}export default Administrator;
