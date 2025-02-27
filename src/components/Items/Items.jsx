import React, { useState } from "react";
import styles from "./Items.module.scss";
import { FloatingButton } from "../../shared/buttons";
import Item from "../Item/Item";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Items = ({ items = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [visibleItems, setVisibleItems] = useState(10); // Show only 10 items initially

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    ["Full Name", "Form Type", "Editor ID"].some((key) =>
      item[key]?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Load more items when button is clicked
  const loadMore = () => {
    setVisibleItems((prev) => prev + 10);
  };

  return (
    <div className="items-container">
      <FloatingButton
        onClick={() => setShowSearch(!showSearch)}
        className={showSearch ? styles.activeButton : styles.defaultButton}
      >
        <FaSearch />
      </FloatingButton>
      
      {showSearch && (
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchBar}
            style={{ width: '95%', height: '40px', fontSize: '18px', padding: '10px' }}
          />
        </div>
      )}

      {filteredItems.length === 0 ? (
        <p>No items match your search.</p>
      ) : (
        <>
          {filteredItems.slice(0, visibleItems).map((item, index) => (
            <div key={index} className="item-card">
              <h3>{item["Full Name"] || "Unnamed Item"}</h3>
              <p><strong>Form Type:</strong> {item["Form Type"]}</p>
              <p><strong>Form ID:</strong> {item["Form ID"]}</p>
              <p><strong>Editor ID:</strong> {item["Editor ID"]}</p>
            </div>
          ))}
          {visibleItems < filteredItems.length && (
            <button onClick={loadMore} className={styles.loadMoreButton}>
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Items;
