import React from "react";
import { Form, Button, Col } from "react-bootstrap";

const Filters = ({ filterByTitle, filterByActors, sortingByAlphabet }) => {
  return (
    <Form className="m-3 p-3">
      <Form.Row>
        <Col>
          <Form.Control
            placeholder="Filter by title..."
            onChange={e => {
              filterByTitle(e.target.value);
            }}
          />
        </Col>
        Or
        <Col>
          <Form.Control
            placeholder="Filter by actors..."
            onChange={e => {
              filterByActors(e.target.value);
            }}
          />
        </Col>
      </Form.Row>
      <Form.Row className="p-1 pt-3">
        <Button
          variant="primary"
          size="lg"
          block
          onClick={() => {
            sortingByAlphabet();
          }}
        >
          Sort alphabetically
        </Button>
      </Form.Row>
    </Form>
  );
};

export default Filters;
