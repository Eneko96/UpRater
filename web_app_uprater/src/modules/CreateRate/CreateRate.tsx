import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { useTriggers } from '../../store/triggers';
import { Modal } from '../Modal/Modal';

export const CreateRate = () => {
  const navigate = useNavigate();
  const csrf = useAuth((state) => state.csrf);
  const setTriggers = useTriggers((state) => state.setTriggers);
  const triggers = useTriggers((state) => state.triggers);

  const handleCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      topics: { value: string };
      comment: { value: string };
      value: { value: string };
      anon: { checked: boolean };
    };
    const topics = [target.topics.value];
    const comment = target.comment.value;
    const value = target.value.value;
    const anon = target.anon.checked;

    console.log({ csrf });
    const res = await fetch('http://localhost:3000/rate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrf as string,
      },
      credentials: 'include',
      body: JSON.stringify({
        topics,
        comment,
        value,
        anon,
        created_at: new Date(),
      }),
    });
    const status = await res.status;
    if (status === 401 || status === 302 || status === 403) navigate('/login');
    else {
      const rate = await res.json();
      setTriggers({ ...triggers, createRate: false, notification: true });
    }
    // setRates([...rates, rate].sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
  };

  return (
    <Modal
      open={triggers.createRate}
      onClose={() => setTriggers({ ...triggers, createRate: false })}
    >
      <h3 className="font-bold text-xl text-end">Create a Rate</h3>
      <form
        onSubmit={handleCreation}
        className="grid gap-6 bg-zinc-900 p-10 rounded-md"
      >
        <input
          className="bg-transparent border-red-50 border p-2 rounded-md w-80"
          type="text"
          name="topics"
          placeholder="Topics"
        />
        <input
          className="bg-transparent border-red-50 border p-2 rounded-md w-80"
          type="text"
          name="comment"
          placeholder="Comment"
        />
        <input
          className="bg-transparent border-red-50 border p-2 rounded-md w-80"
          type="number"
          name="value"
          placeholder="Value"
        />
        <div className="flex items-center">
          <input
            name="anon"
            id="checked-checkbox"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="checked-checkbox"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 select-none"
          >
            Anonimous
          </label>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="flex-1">
            Create
          </button>
          <button
            type="button"
            className="flex-1"
            onClick={() => setTriggers({ ...triggers, createRate: false })}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};
