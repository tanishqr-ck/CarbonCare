import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <div id="footer">
      <footer>
        <Container fluid="md">
          <Row>
            <Col>
              <p>
                The Carbon Credit MarketPlace that let's you trade carbon credits with cryptocurrencies to help maximize your Profit and Production.
                This initiative helps you minimize carbon emissions to protect the environment.
              </p>
            </Col>
            <Col>
              <p>Copyright ⓒ CarbonCare {year}</p>
              <br />
              <p>Made with ❤️ by Tanishq Rajput</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default Footer;
