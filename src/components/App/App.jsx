import { ButtonContainer } from '../../shared/buttons'
import Content from '../Content'
import Header from '../Header'
import styles from './App.module.scss'
import Items from '../Items'
import Menu from '../Menu'
import { FloatingButton } from '../../shared/buttons'



function App() {

  return (
    <>
      <ButtonContainer>
        <div className={styles.app}>
          <Header />
          <Content>
          <Items />
          </Content>
          <Menu />
        </div>
      </ButtonContainer>
    </>
  )



}

export default App
