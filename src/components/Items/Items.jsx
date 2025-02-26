import styles from './Items.module.scss';
import { FloatingButton } from '../../shared/buttons';
import Item from '../Item/Item';
import { Link } from 'react-router-dom';

function Items({ items = [] }) { // Ensure items is always an array
  if (!Array.isArray(items)) {
    console.error("❌ Error: items is not an array!", items);
    return <div>Error loading items.</div>;
  }

  return (
    <div className={styles.items}>
      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
        items.map((item, index) => <Item key={index} data={item} />)
      )}
      <Link to="/add">
        <FloatingButton secondary>+</FloatingButton>
      </Link>
    </div>
  );
}

export default Items;
