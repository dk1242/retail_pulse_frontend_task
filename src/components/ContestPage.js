import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Header from "./Header";

const ContestPage = () => {
  const location = useLocation();
  const contest = location.state.contest;
  console.log(contest);
  return (
    <div>
      <Header />
      <br />
      <Container>
        <Row>
          <h2>{contest.name}</h2>
        </Row>
        <hr />
        <Row className="shadow-lg p-3 mb-5 bg-white rounded">
          <Col>
            <h4>Contest Id: {contest.id}</h4>
            <h4>Contest Type: {contest.type}</h4>
            <h4>
              <span style={{ backgroundColor: "teal", color: "white" }}>
                {(contest.phase === "BEFORE" && "Not Started Yet") ||
                  (contest.phase === "FINISHED" && "Completed")}
              </span>
            </h4>
            <h4>
              Start Date and Time:{" "}
              {new Date(contest.startTimeSeconds * 1000).toLocaleDateString()}{" "}
              {new Date(contest.startTimeSeconds * 1000).toLocaleTimeString()}
            </h4>
            <h4>
              Duration: {Math.floor(contest.durationSeconds / 3600)}
              hours{" "}
              {(contest.durationSeconds % 3600) / 60 > 0 &&
                (contest.durationSeconds % 3600) / 60 + "minutes"}
            </h4>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContestPage;
