import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const DataPagination = ({
  data,
  pageLimit,
  contestType,
  searchString,
  dataLimit = 10,
}) => {
  const [pages] = useState(Math.round(data.length / dataLimit));
  // const []
  // console.log(pages);
  const [contestNum, setContestNum] = useState(dataLimit);
  const [currPage, setCurrPage] = useState(1);
  const [favs, setFavs] = useState([]);
  useEffect(() => {
    fetchFavs();
  }, []);
  const fetchFavs = () => {
    let allFavs = JSON.parse(localStorage.getItem("favs"));
    if (allFavs) {
      setFavs(allFavs);
    }
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

  const goToNextPage = () => {
    setCurrPage((currPage) => currPage + 1);
  };
  const goToPrevPage = () => {
    setCurrPage((currPage) => currPage - 1);
  };
  const changePage = (event) => {
    const pageNum = Number(event.target.textContent);
    setCurrPage(pageNum);
    // console.log(pageNum);
  };
  const getPaginatedData = () => {
    const startIndex = currPage * contestNum - contestNum;
    const endIndex = startIndex + parseInt(contestNum);
    // console.log(startIndex, endIndex);
    return data.slice(startIndex, endIndex);
  };
  const getPaginationGroup = () => {
    // console.log(currPage, pageLimit);
    let start = Math.floor((currPage - 1) / pageLimit) * pageLimit;
    // console.log(start);
    // if(start+pages)
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };
  const handleChange = (event) => {
    setContestNum(event.target.value);

    //  set event.target.value;
    // console.log(dataLimit);
  };

  return (
    <Container>
      <Row sm={1} xs={1} lg={3}>
        {getPaginatedData().length > 0
          ? getPaginatedData().map((contest, idx) => {
              return (
                contest.phase === "FINISHED" &&
                (contestType === "ALL" ||
                  (contestType === "favs" &&
                    favs.includes(contest.id.toString())) ||
                  contest.type === contestType) &&
                contest.name
                  .toLowerCase()
                  .includes(searchString.toLowerCase()) && (
                  <Col key={idx}>
                    {" "}
                    <Card bg="light" border="info">
                      <Link
                        to={`/contest/${contest.id}`}
                        state={{ contest: contest }}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Card.Header>
                          <h5>{contest.name}</h5>
                        </Card.Header>
                      </Link>{" "}
                      <Card.Body>
                        <h6>{contest.type} Type</h6>
                        <h6>{contest.phase === "FINISHED" && "Completed"}</h6>
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
                          Duration: {Math.floor(contest.durationSeconds / 3600)}
                          hours{" "}
                          {(contest.durationSeconds % 3600) / 60 > 0 &&
                            (contest.durationSeconds % 3600) / 60 + "minutes"}
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
          : "Sorry, No Contest Data here!!!"}
      </Row>
      <br />
      <Row>
        <label> Select number of contest to show:</label>
        <Col lg={1}>
          <input type="number" onChange={handleChange} value={contestNum} />
          {contestNum}
        </Col>
      </Row>
      <br />
      <Row>
        <Col lg={10} style={{ textAlign: "center", alignItems: "center" }}>
          <button
            onClick={goToPrevPage}
            className={`prev ${currPage === 1 ? "disabled" : ""}`}
          >
            prev
          </button>
          &emsp;&emsp;
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`pageButton ${currPage === item ? "active" : null}`}
            >
              <span>{item}</span>
            </button>
          ))}
          &emsp; &emsp;
          <button
            onClick={goToNextPage}
            className={`next ${currPage === pages ? "disabled" : ""}`}
          >
            next
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default DataPagination;
