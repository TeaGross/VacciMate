import { useContext } from 'react';
import { VaccinationList } from '../../components/VaccinationList/VaccinationList';
import { WelcomeInfo } from '../../components/WelcomeInfo/WelcomeInfo';
import { VaccinationContext } from '../../context/VaccinationContext';
import { NoVaccinations } from '../../components/NoVaccinations/NoVaccinations';


export const HomePage = () => {
      const { vaccinations } = useContext(VaccinationContext);
  

  return (
    <>
      <div className="home-page">
        <WelcomeInfo></WelcomeInfo>

        {vaccinations.length > 0 && (
          <VaccinationList />
        )}

        {vaccinations.length === 0 && <NoVaccinations />}


      </div>
    </>
  );
};