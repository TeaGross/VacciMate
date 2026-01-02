import './VaccinationList.scss';
import { useContext } from 'react';
import { VaccinationContext } from '../../context/VaccinationContext';
import { NavLink } from 'react-router';

export const VaccinationList = () => {
    const { vaccinations } = useContext(VaccinationContext);

    return (
        <div className='vaccination-list-page'>
            {vaccinations.map((v) => {
                const latestDose = v.doses.reduce((latest, d) => {
                    if (!latest) {return d;}
                    return new Date(d.date).getTime() > new Date(latest.date).getTime() ? d : latest;
                }, undefined as (typeof v.doses)[0] | undefined);

                return (
                    <div className='vaccination-card' key={v.id}>
                        <div className='card-info'>
                            <h2>{v.vaccineName}</h2>
                            <p>{v.doses.length} doser</p>
                            {latestDose ? (
                                <div className='latest-dose'>
                                    <p>Senaste dosen: {latestDose.date}</p>
                                    <p>Plats: {latestDose.location}</p>
                                </div>
                            ) : (
                                <p>Inga doser</p>
                            )}
                        </div>

                        <div className='card-actions'>
                                <NavLink to={`/home/${v.id}`} className='detail-link'>Se vaccination</NavLink>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};