import styles from './Header.module.scss';

function Header() {
  return (
    <div className={styles.header} style={{ padding: '20px', backgroundColor: 'tan', color: 'black', textAlign: 'center', fontSize: '24px', fontWeight: 'bold', borderBottom: '3px solid #007bff' }}>
      TESIV:Oblivion ID Search
    </div>
  );
}

export default Header;