import { Comment } from "antd";
import { deleteComment } from "app/features";
import { useAppDispatch, useAppSelector } from "app/store";
import { AddCommentBox } from "Components";
import { useState } from "react";

const CommentBox = (props: any) => {
  const [replyEditor, setReplyEditor] = useState(false);
  const dispatch = useAppDispatch();
  const authUserId = useAppSelector((state) => state.auth.user?._id);
  const commentReplies = useAppSelector(
    (state) => state.tweets.commentReplies
  ).filter((reply) => reply.parentId === props._id);

  const closeEditor = () => setReplyEditor(false);
  const actions = [
    <span key="reply-to" onClick={() => setReplyEditor((open) => !open)}>
      Reply to
    </span>,
  ];
  return (
    <Comment
      author={props.userName}
      content={props.body}
      avatar={props.photoUrl}
      key={props._id}
      actions={
        authUserId === props.user
          ? [
              ...actions,
              <span
                key="delete"
                onClick={() => dispatch(deleteComment(props._id))}
              >
                | &nbsp; &nbsp; Delete
              </span>,
            ]
          : actions
      }
    >
      {replyEditor && (
        <AddCommentBox parentId={props._id} close={closeEditor} />
      )}
      {commentReplies.length > 0 &&
        commentReplies.map((reply: any) => (
          <CommentBox key={reply._id} {...reply} />
        ))}
    </Comment>
  );
};

export { CommentBox as Comment };
