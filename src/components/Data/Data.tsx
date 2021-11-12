
import React from 'react';
import Person from '../Person/Person';
import {
  useQuery,
  gql // This take care of the parsing and formatting that the API need
} from "@apollo/client";
import loadingGif from '../../assets/loadingGif.gif'
import s from './Data.module.css';
import { SimplePerson } from '../../extras/types';
import { useDispatch } from 'react-redux';
import { modifyDataparts } from '../../actions';
import PersonDetails from '../PersonDetails/PersonDetails';

export default function Data({ query, id }: { query: string, id?: string }) {
  const { loading, error, data } = useQuery(gql`
  ${['justFive', ''].includes(query) && !id ?
      `query people {
      allPeople ${query === 'justFive' ? '(first: 5)' : ''} {
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
    }`
      :
      `query personDetails {
      person (id: ${id} ) {
          eyeColor
                hairColor
                skinColor
                birthYear
          vehicleConnection {
            vehicles {
              name
            }
          }
        }
    }`}
  `);

  const dispatch = useDispatch();

  if (loading) return <div className={s.loading}><img src={loadingGif} className={s.loadingGif} alt='loadingGif'></img><span>Loading</span></div>;
  if (error) return <p className={s.error}>Failed to Load Data</p>;
  query === 'justFive' ? dispatch(modifyDataparts(1)) : dispatch(modifyDataparts(2))

  if (['justFive', ''].includes(query) && !id) {
    return data.allPeople.people.map((e: SimplePerson) => (
      <Person person={e} key={e.id} />
    ));
  } else {
    return <PersonDetails person={data.allPeople.person} />
  }
}