import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import EmailIcon from "@mui/icons-material/Email";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import Input from "./input";
import styled from "styled-components";
import { connect } from "react-redux";

import { userLogin } from "../../../redux/actions/home";

const Login = (props) => {
  let { userLogin, authErr } = props;
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [err, setErr] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();

    if (!email.length && password.length) {
      setErr("No email provided");
    } else if (email.length && !password.length) {
      setErr("No password provided");
    } else if (!email.length && !password.length) {
      setErr("No email and password provided");
    } else {
      let data = {
        email: email,
        password: password,
      };

      userLogin(data);
    }
  };

  useEffect(() => {
    if (authErr) {
      setErr(authErr);
    }
  }, [authErr]);

  return (
    <LoginStyle>
      <div className="container">
        <h3>Login</h3>
        <Form className="form-body" onSubmit={handleSubmit}>
          <Input
            text="Email Address"
            type="text"
            state={email}
            handleState={setEmail}
            IconProp={EmailIcon}
          />
          <Input
            text="Passsword"
            type="password"
            state={password}
            handleState={setPassword}
            IconProp={NewReleasesIcon}
          />
          <Button
            type="submit"
            variant="primary"
            className="button"
            onClick={handleSubmit}
          >
            Log in
          </Button>

          {err.length ? <h6 className="err-msg">{err}</h6> : null}
        </Form>
      </div>
    </LoginStyle>
  );
};

let mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (data) => dispatch(userLogin(data)),
  };
};

let mapStateToProps = (state) => {
  return {
    authErr: state.homeReducer.authErr,
  };
};

const LoginStyle = styled.div`
  padding: 15% 0%;
  height: 100%;

  @media (max-width: 767px) {
    padding: 0% 0;
  }

  h3 {
    text-align: center;
    font-weight: 500;
  }

  .button {
    text-transform: uppercase;
    margin-top: 10px;
  }

  .err-msg {
    margin-top: 10px;
    color: red;
  }

  .container {
    height: 300px;
    width: 30%;
    padding-top: 20px;
    background-color: #fafafa;
    border-radius: 2px;

    @media (max-width: 767px) {
      padding-top: 15%;
      width: 100%;
      height: 100%;
    }
  }

  .form-body {
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 767px) {
      padding-top: 2%;
    }
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
