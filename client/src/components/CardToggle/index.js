import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faClone } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

const CardToggle = ({ viewSelected, setViewSelected }) => {
  const handleToggle = () => {
    setViewSelected(!viewSelected);
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={handleToggle}
      className="rounded-0 no-focus-outline car-view"
    >
      {viewSelected ? (
        <FontAwesomeIcon
          icon={faThLarge}
          size="lg"
          className="card-toggle flip car-view"
        />
      ) : (
        <FontAwesomeIcon
          icon={faClone}
          size="lg"
          className="card-toggle flip car-view"
        />
      )}
    </Button>
  );
};

export default CardToggle;
