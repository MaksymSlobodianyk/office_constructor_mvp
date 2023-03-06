import { deskStatus } from './components/config';
import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Topbar from './components/Topbar/Topbar';
import styles from './App.module.css';
import SvgArea from './components/SvgArea/SvgArea';
import { v4 as uuidv4 } from 'uuid';
import JSONInput from "react-json-editor-ajrm/index";
import locale from "react-json-editor-ajrm/locale/en";
let currentIndex = 1;

function App() {
  const [moveToCoords, setMoveToCoords] = useState(null)
  const [selectedDeskId, setSelectedDeskId] = useState(null)
  const [desks, setDesks] = useState([])



  const onAddDesk = () => {
    const newDeskId = uuidv4()
    setDesks([...desks, {
      id: newDeskId,
      name: currentIndex++,
      x: 200,
      y: 200,
      status: deskStatus.BOOKED,
      rotation: 0
    }])
    setSelectedDeskId(newDeskId)
  }

  const onStatusChange = (newStatus) => {
    const updatedDesks = desks.map(d => d.id === selectedDeskId ? { ...d, status: newStatus } : d)
    setDesks(updatedDesks)
  }

  const onRotationChange = (newRotationVal) => {
    const updatedDesks = desks.map(d => d.id === selectedDeskId ? { ...d, rotation: newRotationVal } : d)
    setDesks(updatedDesks)
  }


  const onDrag = (id, x, y) => {
    const updatedDesks = desks.map(d => d.id === id ? { ...d, x, y } : d)
    setDesks(updatedDesks)
  }

  const moveTo = (x, y) => {
    setMoveToCoords("translate(" + [x, y] + ")scale(" + 1 + ")")
  }

  return (
    <div className={styles.appContainer}>
      <Sidebar onAddDesk={onAddDesk} desks={desks} trigger={moveTo} />
      <div className={styles.editContainer}>
        <Topbar onAddDesk={onAddDesk} selectedDesk={desks.find(desk => desk.id === selectedDeskId)} onStatusChange={onStatusChange} onRotationChange={onRotationChange} />
        <SvgArea containerHeight={600} containerWidth={600} desks={desks} setSelectedDeskId={setSelectedDeskId} onDrag={onDrag} moveTo={moveToCoords}></SvgArea>
      </div>
      <div style={{ maxWidth: "700px", maxHeight: "100%" }}>
        <JSONInput
          placeholder={{ desks, selectedDeskId }} // data to display
          theme="light_mitsuketa_tribute"
          locale={locale}
          colors={{
            string: "#DAA520" // overrides theme colors with whatever color value you want
          }}
          height="100%"
        />
      </div>
    </div>
  );
}

export default App;
