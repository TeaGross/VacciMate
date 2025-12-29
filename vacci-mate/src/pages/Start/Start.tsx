import { FeatureList } from '../../components/FeatureList/FeatureList';
import { RegisterBox } from '../../components/RegisterBox/RegisterBox';
import './Start.scss';

export const StartPage = () => {
  return (
    <>
    <div className='start-page'>
      <div className='start-info-wrapper'>
        <h2>Missa aldrig en vaccination igen</h2>
        <p>VacciMate är ett digitalt alternativ till det traditionella gula vaccinationskortet.
          Samla alla dina vaccinationer på ett ställe och få hjälp att hålla koll på doser och påminnelser.</p>
      </div>
      
      <FeatureList></FeatureList>
      <RegisterBox></RegisterBox>
    </div>
    </>
  );
};