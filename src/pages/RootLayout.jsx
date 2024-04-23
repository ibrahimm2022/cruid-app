import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
function RootLayout() {
  return (
    <>
      <Container>
        <Header />
        <Row>
          <Col xs={{ span: 8, offset: 2 }}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RootLayout;
