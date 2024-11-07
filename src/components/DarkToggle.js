import Form from 'react-bootstrap/Form';

function DarkSwitch() {
  return (
    <Form>
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="☼"
      />
    </Form>
  );
}

export default DarkSwitch;
