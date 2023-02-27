import styles from './Sidebar.module.css';

const SideBar = ({ onAddDesk, desks }) => {

  return (
    <div className={styles.sidebar}>
      <p>
        Office constructor POC
      </p>
      <div className={styles.spacer}></div>
      <button onClick={onAddDesk}>Add desk</button>
      <div className={styles.spacer}></div>
      {desks.map(desk => (
        <div className={styles.deskListItem} key={desk.id}>
          <p>Name: {desk.name}</p>
          <p>Coords: {'[ '}x:{desk.x}, y:{desk.y}{' ]'}</p>
          <p>Rotation: </p>
          <p>Status: {desk.status}</p>
        </div>))}
    </div>
  );
}

export default SideBar;
