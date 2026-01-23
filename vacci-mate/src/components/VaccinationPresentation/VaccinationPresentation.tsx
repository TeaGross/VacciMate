import './VaccinationPresentation.scss';
import { useContext, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { VaccinationContext } from '../../context/VaccinationContext';
import { DeleteButton, PrimaryButton, SecondaryButton } from '../Button/Button';
import { Breadcrumb, type BreadcrumbItem } from '../Breadcrumb/Breadcrumb';
import { Modal } from '../Modal/Modal';
import { EditMainVaccinationForm } from '../EditMainVaccinationForm/EditMainVaccinationForm';

export const VaccinationPresentation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {vaccinations, deleteVaccinationDose} = useContext(VaccinationContext);
    const vaccination = vaccinations.find(v=>v.id === id);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // TODO felhantering, om vaccinationen inte kan hittas, göra mer?
    if (!vaccination) {
        return <p>Vaccinationen kan inte hittas</p>;
    } 

    const items: BreadcrumbItem[] = [
    { label: 'Hem', path: '/home' },
    { label: vaccination?.vaccineName },
    ]; 


    return (
        <>
        <Breadcrumb items={items}></Breadcrumb>
        <div className='vaccination-presentation-page'>
            <div className='vaccination-presentation'>
                <div className='main-vaccination-container'>
                    <div className='name-doses-container'>
                        <h2>{vaccination?.vaccineName}</h2>
                        <p>{vaccination.doses.length} av {vaccination.totalDoses} doser</p>
                    </div>
                    <div className="choices-container">
                        <SecondaryButton onClick={() => setIsEditModalOpen(true)} className='edit-main-vaccination-btn'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>Redigera vaccination
                        </SecondaryButton>
                        
                        <Link to={`/home/${vaccination.id}/add-dose`} className='link add-dose-link'>
                            <PrimaryButton><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>Lägg till ny dos</PrimaryButton>
                        </Link>
                    </div>
                </div>
                { vaccination.doses.map((d) => (
                    <div className='dose-presentation-container' key={d.id}>
                        <div className='main-dose'>
                            <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m240-160 40-160H120l20-80h160l40-160H180l20-80h160l40-160h80l-40 160h160l40-160h80l-40 160h160l-20 80H660l-40 160h160l-20 80H600l-40 160h-80l40-160H360l-40 160h-80Zm140-240h160l40-160H420l-40 160Z"/></svg>{d.doseNumber}</span>
                            <span> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>{d.date}</span>
                            <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>{d.location}</span>

                            <span>
                                {d.reminderDate ? (
                                    <>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/></svg>
                                    {d.reminderDate}
                                    </>
                                ) : (
                                    <>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-200v-80h80v-280q0-33 8.5-65t25.5-61l60 60q-7 16-10.5 32.5T320-560v280h248L56-792l56-56 736 736-56 56-146-144H160Zm560-154-80-80v-126q0-66-47-113t-113-47q-26 0-50 8t-44 24l-58-58q20-16 43-28t49-18v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v206Zm-276-50Zm36 324q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Zm33-481Z"/></svg>
                                    Ingen påminnelse
                                    </>
                                )}
                            </span>
                            


                            <div className="dose-actions">
                                <Link to={`/home/edit/${d.id}`} className='link'>
                                    <SecondaryButton className='dose-btns'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>Redigera dos</SecondaryButton>
                                </Link>
                                <DeleteButton onClick={() => {
                                    if (confirm('Är du säker på att du vill radera dosen?')) {
                                        deleteVaccinationDose(d.id);
                                        if (vaccination.doses.length === 1) {
                                            navigate('/home');
                                        }
                                    }
                                    }} 
                                    className='dose-btns'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></DeleteButton>
                            </div>
                        </div>

                        {d.comment && (
                            <details className="dose-comment">
                                <summary>Visa kommentar</summary>
                                <p>{d.comment}</p>
                            </details>
                        )}
                    </div>
                ))}
            </div>

        </div>
        <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title="Redigera vaccination"
            >
            <EditMainVaccinationForm
                vaccination={vaccination}
                onSuccess={() => setIsEditModalOpen(false)}
            />
        </Modal>
        </>
    );
};