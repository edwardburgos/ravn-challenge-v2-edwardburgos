import React from 'react';
import Data from './components/Data/Data';
import s from './App.module.css';
import { useSelector } from 'react-redux';

export default function App() {
  
  const dataparts = useSelector((state: { dataparts: 0 | 1 | 2 }) => state.dataparts)

  return (
    <div>
      <div className={s.navbar}>
        <span>Ravn Star Wars Registry</span>
      </div>
      <div className={s.content}>
        <div className={s.right}>
          {
            dataparts === 0 || dataparts === 1 ?
              <Data query={'justFive'}></Data>
              :
              null
          }
          {
            dataparts === 1 || dataparts === 2 ?
              <Data query={''}></Data>
              :
              null
          }
        </div>
        <div className={s.left}></div>
      </div>
    </div>
  );
}
