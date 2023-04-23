import './styles.css';

type IComment = {
  _id: string;
  comment: string;
  created_at: string;
  profile_from: string[];
};

interface ICommentsDialog {
  comments: IComment[];
}

export const CommentsDialog: React.FC<ICommentsDialog> = ({ comments }) => {
  return (
    <dialog
      open
      className="fixed inset-0 rounded-md p-x-10 p-y-5 transform transition-all animate-scale-in"
    >
      <div className="flex flex-col p-4">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-semibold">Comments</h2>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            type="button"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 6a1 1 0 112 0v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V6z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-col mt-4">
          {comments.map((comment) => (
            <div
              className="flex flex-row items-start justify-between"
              key={comment._id}
            >
              <div className="flex flex-col">
                <div className="flex flex-row items-center">
                  <div className="flex flex-row items-center">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={comment.profile_from[0]}
                      alt="Avatar"
                    />
                    <div className="flex flex-col ml-2">
                      <span className="text-sm font-semibold">
                        {comment.profile_from[1]}
                      </span>
                      <span className="text-xs text-gray-500">
                        {comment.created_at}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </dialog>
  );
};
