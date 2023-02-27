import styles from './Topbar.module.css';
import { deskStatus } from '../config';
const Topbar = ({ onRotationChange, onStatusChange, selectedDesk }) => {
  return (
    <div className={styles.container}>
      <select onChange={(e) => {onStatusChange(e.target.value) }} defaultValue={'none'} value={selectedDesk?.status} disabled={!selectedDesk}>
        <option value={deskStatus.VACANT}>Vacant</option>
        <option value={deskStatus.BOOKED}>Booked</option>
        <option value={deskStatus.PERMANENTLY_BOOKED}>Permanently booked</option>
      </select>
    </div>
  );
}

export default Topbar;
