import React, { useState } from "react";
import ConditionGroup from "./ConditionGroup";

const QueryBuilder = () => {
  const [query, setQuery] = useState({
    logic: "AND",
    conditions: [],
  });

  const [result, setResult] = useState(null);

  const buildFormattedQuery = (group) => {
    return {
      logic: group.logic,
      conditions: group.conditions.map((item) =>
        item.field
          ? {
            field: item.field,
            operator: item.operator,
            value: item.value,
          }
          : buildFormattedQuery(item)
      ),
    };
  };

  const handleSubmitButton = () => {
    const formatted = buildFormattedQuery(query);
    setResult(formatted);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <ConditionGroup group={query} onChange={setQuery} />

      <button
        onClick={handleSubmitButton}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>

      {result && (
        <div style={{ marginTop: "1.5rem" }}>
          <h3>Generated Query:</h3>
          {/* in my opinion ,as per the output logic field needs to be there in the output but its not appropriate to include logic field in the output  because its already there in group logic */}
          <pre
            style={{
              backgroundColor: "#f5f5f5",
              padding: "1rem",
              borderRadius: "4px",
            }}
          >
            {JSON.stringify([result], null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default QueryBuilder;
