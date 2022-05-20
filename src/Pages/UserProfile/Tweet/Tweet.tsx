import { Comment, Avatar, Form, Button, Divider, List, Mentions } from "antd";
import { ListItem } from "Components";
import { FC, useState } from "react";
import "./Tweet.css";
type tweetType = {
  tweetId: string;
  userName: string;
  avatar: string;
  name: string;
  content: string;
  image?: string;
};

type commentState = {
  comments: any;
  submitting: boolean;
  value: string;
};

type editorType = {
  submitting: boolean;
  value: string;
  setComments: any;
};

const MOCK_DATA: any = {
  "@": ["tanaypratap", "akshaymarch7", "bhakti199", "rkap10"],
  "#": ["javascript", "reactjs", "typescript"],
};

const tweetData: tweetType = {
  userName: "jantudeb",
  tweetId: "23edfwtju7",
  avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  name: "Jantu Deb",
  image:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
};

type commentList = {
  comments: any;
};

const CommentList = ({ comments }: commentList) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={(props: any) => <Comment {...props} />}
  />
);

const Editor = ({ submitting, setComments }: editorType) => {
  const [form] = Form.useForm();
  const [prefix, setPrefix] = useState("@");
  const onSearch = (_: any, value: string) => setPrefix(value);

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async () => {
    setComments((state: any) => ({
      ...state,
      submitting: true,
    }));

    try {
      const values = await form.validateFields();

      setTimeout(() => {
        setComments((state: any) => ({
          submitting: false,
          value: "",
          comments: [
            ...state.comments,
            {
              author: "Han Solo",
              avatar: "https://joeschmoe.io/api/v1/random",
              content: <p>{values["comment-input"]}</p>,
            },
          ],
        }));
      }, 1000);
      form.resetFields();
      console.log("Submit:", values["comment-input"]);
    } catch (errInfo) {
      console.log("Error:", errInfo);
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="comment-input">
        <Mentions
          rows={3}
          placeholder="Add a Comment: Type @ to mention people, # to mention tag"
          prefix={["@", "#"]}
          onSearch={onSearch}
        >
          {(MOCK_DATA[prefix] || []).map((value: string) => (
            <Mentions.Option key={value} value={value}>
              {value}
            </Mentions.Option>
          ))}
        </Mentions>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} type="primary">
          Add Comment
        </Button>
        <Button
          style={{ marginLeft: "1rem" }}
          htmlType="reset"
          onClick={onReset}
        >
          Reset Comment
        </Button>
      </Form.Item>
    </Form>
  );
};

export const Tweet: FC = () => {
  const initialState: commentState = {
    comments: [],
    submitting: false,
    value: "",
  };

  const [state, setState] = useState(initialState);

  return (
    <div className="tweet-page">
      <Divider />
      <List
        itemLayout="vertical"
        size="large"
        className="tweet-list"
        style={{ overflow: "auto", flexGrow: 1 }}
        dataSource={[tweetData]}
        renderItem={(item) => <ListItem {...item} />}
      ></List>
      <Divider orientation="left">
        Recent Comments ({state.comments.length})
      </Divider>
      {state.comments.length > 0 && <CommentList comments={state.comments} />}
      <Comment
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <Editor
            submitting={state.submitting}
            value={state.value}
            setComments={setState}
          />
        }
      />
    </div>
  );
};
