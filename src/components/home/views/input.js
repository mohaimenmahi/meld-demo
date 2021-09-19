import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

const Input = (props) => {
  let { IconProp, text, handleState, state, type } = props;

  let handleChange = (e) => {
    handleState(e.target.value);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        backgroundColor: "#c9d2e0",
        display: "flex",
        alignItems: "center",
        maxWidth: 400,
        m: "10px 0 0 0",
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <IconProp />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={text}
        value={state}
        type={type}
        onChange={handleChange}
      />
    </Paper>
  );
};

export default Input;
