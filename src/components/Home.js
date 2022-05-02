import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import DataPagination from "./DataPagination";
import { Link } from "react-router-dom";
import ContestsGraph from "./ContestsGraph";

const Home = () => {
  const [contestType, setContestType] = useState("ALL");
  const [contests, setContests] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [showGraph, setShowGraph] = useState(false);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    loadContests();
    fetchFavs();
  }, []);
  const fetchFavs = () => {
    let allFavs = JSON.parse(localStorage.getItem("favs"));
    if (allFavs) {
      setFavs(allFavs);
    }
  };
  const loadContests = async () => {
    await fetch("https://codeforces.com/api/contest.list")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setContests(data);
      })
      .catch((err) => console.log(err));
  };
  const handleContestTypeChange = (event) => {
    setContestType(event.target.value);
    console.log(contestType, event.target.value);
  };
  const handleSearch = (event) => {
    // console.log(event)
    setSearchString(event.target.value);
  };
  const handleFavs = (event) => {
    let allFavs = [];
    if (localStorage.getItem("favs")) {
      allFavs = JSON.parse(localStorage.getItem("favs"));
    }
    // console.log(typeof allFavs[0]);
    if (allFavs.includes(event.target.value.toString())) {
      let ind = allFavs.indexOf(event.target.value.toString());
      allFavs.splice(ind, 1);
    } else allFavs.push(event.target.value);
    localStorage.setItem("favs", JSON.stringify(allFavs));
    fetchFavs();
  };
  return (
    <div>
      <Header />
      <br />
      <Container>
        <Row>
          <Col>
            <h2>All Contests</h2>
          </Col>
          <Col>
            <input
              placeholder="Search here..."
              value={searchString}
              onChange={handleSearch}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col lg={2}>
            <div>
              <h3>Filters</h3>
              <select value={contestType} onChange={handleContestTypeChange}>
                <option value="ALL">Show All</option>
                <option value="ICPC">ICPC only</option>
                <option value="CF">CF only</option>
                <option value="favs">Favorites only</option>
              </select>
            </div>
          </Col>
          <Col lg={2}>
            <br />
            <Button
              variant="outline-info"
              onClick={() => {
                // console.log(showGraph);
                setShowGraph(!showGraph);
              }}
            >
              Show Graph
            </Button>
          </Col>
          <Col
            lg={8}
            style={{ justifyContent: "center" }}
            className="shadow p-3 mb-5 bg-white rounded"
          >
            {showGraph && (
              <ContestsGraph data={contests} contestType={contestType} />
            )}
            <h3>Upcoming Contests</h3>
            <br />
            <Row sm={1} xs={1} lg={3}>
              {contests && contests.result && contests.result.length > 0
                ? contests.result.map((contest, idx) => {
                    return (
                      contest.phase === "BEFORE" &&
                      (contestType === "ALL" ||
                        (contestType === "favs" &&
                          favs.includes(contest.id.toString())) ||
                        contest.type === contestType) &&
                      contest.name
                        .toLowerCase()
                        .includes(searchString.toLowerCase()) && (
                        <Col key={idx}>
                          <Card bg="light" border="info">
                            <Link
                              to={`/contest/${contest.id}`}
                              state={{ contest: contest }}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <Card.Header>
                                <h5>{contest.name}</h5>
                              </Card.Header>
                            </Link>
                            <Card.Body>
                              <h6>{contest.type} Type</h6>
                              <h6>
                                {contest.phase === "BEFORE" && "Upcoming"}
                              </h6>
                              <p>
                                Start Date:{" "}
                                {new Date(
                                  contest.startTimeSeconds * 1000
                                ).toLocaleDateString()}{" "}
                                {new Date(
                                  contest.startTimeSeconds * 1000
                                ).toLocaleTimeString()}
                              </p>
                              <p>
                                Duration:{" "}
                                {Math.floor(contest.durationSeconds / 3600)}
                                hours{" "}
                                {(contest.durationSeconds % 3600) / 60 > 0 &&
                                  (contest.durationSeconds % 3600) / 60 +
                                    "minutes"}
                              </p>
                              <p>Contest Id: {contest.id}</p>
                              <div>
                                <input
                                  type="checkbox"
                                  value={contest.id}
                                  onChange={handleFavs}
                                  checked={favs.includes(contest.id.toString())}
                                />
                                &ensp; Mark as Favorite
                              </div>
                            </Card.Body>
                          </Card>

                          <br />
                        </Col>
                      )
                    );
                  })
                : "Loading"}
            </Row>
            <Row>
              <Col>
                <hr />
                <h3>Past Contests</h3>
                <br />
                {contests && contests.result && contests.result.length > 0 ? (
                  <DataPagination
                    data={contests.result}
                    pageLimit={10}
                    searchString={searchString}
                    contestType={contestType}
                    dataLimit={10}
                  />
                ) : (
                  "Loading"
                )}
                <br />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
