import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import QrCode from "../QrCode";
import EditCardForm from "../EditCardForm";
import ReactCardFlip from "react-card-flip";
import DeleteCard from "../DeleteCard";
import RemoveCard from "../RemoveCard";

function SingleCardModal({ show, setShow, card }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const [, setInProp] = useState();

  const [isEdit, setIsEdit] = useState(false);

  const handleFlip = () => {
    setInProp(true);
    setIsFlipped(!isFlipped);
  };

  let isHome;

  const pageCheck = () => {
    if (window.location.pathname === "/cards") {
      isHome = true;
    } else {
      isHome = false;
    }
  };

  pageCheck();

  const editCard = () => {
    console.log("editing card");
    setShow(false);
    setIsEdit(true);
  };

  return (
    <>
      {isEdit && (
        <div className="row justify-content-center">
          <EditCardForm card={card} setIsEdit={setIsEdit} />
        </div>
      )}
      {!isEdit && (
        <Modal
          animation={false}
          show={show}
          onHide={() => setShow(false)}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="scale-in border-0"
          style={{ backgroundColor: "rgba(14, 14, 14, 0.3)" }}
        >
          <ReactCardFlip
            isFlipped={isFlipped}
            flipDirection="horizontal"
            containerStyle={{ backgroundColor: "rgb(14, 14, 14)" }}
          >
            {/* <OverlayTrigger
              overlay={
                <Tooltip id="tooltip">
                  <strong>Click</strong> again to flip to the back
                </Tooltip>
              }
            > */}
              <Card
                className="pointer border-0 single-card"
                key={card._id}
                key="front"
                onClick={handleFlip}
              >
                {/* <Card.Img variant="top" src={card.logoUrl} /> */}
                <Card.Body className="text-center">
                  <Card.Title>{card.name}</Card.Title>
                  <Card.Subtitle className=" card-sub mb-4">
                    {card.jobTitle}
                  </Card.Subtitle>
                  <Card.Subtitle>{card.companyName}</Card.Subtitle>
                  <Card.Link 
                    rel={"external"}
                    href={"https://" + card.website} 
                    target="_blank"
                  >
                    {card.website}
                  </Card.Link>
                  <Card.Text>{card.tagline}</Card.Text>
                  <h5 className="card-contact ">Contact</h5>
                  <Card.Link href={"mailto:" + card.email}>
                    {card.email}
                  </Card.Link>
                  <br />
                  <Card.Link href={"tel:+" + card.phone}>
                    {card.phone}
                  </Card.Link>
                  {/* <QrCode cardId={card._id}/> */}
                </Card.Body>
              </Card>
            {/* </OverlayTrigger> */}
            {/* <OverlayTrigger
              overlay={
                <Tooltip id="tooltip">
                  <strong>Click</strong> off of the card to dismiss
                </Tooltip>
              }
            > */}
              <Card
                className="flip-in pointer border-0 single-card"
                key={card._id}
                key="back"
                onClick={handleFlip}
              >
                <Card.Body className="d-flex justify-content-center align-items-center qr-body">
                  <QrCode cardId={card._id} />
                </Card.Body>
                {/* Kailey's delete button will go here */}
                {isHome ? (
                  <ButtonGroup
                    className="justify-content-between"
                    aria-label="home-btns"
                  >
                    <Button
                      className="edit-btn"
                      value={card}
                      variant="primary"
                      onClick={() => editCard()}
                    >
                      <img src="https://img.icons8.com/metro/36/d4af37/edit.png" />
                    </Button>
                    <DeleteCard card={card} />
                  </ButtonGroup>
                ) : (
                  <ButtonGroup className="remove-btn" aria-label="home-btns">
                    <RemoveCard card={card} />
                  </ButtonGroup>
                )}
              </Card>
            {/* </OverlayTrigger> */}
          </ReactCardFlip>
        </Modal>
      )}
    </>
  );
}

export default SingleCardModal;
