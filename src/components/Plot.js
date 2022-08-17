import "../App.css";
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

export const Plot = ({ token, item }) => {
  const [response, setResponse] = useState(null);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    try {
      let info = {};
      let infos = [];
      if (item.includes("album")) {
        console.log(getAlbum(token, item));
      } else if (item.includes("track")) {
        getAudioFeaturesTrack(token, item).then((response) => {
          info.x = response.valence * 100;
          info.y = response.energy * 100;
        });
        getTrack(token, item).then((response) => {
          info.artist = response.artists[0].name;
          info.name = response.name;
        });
        infos.push(info);
        setData(infos);
      }
    } catch (e) {
      console.error(e);
      setResponse(null);
    }
  }, [item]);

  return (
    <ScatterChart height={500} width={500}>
      <CartesianGrid />
      <XAxis type="number" dataKey="x" domain={[-100, 100]} />
      <YAxis type="number" dataKey="y" domain={[-100, 100]} />
      <Scatter data={data} fill="green" />
      <ReferenceLine y={0} stroke="#000000" />
      <ReferenceLine x={0} stroke="#000000" />
      <ReferenceLine />
    </ScatterChart>
  );
};
