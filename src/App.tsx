import React, { useState, useRef } from 'react';
import s from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  useQuery,
  gql // This take care of the parsing and formatting that the API need
} from "@apollo/client";
import loadingGif from './assets/loadingGif.gif'
import { SimplePerson } from './extras/types';
import Person from './components/Person/Person';
import { modifyDataparts } from './actions';
import PersonDetails from './components/PersonDetails/PersonDetails';
import menu from './assets/menu.svg'
import close from './assets/close.svg'

function PeopleQuery() {

  const dataparts = useSelector((state: { dataparts: 'five' | 'all' }) => state.dataparts);
  const [firstFive, setFirstFive] = useState(null)
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(gql`
    query people {
      allPeople ${dataparts === 'five' ? '(first: 5)' : ''} {
        people {
          id
          name
          species {
            name
          }
          homeworld {
            name
          }
        }
      }
    }`);

  useEffect(() => {
    if (dataparts === 'five' && data) {
      dispatch(modifyDataparts('all'))
      setFirstFive(data.allPeople.people.map((e: SimplePerson) => (
        <Person person={e} key={e.id} />
      )))
    }
  }, [dataparts, data])

  if (loading) {
    if (!firstFive) {
      return <div className={s.loading}><img src={loadingGif} className={s.loadingGif} alt='loadingGif'></img><span>Loading</span></div>;
    } else {
      return <>
        {firstFive}
        <div className={s.loading}><img src={loadingGif} className={s.loadingGif} alt='loadingGif'></img><span>Loading</span></div>
      </>
    }
  }
  if (error) return <p className={s.error}>Failed to Load Data</p>;

  return (
    <>
      {
        data.allPeople.people.map((e: SimplePerson) => (
          <Person person={e} key={e.id} />
        ))
      }
    </>
  )
}

export default function App() {

  const currentPerson = useSelector((state: { currentPerson: string }) => state.currentPerson)

  const [sideBarShow, setSideBarShow] = useState(false)

  // When screen is bigger than 767px, do not show sidebar
  window.addEventListener('resize', function (e) {
    if (window.screen.width > 767) {
      if (sideBarShow) setSideBarShow(false)
    }
  }, true);

  useEffect(() => {
    if (currentPerson) setSideBarShow(false);
  }, [currentPerson])

  const ref = useRef<HTMLInputElement>(null);

  // This hook allows us to close the navbar when clicked outside of it while this one is expanded 
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If the ref exists and the click target (detected by the listener) if not inside of it, close the navbar
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        setSideBarShow(false)
      }
    }
    // If the navbar is open set a click detector that will execute the function handleClickOutside, if not remove that detector
    if (sideBarShow) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [ref, sideBarShow]);

  return (
    <div>
      <div className={s.navbar}>
        <img src={menu} alt='Menu icon' className={s.menuIcon} onClick={() => setSideBarShow(true)} />
        <span>Ravn Star Wars Registry</span>
      </div>
      <div className={s.content}>
        <div className={`${s.right} ${sideBarShow ? s.visible : s.hidden}`} ref={ref}>
          <div className={s.topPart}>
            <img src={close} alt='Close icon' className={s.closeIcon} onClick={() => setSideBarShow(false)} />
          </div>
          <PeopleQuery />
        </div>
        <div className={s.left}>
          <PersonDetails />
        </div>
      </div>
    </div>
  );
}
