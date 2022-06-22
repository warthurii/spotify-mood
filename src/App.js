import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { authEndpoint, clientId, redirectUri, scope } from "./config";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import InformationAccordion from "./InformationAccordion.js";
import hash from "./hash";
import SearchForm from "./SearchForm";
import Plot from "./plot";

function App() {
  const [token, setToken] = useState(null);
  const [item, setItem] = useState(null);
  const [tokenType, setTokenType] = useState(null);
  const [expiresIn, setTokenExpiresIn] = useState(null);
  const [val, setVal] = useState("0");

  useEffect(() => {
    let mToken = hash.access_token;
    if (mToken) {
      setToken(mToken);
      console.log("mToken: " + mToken);
    }
  });

  const handleLogin = () => {
    var url = authEndpoint;
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(clientId);
    url += "&scope=" + encodeURIComponent(scope);
    url += "&redirect_uri=" + encodeURIComponent(redirectUri);
    // url += "&state=" + encodeURIComponent(state);
    window.location = url;
  };

  const selectChangeHandler = (e) => {
    console.log(e);
    setVal(e.target.value);
  };

  return (
    <>
      <h1>Spotify Your Mood :(:</h1>

      <Container className="App-body">
        <br />
        <Row className="text-center">
          <Col md>
            <Button
              variant="outline-dark primary"
              size="lg"
              onClick={handleLogin}
            >
              {token ? "Login To Spotify" : "Login To Spotify First!"}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>What would you like to search for?</h2>
          </Col>
        </Row>
        <Row>
          <SearchForm token={token} setItem={setItem} />
        </Row>
        {item ?? (
          <Row>
            <Plot />
          </Row>
        )}
        <Row className="mt-3">
          <InformationAccordion></InformationAccordion>
        </Row>
      </Container>
    </>
  );
}

export default App;
