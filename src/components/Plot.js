import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { getAlbum, getAudioFeaturesTrack, getTrack } from "../api";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { Row, Container, Col } from "react-bootstrap";

export const Plot = ({ item, data }) => {
  const [response, setResponse] = useState(undefined);
  //const [data, setData] = useState(undefined);
  // let data = []
  // useEffect(() => {
  //   try {
  //     let info = {};
  //     let infos = [];
  //     if (item.includes("album")) {
  //       console.log(getAlbum(token, item));
  //     } else if (item.includes("track")) {
  //       getAudioFeaturesTrack(token, item).then((response) => {
  //         info.x = response.valence * 100;
  //         info.y = response.energy * 100;
  //       });
  //       getTrack(token, item).then((response) => {
  //         info.artist = response.artists[0].name;
  //         info.name = response.name;
  //       });
  //       infos.push(info);
  //       //setData(infos);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //     setResponse(null);
  //   }
  //   console.log(data);
  // }, []);
  useEffect(() => {
    console.log(data);
    console.log(item);
  }, [data]);

  return (
    <>
      <Container>
        <Row className="mt-3 justify-content-md-center">
          <Col md="auto">
              <h3>{item.name}</h3>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <p>{item.artist}</p>
          </Col>
        </Row>
        <Row className="mt-3 ml-0 justify-content-md-center">
          <ScatterChart height={500} width={600} margin={{ top: 20, right: 20, bottom: 0 }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" domain={[0, 1]} />
            <YAxis type="number" dataKey="y" domain={[0, 1]} />
            <YAxis type="number" yAxisId="right" orientation="right" />
            <Scatter data={data} fill="green" />
            <ReferenceLine y={.5} stroke="#000000" />
            <ReferenceLine x={.5} stroke="#000000" />
            <ReferenceLine />
            </ScatterChart>
        </Row>
      </Container>
    </>
  );
};
