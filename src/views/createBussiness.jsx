import React, { useState } from "react";
import apiCall from "../api/apicall";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const CreateBusinessPanel = () => {
  const [formData, setFormData] = useState({
    name: "",
    nit: "",
    mail: "",
  });

  const [message, setMessage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const emptyForm = () => {
    setFormData({
      name: "",
      nit: "",
      mail: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (formData.name.trim() === "") {
      setMessage("Error en el campo del negocio");
      return;
    }
  
    createBussiness(formData, emptyForm, setMessage);
  };

  return (
    <div style={{ width: "40%" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h1
          style={{
            fontFamily: "Lato",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "left",
          }}
        >
          Crear Negocio
        </h1>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <label htmlFor="name" style={{ padding: "8px", fontSize: "14px" }}>
              Nombre
            </label>
          </Grid>
          <Grid item xs={10}>
            <TextField
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={2}>
            <label htmlFor="name" style={{ padding: "8px", fontSize: "14px" }}>
              NIT
            </label>
          </Grid>
          <Grid item xs={10}>
            <TextField
              type="text"
              name="nit"
              value={formData.nit}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={2}>
            <label htmlFor="name" style={{ padding: "8px", fontSize: "14px" }}>
              Email
            </label>
          </Grid>
          <Grid item xs={10}>
            <TextField
              type="text"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={10}>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#11235A", width: "100%", color: "#F6ECA9", fontFamily: 'Lato',}}
            >
              Crear Negocio
            </Button>
          </Grid>
        </Grid>
      </form>
      {message && <p style={{ marginTop: "10px", color: message.includes("correcto") ? "green" : "red" }}>{message}</p>}
    </div>
  );
};

const createBussiness = async (business, emptyForm, setMessage) => {
  try {
    const response = await apiCall("businesses", "POST", business);
    if (response.status === 201) {
      setMessage(`El negocio ${business.name} fué creado con éxito.`);
      emptyForm();
    } else {
      setMessage(response.message);
    }
  } catch (error) {
    setMessage("Error en la solicitud.");
  }
};

export default CreateBusinessPanel;
