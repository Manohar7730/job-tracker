// src\pages\Auth\PasswordField.jsx

// Password field with show/hide toggle

import React, { useState } from "react";
import viewIcon from "../../assets/icons/view.png";
import hideIcon from "../../assets/icons/hide.png";

export default function PasswordField({ value, onChange, placeholder }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-field">
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
      <button
        type="button"
        className="show-btn"
        onClick={() => setVisible(!visible)}
      >
        <img src={visible ? viewIcon : hideIcon} alt="Toggle visibility" />
      </button>
    </div>
  );
}
