import { VaccinationList } from '../../components/VaccinationList/VaccinationList';
import { WelcomeInfo } from '../../components/WelcomeInfo/WelcomeInfo';


export const HomePage = () => {
  return (
    <>
      <div className="home-page">
        <WelcomeInfo></WelcomeInfo>
        <VaccinationList></VaccinationList>
      </div>
    </>
  );
};