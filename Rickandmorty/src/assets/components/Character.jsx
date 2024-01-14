import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export function Character(character) {
  return (
    <Card style={{ width: "23rem" }}>
      <Card.Img variant="top" src={character.image} />
      <Card.Body>
        <Card.Title>{character.name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          {`Origin: ${character.origin && character.origin.name}`}
        </ListGroup.Item>
        <ListGroup.Item>{`Gender: ${character.gender}`}</ListGroup.Item>
        <ListGroup.Item>{`Species: ${character.species}`}</ListGroup.Item>
        <ListGroup.Item>{`Status: ${character.status}`}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default Character;
