import { FormEventHandler, useState } from 'react';
import { Types, useRootContext } from '../../contexts/RootContext';
import { fetchProxy } from '../../lib/fetch';
import {
  CommentsDialog,
  IComment,
} from '../../modules/CommentsDialog/CommentsDialog';

type ProfileFrom = {
  username: string;
};
interface IRate {
  comment: string;
  value: number;
  anon: boolean;
  created_at: string;
  _id: number;
  profile_from: ProfileFrom;
  comments_count: number;
  user_from: string;
}

const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
const today = new Date();

export const Card: React.FC<IRate> = ({
  comment,
  value,
  created_at,
  profile_from,
  comments_count,
  _id,
}) => {
  const { setNotification } = useRootContext();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const timeDiff = today.getTime() - new Date(created_at).getTime();

  const handleAddComment: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const comment = formData.get('comment');

    const { status, res } = await fetchProxy<IComment>('/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: comment,
        rate_id: _id,
      }),
    });

    if (status === 201) {
      setNotification({
        show: true,
        message: 'Comment created successfully',
        type: Types.SUCCESS,
      });
      setComments([...comments, res]);
    }

    form.reset();
  };

  const handleShowComments = async () => {
    const commentsDB: IComment[] = await getComments();
    setComments(commentsDB);
    setShowComments(!showComments);
  };

  const getComments = async (): Promise<IComment[]> => {
    const res = await fetchProxy<IComment[]>(`/comment?rate=${_id}`);
    return res.res;
  };

  return (
    <>
      <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow">
        <div className="flex justify-end px-2 pt-2">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            id="dropdown"
            className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Export Data
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="relative flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="https://picsum.photos/96"
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {profile_from.username}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Visual Designer
          </span>
          <span className="text-sm text-gray-200 dark:text-gray-200 px-3 text-center mt-2">
            {comment}
          </span>
          <h5 className="mt-5 mb-1 text-lg font-medium text-gray-900 dark:text-white">
            Overall Rating
          </h5>
          <h5 className="text-xl text-gray-900 dark:text-white">{value}!</h5>
          <div className="mt-4 space-x-3 md:mt-6 text-gray-500">
            {comments_count && (
              <button onClick={handleShowComments}>
                View all {comments_count} comments
              </button>
            )}
            <form onSubmit={handleAddComment}>
              <input
                placeholder="Add a comment..."
                className="bg-transparent outline-none"
                name="comment"
              />
            </form>
          </div>
          <small className="absolute bottom-[6px] right-6">
            {rtf.format(-Math.floor(timeDiff / (1000 * 60 * 60 * 24)), 'days')}
          </small>
        </div>
      </div>
      {showComments && (
        <CommentsDialog
          onClose={() => setShowComments(false)}
          comments={comments}
        />
      )}
    </>
  );
};
