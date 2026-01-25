import './VaccinationList.scss';
import { useContext } from 'react';
import { VaccinationContext } from '../../context/VaccinationContext';
import { NavLink } from 'react-router';
import { TertiaryButton } from '../Button/Button';

export const VaccinationList = () => {
    const { vaccinations } = useContext(VaccinationContext);

    const sortedVaccinations = [...vaccinations].sort((a, b) => {
        const aLatest = a.doses.at(-1);
        const bLatest = b.doses.at(-1);

        if (!aLatest || !bLatest) {
            return 0; 
        } 

        return new Date(bLatest.date).getTime() - new Date(aLatest.date).getTime();
    });

    return (
        <div className='vaccination-list-page'>
            {sortedVaccinations.map((v) => {
                const latestDose = v.doses.reduce((latest, d) => {
                    if (!latest) {return d;}
                    return new Date(d.date).getTime() > new Date(latest.date).getTime() ? d : latest;
                }, undefined as (typeof v.doses)[0] | undefined);

                return (
                    <NavLink to={`/home/${v.id}`} className='vaccination-card' key={v.id}>
                        <div className='card-info'>
                            <h3>{v.vaccineName}</h3>
                            <p>{v.doses.length} av {v.totalDoses} doser</p>
                            {latestDose ? (
                                <div className='latest-dose'>
                                    <p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#311811"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>{latestDose.date}</p>
                                    <p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#311811"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg> {latestDose.location}</p>
                                </div>
                            ) : (
                                <p>Inga doser</p>
                            )}
                        </div>

                        <div className='card-actions'>
                                <TertiaryButton className='detail-link'>Visa detaljer <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#311811"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg></TertiaryButton>
                        </div>
                    </NavLink>
                );
            })}
        </div>
    );
};