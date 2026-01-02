import { VaccinationList } from '../../components/VaccinationList/VaccinationList';


export const HomePage = () => {
  return (
    <>
      <div className="home-page">
        Home
        <VaccinationList></VaccinationList>
      </div>
    </>
  );
};