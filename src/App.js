import { deskStatus } from './components/config';
import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Topbar from './components/Topbar/Topbar';
import styles from './App.module.css';
import SvgArea from './components/SvgArea/SvgArea';
import { v4 as uuidv4 } from 'uuid';

let currentIndex = 1;

function App() {
  const [desks, setDesks] = useState([])

  const [selectedDesk, setSelectedDesk] = useState(null)

  const onAddDesk = () => {
    setDesks([...desks, {
      id: uuidv4(),
      name: currentIndex++,
      x: 200,
      y: 100,
      status: deskStatus.PERMANENTLY_BOOKED
    }])
  }

  const onStatusChange = (newStatus) => {
    const updatedDesks = desks.map(d => d.id === selectedDesk ? { ...d, status: newStatus } : d)
    setDesks(updatedDesks)
  }


  const onDrag = (x, y) => {
    const updatedDesks = desks.map(d => d.id === selectedDesk ? { ...d, x, y } : d)
    setDesks(updatedDesks)
  }

  return (
    <div className={styles.appContainer}>
      <Sidebar onAddDesk={onAddDesk} desks={desks} />
      <div className={styles.editContainer}>
        <Topbar onAddDesk={onAddDesk} selectedDesk={desks.find(desk => desk.id === selectedDesk)} onStatusChange={onStatusChange} />
        <SvgArea containerHeight={500} containerWidth={500} desks={desks} setSelectedDesk={setSelectedDesk} onDrag={onDrag}></SvgArea>
      </div>
    </div>
  );
}

export default App;
