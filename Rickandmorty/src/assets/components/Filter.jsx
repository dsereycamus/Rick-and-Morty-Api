import Form from "react-bootstrap/Form";

function Filter({ onStatusChange }) {
  return (
    <Form.Select aria-label onChange={(e) => onStatusChange(e.target.value)}>
      <option>Filter status</option>
      <option value="alive">Alive</option>
      <option value="dead">Dead</option>
      <option value="unknown">Unknown</option>
    </Form.Select>
  );
}

export default Filter;
