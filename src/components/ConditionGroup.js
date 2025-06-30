import React from "react";
import ConditionRow from "./Condition";

const ConditionGroup = ({ group, onChange, onDelete }) => {
  const handleConditionChange = (index, updatedCondition) => {
    const updatedConditions = [...group.conditions];
    updatedConditions[index] = updatedCondition;
    onChange({ ...group, conditions: updatedConditions });
  };

  const handleConditionDelete = (index) => {
    const filteredConditions = group.conditions.filter((_, i) => i !== index);
    onChange({ ...group, conditions: filteredConditions });
  };

  const handleAddCondition = () => {
    const newCondition = {
      field: "Status",
      operator: "equals",
      value: "Open",
    };
    onChange({ ...group, conditions: [...group.conditions, newCondition] });
  };

  const handleAddGroup = () => {
    const newGroup = {
      logic: "AND",
      conditions: [],
    };
    onChange({ ...group, conditions: [...group.conditions, newGroup] });
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "1rem",
        marginBottom: "1rem",
        position: "relative",
      }}
    >
      {onDelete && (
        <button
          onClick={onDelete}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "4px 8px",
            cursor: "pointer",
          }}
        >
          Delete Group
        </button>
      )}

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "0.5rem" }}>Group Logic:</label>
        <select
          value={group.logic}
          onChange={(e) => onChange({ ...group, logic: e.target.value })}
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
      </div>

      {group.conditions.map((condition, index) =>
        condition.field ? (
          <ConditionRow
            key={index}
            condition={condition}
            onChange={(updated) => handleConditionChange(index, updated)}
            onDelete={() => handleConditionDelete(index)}
          />
        ) : (
          <ConditionGroup
            key={index}
            group={condition}
            onChange={(updatedGroup) => handleConditionChange(index, updatedGroup)}
            onDelete={() => handleConditionDelete(index)}
          />
        )
      )}

      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={handleAddCondition}
          style={{ marginRight: "10px" }}
        >
          + Add Condition
        </button>
        <button onClick={handleAddGroup}>+ Add Group</button>
      </div>
    </div>
  );
};

export default ConditionGroup;
