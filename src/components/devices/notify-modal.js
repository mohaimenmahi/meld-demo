import React, { useState, useEffect, memo } from "react";
import { Modal, Button, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { completeNotify } from "../../redux/actions/devices";
import TimerMixin from "react-timer-mixin";

const NotifyModal = (props) => {
  let { handleClose, show, notify, notifyMsg, notifyErr, token } = props;

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [repo, setRepo] = useState("");
  let [msg, setMsg] = useState("");
  let [err, setErr] = useState("");
  let [success, setSuccess] = useState("");

  let handleName = (e) => {
    setName(e.target.value);
  };

  let handleEmail = (e) => {
    setEmail(e.target.value);
  };

  let handleRepo = (e) => {
    setRepo(e.target.value);
  };

  let handleMsg = (e) => {
    setMsg(e.target.value);
  };

  let handleSubmit = () => {
    if (email.length && name.length && repo.length) {
      let data = {
        name: name,
        email: email,
        repoUrl: repo,
        message: msg,
        token: token,
      };
      notify(data);
    } else {
      setErr("Please fill up all required fields");
    }
  };

  let handleCancel = () => {
    setName("");
    setEmail("");
    setRepo("");
    setMsg("");
    setErr("");
    setSuccess("");
    handleClose();
  };

  useEffect(() => {
    if (notifyMsg) {
      setSuccess(notifyMsg);
      setErr("");

      TimerMixin.setTimeout(() => {
        handleCancel();
      }, 3000);
    } else if (notifyErr) {
      setErr(notifyErr);
      setSuccess("");

      TimerMixin.setTimeout(() => {
        handleCancel();
      }, 3000);
    }
  }, [notifyMsg, notifyErr]);

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Notify</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Row>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={name}
                  onChange={handleName}
                  placeholder={"Your Name"}
                />
              </Row>
              <Row>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={email}
                  onChange={handleEmail}
                  placeholder={"Your Email"}
                />
              </Row>
              <Row>
                <Form.Label>Github Repo</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={repo}
                  onChange={handleRepo}
                  placeholder={"Github Repo"}
                />
              </Row>
              <Row>
                <Form.Label>Message</Form.Label>
                <Form.Control
                  type="text"
                  value={msg}
                  onChange={handleMsg}
                  placeholder={"Any Messages?"}
                  autoComplete="off"
                />
              </Row>
            </Form.Group>
          </Form>
          {success.length ? (
            <h6 style={{ color: "green", textAlign: "center" }}>{success}</h6>
          ) : null}
          {err.length ? (
            <h6 style={{ color: "red", textAlign: "center" }}>{err}</h6>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Notify
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

let mapStateToProps = (state) => {
  return {
    notifyMsg: state.deviceReducer.notifyMsg,
    notifyErr: state.deviceReducer.notifyErr,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    notify: (data) => dispatch(completeNotify(data)),
  };
};

export default memo(connect(mapStateToProps, mapDispatchToProps)(NotifyModal));
