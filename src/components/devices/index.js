import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { logOut } from "../../redux/actions/home";
import { completeNotify, getDevices } from "../../redux/actions/devices";
import NotifyModal from "./notify-modal";

const DeviceMain = (props) => {
  let { logOut, devices, getDevices, authToken } = props;

  let [openModal, setModal] = useState(false);

  let handleModal = () => {
    setModal(!openModal);
  };

  let handleLogout = () => {
    logOut();
  };

  useEffect(() => {
    setInterval(() => {
      getDevices();
    }, 5000);
  }, []);

  useEffect(() => {
    if (devices) {
      let div = 360 / devices;
      let radius = 150;
      let parentdiv = document.getElementById("parentdiv");
      let offsetToParentCenter = parseInt(parentdiv.offsetWidth / 2);
      let offsetToChildCenter = 20;
      let totalOffset = offsetToParentCenter - offsetToChildCenter;
      while (parentdiv.childElementCount > devices + 3) {
        parentdiv.removeChild(
          parentdiv.childNodes[parentdiv.childElementCount - 1]
        );
      }
      for (let i = 0; i < devices; i++) {
        let childdiv = document.createElement("div");
        childdiv.className = "div2";
        childdiv.style.position = "absolute";
        let y = Math.sin(div * i * (Math.PI / 180)) * radius;
        let x = Math.cos(div * i * (Math.PI / 180)) * radius;
        childdiv.style.top = (y + totalOffset).toString() + "px";
        childdiv.style.left = (x + totalOffset).toString() + "px";
        parentdiv.appendChild(childdiv);
      }
    }
  }, [devices]);

  return (
    <DeviceStyle>
      <NotifyModal
        show={openModal}
        handleClose={handleModal}
        token={authToken}
      />
      <div className="container">
        <div id="parentdiv">
          <h1>{devices}</h1>
          <h6>{devices > 1 ? "Devices" : "Device"}</h6>
          <h6>Online</h6>
        </div>
      </div>
      <div className="button-group">
        <div className="button-row">
          <Button className="button" variant="light" onClick={handleModal}>
            Notify
          </Button>
          <Button className="button" variant="dark" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </DeviceStyle>
  );
};

const DeviceStyle = styled.div`
  padding: 15% 0;
  background-color: #f78222;
  height: 100vh;

  #parentdiv {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 150px;
    margin-top: 30px;
    margin-left: 44%;
    h1 {
      color: #fff;
    }

    h6 {
      color: #fff;
      text-transform: uppercase;
    }
  }

  .div2 {
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 100px;
    animation: spin-right 10s linear infinite;
  }

  .container {
    text-align: center;
  }

  .button-group {
    position: absolute;
    bottom: 0;
    height: 75px;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);

    .button-row {
      padding: 15px 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .button {
      margin-right: 10px;
    }
  }

  @keyframes spin-right {
    100% {
      transform: rotate(360deg);
    }
  }
`;

let mapStateToProps = (state) => {
  return {
    authToken: state.homeReducer.authToken,
    devices: state.deviceReducer.devices,
    deviceLoading: state.deviceReducer.deviceLoading,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
    getDevices: () => dispatch(getDevices()),
    notify: (data) => dispatch(completeNotify(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceMain);
