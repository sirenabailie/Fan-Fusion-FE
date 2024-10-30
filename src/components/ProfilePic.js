import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useAuth } from '../utils/context/authContext';

function ProfilePic() {
  const { user } = useAuth();

  return (
    <>
      <Container>
        <Row className="centered">
          <Col xs={6} md={4}>
            <Image className="userImage" src={user.image} roundedCircle />
            <h3>
              {user.firstName} {user.lastName}
            </h3>
            <p>{user.email}</p>
            <br />
            <h5>Published Stories</h5>
          </Col>
        </Row>
      </Container>
      <hr />
    </>
  );
}

export default ProfilePic;
