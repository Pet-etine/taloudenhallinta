import styles from './Items.module.scss';
import { FloatingButton } from '../../shared/buttons';
import Item from '../Item/Item';
import { Link } from 'react-router-dom';
import React from "react";

const Items = ({ items = [] }) => {
  console.log("🔍 Debug: Items received in Items.jsx:", items);
  if (!items || items.length === 0) {
    return <p>No items available.</p>;
  }

  return (
    <div className="items-container">
      {items.map((item, index) => (
        <div key={index} className="item-card">
          <h3>{item["Full Name"] || "Unnamed Item"}</h3>
          <p><strong>Form Type:</strong> {item["Form Type"]}</p>
          <p><strong>Form ID:</strong> {item["Form ID"]}</p>
          <p><strong>Editor ID:</strong> {item["Editor ID"]}</p>
        </div>
      ))}
    </div>
  );
};

export default Items;