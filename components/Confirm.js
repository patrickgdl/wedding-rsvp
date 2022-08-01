import React from "react";

const Confirm = () => {
  return (
    <div className="four">
      <h1>Confirme e continue abaixo</h1>

      <div className="toggle">
        <input
          type="radio"
          name="option"
          value="yes"
          id="yes"
          defaultChecked="checked"
        />
        <label htmlFor="yes">Sim</label>

        <input type="radio" name="option" value="no" id="nope" />
        <label htmlFor="nope">Não</label>
      </div>

      <h2>Por favor, responda até dia 25 de agosto</h2>

      <button type="submit">Finalizar</button>
    </div>
  );
};

export default Confirm;
