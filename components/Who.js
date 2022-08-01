import React from "react";

const Who = ({ name }) => {
  return (
    <div className="one">
      <h1 className="gold-gradient accent-font">Patrick Lima</h1>
      <h1 className="large-font gold-gradient accent-font">&</h1>
      <h1 className="gold-gradient accent-font">Juliana Said</h1>

      <h2>Convidam para o seu casamento</h2>

      <h1>{name}</h1>
    </div>
  );
};

export default Who;
