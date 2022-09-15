import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  Label,
} from 'recharts';
import { Row, Container, Col } from 'react-bootstrap';
import { CustomTooltip } from './CustomTooltip';

export const Plot = ({ item, data }) => {
  return (
    <>
      <Container>
        <Row className='mt-3 justify-content-md-center'>
          <Col md='auto'>
            <h3>{item.name}</h3>
          </Col>
        </Row>
        {!!item.artist && (
          <Row className='justify-content-md-center'>
            <Col md='auto'>
              <p>{item.artist}</p>
            </Col>
          </Row>
        )}
        <Row className='mt-3 ml-0 justify-content-md-center'>
          <ScatterChart
            height={500}
            width={600}
            margin={{ top: 20, right: 20, bottom: 20 }}
          >
            <CartesianGrid />
            <XAxis type='number' dataKey='x' domain={[0, 1]}>
              <Label offset={0} position='insideBottom'>
                Valence
              </Label>
            </XAxis>
            <YAxis
              type='number'
              dataKey='y'
              domain={[0, 1]}
              label={{ value: 'Energy', angle: -90, position: 'insideLeft' }}
            >
              <Label position='insideBottom' className='mood-label'>
                Sad
              </Label>
              <Label position='insideTopLeft' className='mood-label'>
                Angry
              </Label>
            </YAxis>
            <YAxis type='number' yAxisId='right' orientation='right'>
              <Label position='insideTopRight' className='mood-label'>
                Happy
              </Label>
              <Label position='insideBottom' className='mood-label'>
                Chill
              </Label>
            </YAxis>
            <Scatter data={data} fill='green' />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0.5} stroke='#000000' />
            <ReferenceLine x={0.5} stroke='#000000' />
            <ReferenceLine />
          </ScatterChart>
        </Row>
      </Container>
    </>
  );
};
