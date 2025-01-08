import Content from '../Content'
import Header from '../Header'
import styles from './App.module.scss'
import Item from '../Item'
import Menu from '../Menu'
import Button from '../../shared/buttons'


function App() {

  return (
    <>
      <div className={styles.app}>
        <Header />
        <Content>
          <Item />
          <Item />
          <Item />
          <Item />
          <Button primary>LISÄÄ UUSI RIVI</Button>
        </Content>
        <Menu />
      </div>
    </>
  )


}

export default App
