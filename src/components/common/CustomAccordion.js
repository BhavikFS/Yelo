import React from "react";
import Accordion from "react-bootstrap/Accordion";

const CustomAccordion = ({ children, title, id }) => {
  return (
    <Accordion defaultActiveKey={id} className="w-100">
      <Accordion.Item eventKey={id}>
        <Accordion.Header>{title}</Accordion.Header>
        <Accordion.Body>{children}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default CustomAccordion;
