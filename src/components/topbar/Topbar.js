import styles from './Topbar.module.css';
import { deskStatus, deskRotation } from '../config';
const Topbar = ({ onRotationChange, onStatusChange, selectedDesk }) => {
  return (
    <div className={styles.container}>
      <select onChange={(e) => { onStatusChange(e.target.value) }} defaultValue={'none'} value={selectedDesk?.status} disabled={!selectedDesk}>
        <option value={deskStatus.VACANT}>Vacant</option>
        <option value={deskStatus.BOOKED}>Booked</option>
        <option value={deskStatus.PERMANENTLY_BOOKED}>Permanently booked</option>
      </select>
      <div className={styles.spacer}></div>
      <select onChange={(e) => {onRotationChange(e.target.value) }} defaultValue={'none'} value={selectedDesk?.rotation} disabled={!selectedDesk}>
        <option value={deskRotation.D0}>0°</option>
        <option value={deskRotation.D90}>90°</option>
        <option value={deskRotation.D180}>180°</option>
        <option value={deskRotation.D270}>270°</option>
      </select>
    </div>
  );
}

export default Topbar;
