import { Comment } from "antd";
import { deleteComment } from "app/features";
import { AddCommentBox } from "Components/AddCommentBox/AddCommentBox";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CommentBox = (props: any) => {
  const [replyEditor, setReplyEditor] = useState(false);
  const dispatch = useDispatch();

  const commentReplies = useSelector(
    (state: any) => state.tweets.commentReplies
  ).filter((reply: any) => reply.parentId === props._id);

  const closeEditor = () => setReplyEditor(false);

  return (
    <Comment
      author={props.userName}
      content={props.body}
      avatar={props.photoUrl}
      key={props._id}
      actions={[
        <span key="reply-to" onClick={() => setReplyEditor((open) => !open)}>
          Reply to &nbsp; &nbsp;|
        </span>,
        <span key="delete" onClick={() => dispatch(deleteComment(props._id))}>
          Delete
        </span>,
      ]}
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
