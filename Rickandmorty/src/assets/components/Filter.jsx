import { useState } from "react";
import Form from "react-bootstrap/Form";

function Filter({ onStatusChange, onSortChange }) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSort, setSelectedSort] = useState("asc");

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    onStatusChange(status);
  };

  const handleSortChange = (e) => {
    const sortDirection = e.target.value;
    setSelectedSort(sortDirection);
    onSortChange(sortDirection);
  };

  return (
    <div className="my-4">
      <div className="input-group">
        <Form.Select
          aria-label="Default select example"
          value={selectedStatus}
          onChange={handleStatusChange}
          className="custom-select"
        >
          <option>Filter by Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </Form.Select>

        <Form.Select
          aria-label="Default select example"
          value={selectedSort}
          onChange={handleSortChange}
          className="custom-select ml-2"
        >
          <option>Alphabetical order</option>
          <option value="asc">A to Z</option>
          <option value="desc">Z to A</option>
        </Form.Select>
      </div>
    </div>
  );
}

export default Filter;
