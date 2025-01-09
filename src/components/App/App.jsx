import Settings from '../Settings'
import { ButtonContainer } from '../../shared/buttons'
import Content from '../Content'
import Header from '../Header'
import styles from './App.module.scss'
import Items from '../Items'
import Menu from '../Menu'
import { FloatingButton } from '../../shared/buttons'
import Stats from '../Stats'




function App() {

  return (
    <>
      <ButtonContainer>
        <div className={styles.app}>
          <Header />
          <Content>
          <Settings />
          </Content>
          <Menu />
        </div>
      </ButtonContainer>
    </>
  )



}

export default App
