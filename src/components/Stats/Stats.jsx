import React from 'react';
import styles from './Stats.module.scss';

function Stats({ data = [] }) {
  console.log("📊 Received data:", data); // Debugging log

  // Ensure data is an array
  const itemsArray = Array.isArray(data) ? data : [];

  console.log("✅ Using dataset with", itemsArray.length, "items"); // Debugging log

  const totalItems = itemsArray.length;
  const typeCounts = itemsArray.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});

  const formTypeCounts = itemsArray.reduce((acc, item) => {
    acc[item["Form Type"]] = (acc[item["Form Type"]] || 0) + 1;
    return acc;
  }, {});

  const uniqueEditors = new Set(itemsArray.map(item => item["Editor ID"])).size;

  return (
    <div className={styles.stats}>
      <h2>Statistics</h2>
      <h3>General Information</h3>
      <p><strong>Total Items:</strong> {totalItems}</p>
      <p><strong>Unique Editors:</strong> {uniqueEditors}</p>
      
      <h4>Item Distribution by Type</h4>
      <ul>
        {Object.entries(typeCounts).map(([type, count]) => (
          <li key={type}><strong>{type}:</strong> {count} items</li>
        ))}
      </ul>
      
      <h4>Item Distribution by Form Type</h4>
      <ul>
        {Object.entries(formTypeCounts).map(([formType, count]) => (
          <li key={formType}><strong>{formType}:</strong> {count} items</li>
        ))}
      </ul>
    </div>
  );
}

export default Stats;
