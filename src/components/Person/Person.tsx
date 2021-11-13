import React from 'react';
import { SimplePerson } from '../../extras/types';
import s from './Person.module.css';
import next from '../../assets/next.svg'
import { useDispatch } from 'react-redux';
import { modifyCurrentPerson } from '../../actions';
import { useSelector } from 'react-redux';

export default function Person({ person } : { person: SimplePerson}) {

    const currentPerson = useSelector((state: { currentPerson: string }) => state.currentPerson)

    const { id, name, species, homeworld } = person;

    const dispatch = useDispatch();
    return (
        <div className={`${s.simplePerson} ${currentPerson === id ? s.selected : ''}`} onClick={() => dispatch(modifyCurrentPerson(id))}>
            <div className={s.content}>
                <p className={s.name}>
                    {name}
                </p>
                {
                    species ?
                        <p className={s.description}>
                            {species.name} from {homeworld.name}
                        </p>
                        :
                        <p className={s.description}>
                            Human from {homeworld.name}
                        </p>
                }
            </div>
            <img className={s.next} src={next} alt='nextIcon'></img>
        </div>
    );
}