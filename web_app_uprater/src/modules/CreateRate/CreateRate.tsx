import { useRef, useState } from 'react';
import { useRootContext } from '../../contexts/RootContext';
import { fetchProxy } from '../../lib/fetch';
import { useAuth } from '../../store/auth';
import { Modal } from '../Modal/Modal';
import { Types } from '../../contexts/RootContext';
interface IUser {
  _id: string;
  username: string;
  city: string;
  age: number;
  c_rates: number;
}

enum Topics {
  POLITICS = 'politics',
  RELIGION = 'religion',
  SPORTS = 'sports',
  MOVIES = 'movies',
  MUSIC = 'music',
  TRAVEL = 'travel',
  STREET = 'street',
  LEISURE = 'leisure',
  WORK = 'work',
  SCHOOL = 'school',
  FAMILY = 'family',
  FRIENDS = 'friends',
  LOVE = 'love',
  HEALTH = 'health',
}

const debounce = (func: any, wait: number) => { // eslint-disable-line
  let timeout: any; // eslint-disable-line
  return function (...args: any) { // eslint-disable-line
    const later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const getUsers = async (username: string) => {
  const users = await fetchProxy<IUser | IUser[]>(`/profile/${username}`, {
    method: 'GET',
    credentials: 'include',
  });
  return users;
};

export const CreateRate = () => {
  const csrf = useAuth((state) => state.csrf);
  const { setRateModal, rateModal, setNotification, notification } =
    useRootContext();
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

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

    const { status } = await fetchProxy('/rate', {
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
        user_to: selectedUser?._id,
      }),
    });
    if (status === 201) {
      setRateModal(false);
      setNotification({
        show: true,
        message: 'Rate created successfully',
        type: Types.SUCCESS,
      });
    }

    if (status === 400) {
      setNotification({
        ...notification,
        show: true,
        message: 'Something went wrong',
        type: Types.DANGER,
      });
    }
    // setTriggers({ ...triggers, createRate: false, notification: true });
    // setRates([...rates, rate].sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
  };

  const handleSearch = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { res: users } = await getUsers(e.target.value);
      setShowDropdown(true);
      if (Array.isArray(users)) setUsers(users);
      else setUsers([users]);
    },
    400,
  );

  const handleSelectUser = (usr: IUser) => (e: any) => {
    console.log(usr, e);
    if (ref.current) ref.current.value = usr.username;
    setSelectedUser(usr);
    setShowDropdown(false);
  };

  return (
    <Modal open={rateModal} onClose={() => setRateModal(false)}>
      <h3 className="font-bold text-xl text-end">Create a Rate</h3>
      <form
        onSubmit={handleCreation}
        className="grid gap-6 bg-zinc-900 p-10 rounded-md"
      >
        <div className="relative">
          <input
            ref={ref}
            type="search"
            placeholder="Search for a user"
            className="bg-transparent border-red-50 border p-2 rounded-md w-80"
            onChange={handleSearch}
          />
          <div
            id="dropdown"
            className={`z-10 ${
              showDropdown ? '' : 'hidden'
            } bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 absolute translate-y-2 transition-transform w-full`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li
                key={'default-user'}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                  Select a user
                </div>
              </li>
              {users.map((user) => (
                <li
                  key={user._id}
                  onClick={handleSelectUser(user)}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
                    onClick={handleSelectUser(user)}
                  >
                    {user.username}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <select
          className="bg-transparent border-red-50 border p-2 rounded-md w-80"
          name="topics"
          placeholder="Topics"
        >
          {Object.keys(Topics).map((topic) => (
            <option
              key={topic}
              value={topic}
              className="first-letter:uppercase"
            >
              {topic.toLowerCase()}
            </option>
          ))}
        </select>
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
            onClick={() => setRateModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};
