import React from "react";
import { fieldOptions, operators } from "../constants";

const ConditionRow = ({ condition, onChange, onDelete }) => {
  const { field, operator, value } = condition;

  const onFieldChange = (e) => {
    const selectedField = e.target.value;
    const defaultValue = fieldOptions[selectedField]?.[0] || "";
    onChange({ ...condition, field: selectedField, value: defaultValue });
  };

  const onOperatorChange = (e) => {
    onChange({ ...condition, operator: e.target.value });
  };

  const onValueChange = (e) => {
    onChange({ ...condition, value: e.target.value });
  };

  return (
    <div className="condition-row" style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
      {/* Field Selection element */}
      <select value={field} onChange={onFieldChange}>
        {Object.keys(fieldOptions).map((fieldName) => (
          <option key={fieldName} value={fieldName}>
            {fieldName}
          </option>
        ))}
      </select>

      {/* operators selection element */}
      <select value={operator} onChange={onOperatorChange}>
        {operators.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>

      {/* Value selection element */}
      <select value={value} onChange={onValueChange}>
        {fieldOptions[field]?.map((optionVal) => (
          <option key={optionVal} value={optionVal}>
            {optionVal}
          </option>
        ))}
      </select>


      <button
        type="button"
        onClick={onDelete}
        style={{
          background: "transparent",
          color: "red",
          border: "1px solid red",
          borderRadius: "4px",
          padding: "0 8px",
          cursor: "pointer",
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default ConditionRow;
