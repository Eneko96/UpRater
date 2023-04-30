import './styles.css';
const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
const today = new Date();

export type IComment = {
  _id: string;
  content: string;
  created_at: string;
  profile_from: string;
};

interface ICommentsDialog {
  comments: IComment[];
  onClose: () => void;
}

export const CommentsDialog: React.FC<ICommentsDialog> = ({
  comments,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50">
      <dialog
        open={true}
        className="inset-0 w-30 rounded-md p-x-10 p-y-5 transform transition-all animate-scale-in"
      >
        <button className="absolute right-0 font-bold top-0" onClick={onClose}>
          x
        </button>
        <div className="flex flex-col p-4">
          <div className="flex flex-col mt-4">
            {comments.map((comment) => {
              const timeDiff =
                today.getTime() - new Date(comment.created_at).getTime();
              return (
                <div
                  className="flex flex-row items-start justify-between"
                  key={comment._id}
                >
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center">
                      <div className="flex flex-row items-center">
                        <img
                          className="w-8 h-8 rounded-full"
                          src="https://i.pravatar.cc/100"
                          alt="Avatar"
                        />
                        <div className="flex flex-col ml-2 gap-1">
                          <span className="text-sm font-semibold">
                            {comment.content}
                          </span>
                          <span className="text-xs text-gray-500">
                            {rtf.format(
                              -Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
                              'days',
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </dialog>
    </div>
  );
};
