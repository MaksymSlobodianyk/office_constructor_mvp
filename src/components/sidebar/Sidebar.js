import styles from './Sidebar.module.css';

const SideBar = ({ onAddDesk, desks, trigger }) => {

  return (
    <div className={styles.sidebar}>
      <button onClick={onAddDesk}>Add desk</button>
      <div className={styles.spacer}></div>
      <div className={styles.list}>
        {desks.map(desk => (
          <div className={styles.deskListItem} key={desk.id}>
            <p>Name: {desk.name}</p>
            <p>Status: {desk.status}</p>
            {/* <div className={styles.spacer}></div>
            <button onClick={() => trigger(-desk.x - 200, -desk.y - 200)}>Move to</button> */}
          </div>))}
      </div>
    </div>
  );
}

export default SideBar;
