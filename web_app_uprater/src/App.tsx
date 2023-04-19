import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [rates, setRates] = useState<any[]>([]);
  const navigate = useNavigate();
  const rtf2 = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
  const today = new Date();
  const getRates = async () => {
    const res = await fetch('http://localhost:3000/rate', {
      credentials: 'include',
    });
    const status = await res.status;
    console.log(res);
    if (status === 401 || status === 302 || status === 403) navigate('/login');
    const rates = await res.json();
    setRates(
      rates.sort(
        (a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    );
  };

  useEffect(() => {
    getRates();
  }, []);
  return (
    <div className="grid gap-10 place-content-center m-10">
      {rates.map((rate) => {
        const timeDiff = today.getTime() - new Date(rate.created_at).getTime();
        return (
          <div key={rate.id} className="bg-slate-500 p-10 w-max rounded-md">
            <h1>{rate.name}</h1>
            <p>{rate.comment}</p>
            <p>{rate.value}</p>
            <p>Anon: {rate.anon.toString()}</p>
            <small>
              {rtf2.format(
                -Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
                'days',
              )}
            </small>
          </div>
        );
      })}
    </div>
  );
}

export default App;
