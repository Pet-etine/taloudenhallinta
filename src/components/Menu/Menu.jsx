import styles from './Menu.module.scss'
import { MdViewList, MdSettings, MdTimeline } from 'react-icons/md';

function Menu() {
    return (
        <div className={styles.menu}>
            <div>
                <MdViewList size={24} />
            </div>
            <div>
                <MdTimeline size={24} />
            </div>
            <div>
                <MdSettings size={24} />
            </div>
        </div>
    );
}

export default Menu;
