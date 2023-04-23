import './styles.css';

export type IComment = {
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
          <div>
            <ul>
              {comments.map((comment) => (
                <li key={comment._id}>{comment.comment}</li>
              ))}
            </ul>
          </div>
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
