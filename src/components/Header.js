import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      style={{
        width: "100%",
        background: "teal",
        height: "4rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>Contest Fetcher</h1>
        </Link>
      </Container>
    </div>
  );
};

export default Header;
