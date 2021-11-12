
import React from 'react';
import {
    useQuery,
    gql
} from "@apollo/client";
import loadingGif from '../../assets/loadingGif.gif'
import s from './PersonDetails.module.css';
import { useSelector } from 'react-redux';

export default function PersonDetails() {

    const currentPerson = useSelector((state: { currentPerson: string }) => state.currentPerson)

    const { loading, error, data } = useQuery(gql`
        query personDetails {
            person (id: "${currentPerson}" ) {
                id
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
        }
    `);

    if (!currentPerson) return <div></div>

    if (loading) return <div className={s.loading}><img src={loadingGif} className={s.loadingGif} alt='loadingGif'></img><span>Loading</span></div>;
    if (error) return <p className={s.error}>Failed to load details</p>;

    return (
        <div className={s.container}>
            <p className={s.section}>Description</p>
            {
                [['Eye Color', 'eyeColor'], ['Hair Color', 'hairColor'], ['Skin Color', 'skinColor'], ['Birth Year', 'birthYear']].map((e, index) =>
                    <div className={s.item} key={index}>
                        <p className={s.infoTitle}>{e[0]}</p>
                        <p className={s.infoDetail}>{data.person[e[1]]}</p>
                    </div>
                )
            }
            {
                data.person.vehicleConnection.vehicles.length ?
                    <>
                        <p className={s.section}>Vehicles</p>
                        {
                            data.person.vehicleConnection.vehicles.map((e: { name: string }, index: number) =>
                                <div className={s.item} key={index}>
                                    <p className={s.infoTitle}>{e.name}</p>
                                </div>
                            )
                        }
                    </>
                    :
                    null
            }
        </div>
    )
}