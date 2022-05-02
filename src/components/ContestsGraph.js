import React from "react";
import { Container, Row } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ContestsGraph = ({ data, contestType }) => {
  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
  };
  let labels = [],
    upcoming = [],
    finished = [];
  if (data && data.result && data.result.length) {
    data.result.reverse();
    data.result.forEach((contest) => {
      labels.push(contest.name);
    });
    data.result.forEach((contest) => {
      if (contest.phase === "BEFORE") {
        let time = contest.durationSeconds;
        upcoming.push(time);
      }
    });
    data.result.forEach((contest) => {
      if (contest.phase === "FINISHED") finished.push(contest.durationSeconds);
    });
  }
  let i = 0,
    j = 0;
  const MainData = {
    labels,
    datasets: [
      {
        label: "Upcoming",
        data: labels.map(() => {
          // j++;
          return upcoming[i++];
        }),
        borderColor: "darkgreen",
        backhroundColor: "lightgreen",
      },
      {
        label: "Completed",
        data: labels.map(() => finished[j++]),
        borderColor: "darkorange",
        backhroundColor: "orange",
      },
    ],
  };
  // console.log(MainData.datasets, finished);
  return (
    <Container>
      <Row>
        <h2>Duration Seconds vs Contest Name Graph</h2>
        <Line options={options} data={MainData} />
      </Row>
    </Container>
  );
};

export default ContestsGraph;
