import React from 'react';
import styles from './Item.module.scss';

const Item = ({ data }) => {
  // Check if data is an array
  const isArray = Array.isArray(data);

  return (
    <div className={styles.itemList}>
      {isArray ? (
        data.map((item, index) => (
          <div key={index} className={styles.item}>
            <p><strong>Form Type:</strong> {item["Form Type"] || "Unknown"}</p>
            <p><strong>Form ID:</strong> {item["Form ID"] || "No ID"}</p>
            <p><strong>Full Name:</strong> {item["Full Name"] || "No Name"}</p>
            <p><strong>Editor ID:</strong> {item["Editor ID"] || "No Editor"}</p>
          </div>
        ))
      ) : (
        <div className={styles.item}>
          <p><strong>Form Type:</strong> {data["Form Type"] || "Unknown"}</p>
          <p><strong>Form ID:</strong> {data["Form ID"] || "No ID"}</p>
          <p><strong>Full Name:</strong> {data["Full Name"] || "No Name"}</p>
          <p><strong>Editor ID:</strong> {data["Editor ID"] || "No Editor"}</p>
        </div>
      )}
    </div>
  );
};

export default Item;