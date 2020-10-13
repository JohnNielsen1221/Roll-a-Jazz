import React, { useState, useEffect } from "react";
import QrReader from "react-qr-reader";
import { Button } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { ADD_COLLECTED_CARD } from "../../utils/mutations";

const QrButton = () => {
  const [result, setResult] = useState("No result");
  const [toggle, setToggle] = useState(false);

  // use a mutation to add scanned card to database
  const [addCollectedCard] = useMutation(ADD_COLLECTED_CARD);

  const handleScan = (scannedData) => {
    if (scannedData) {
      console.log(scannedData);
      addCollectedCard({ variables: { _id: scannedData } });
      setResult(scannedData);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const reader = (
    <QrReader
      delay={300}
      onError={handleError}
      onScan={handleScan}
      className="mb-2"
    />
  );

  useEffect(() => {
    setToggle(false);
  }, [result]);

  return (
    <div className="scanner">
      {toggle && reader}
      <Button
        className="col-12 mb-3 btn-border scan-button"
        style={{ width: "100%" }}
        onClick={() => (toggle ? setToggle(false) : setToggle(true))}
      >
        Scan Code
      </Button>
      <p>{result}</p>
    </div>
  );
};

export default QrButton;
