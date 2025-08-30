import React, { useState } from "react";
import view from "../../assets/icons/view.png";
import hide from "../../assets/icons/hide.png";

export default function PasswordField({ value, onChange, placeholder, name }) {
  const [show, setShow] = useState(false);

  return (
    <div className="password-field">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
      <button type="button" className="show-btn" onClick={() => setShow(!show)}>
        <img src={show ? view : hide} alt="toggle password" />
      </button>
    </div>
  );
}
