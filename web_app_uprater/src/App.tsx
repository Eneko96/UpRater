import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './components/Card/Card';
import { HOST } from './constants';
import { IRate, useRates } from './store/rates';

function App() {
  const rates = useRates((state) => state.rates);
  const setRates = useRates((state) => state.setRates);
  const navigate = useNavigate();
  const getRates = async () => {
    const res = await fetch(HOST + '/rate', {
      credentials: 'include',
    });
    const status = await res.status;
    if (status === 401 || status === 302 || status === 403) navigate('/login');
    const rates = await res.json();
    setRates(
      rates.sort(
        (a: IRate, b: IRate) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    );
  };

  useEffect(() => {
    getRates();
  }, []);
  return (
    <div className="grid gap-10 justify-items-center m-10">
      {rates.map((rate) => {
        return <Card key={rate._id} {...rate} />;
      })}
    </div>
  );
}

export default App;
