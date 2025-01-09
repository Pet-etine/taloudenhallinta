import Content from '../Content'
import Header from '../Header'
import styles from './App.module.scss'
import Item from '../Item'
import Menu from '../Menu'
import { FloatingButton } from '../../shared/buttons'



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
          <FloatingButton secondary>+</FloatingButton>
        </Content>
        <Menu />
      </div>
    </>
  )


}

export default App
