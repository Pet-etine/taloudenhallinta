import styles from './Menu.module.scss'
import { MdViewList } from 'react-icons/md'

function Menu() {

  return (
    <div className={styles.menu}>
      <div><MdViewList /></div>
      <div>stats</div>
      <div>profile</div>
    </div>
  )

}

export default Menu
