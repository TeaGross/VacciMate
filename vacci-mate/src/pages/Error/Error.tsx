import { BackToStartLink } from '../../components/BackToStartLink/BackToStartLink';
import './Error.scss';

type ErrorPageProps = {
  title?: string;
  message?: string
}

export const ErrorPage = ({
  title = 'Oj, något gick fel!',
  message = 'Vi kunde inte hitta det du letade efter, men dina vaccinationer är säkra.'
}: ErrorPageProps) => {
  return (
    <>
    <div className='error-page'>
      <h2>{title}</h2>
      <p>{message}</p>
      <BackToStartLink></BackToStartLink>
    </div>
    </>
  );
};