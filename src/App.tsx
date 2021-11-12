import React, { useState } from 'react';
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
  return (
    <div>
      <div className={s.navbar}>
        <span>Ravn Star Wars Registry</span>
      </div>
      <div className={s.content}>
        <div className={s.right}>
          <PeopleQuery />
        </div>
        <div className={s.left}>
          <PersonDetails />
        </div>
      </div>
    </div>
  );
}
