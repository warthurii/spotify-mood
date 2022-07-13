import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { authEndpoint, clientId, redirectUri, scope } from "./config";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import { InformationAccordion, SearchForm, Plot } from "./components";
import hash from "./hash";

function App() {
  const [token, setToken] = useState(null);
  const [item, setItem] = useState(null);
  const [searching, setSearching] = useState(false);
  const [tokenType, setTokenType] = useState(null);
  const [expiresIn, setTokenExpiresIn] = useState(null);
  const [val, setVal] = useState("0");

  useEffect(() => {
    let mToken = hash.access_token;
    if (mToken) {
      setToken(mToken);
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
              {token ? "Have Fun!" : "Login To Spotify First!"}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>What would you like to search for?</h2>
          </Col>
        </Row>
        <Row>
          <SearchForm
            token={token}
            setItem={setItem}
            searching={searching}
            setSearching={setSearching}
          />
        </Row>

        {!!item && (
          <Row className="mt-3 ml-0 justify-content-md-center">
            <>
              <Plot token={token} item={item} />
            </>
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
