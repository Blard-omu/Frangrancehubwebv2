import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Searchi from "../assets/icons/Vector (5).png"
import Search from './forms/Search';
import "../css/HandleShow.css"

function HandleShow({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="" onClick={handleShow} className="">
      <img src={Searchi} alt="Search" />
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props} placement='top' variant="">
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Search/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default HandleShow;
