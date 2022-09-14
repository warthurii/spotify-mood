import Card from 'react-bootstrap/Card';

export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <>
        <Card style={{ width: '10rem' }}>
          <Card.Img src={payload[0].payload.img} />
          <Card.Body>
            <Card.Subtitle>{payload[0].payload.name}</Card.Subtitle>
            <Card.Text>{payload[0].payload.artist}</Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }

  return null;
};
