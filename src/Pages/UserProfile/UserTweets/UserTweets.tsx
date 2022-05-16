import { FC } from "react";
import { List } from "antd";
import { ListItem } from "Components";

type tweetType = {
  userName: string;
  tweetId: string;
  name: string;
  content: string;
  avatar: string;
  image?: string;
};

const tweets: tweetType[] = [
  {
    userName: "tushartiwari7",
    tweetId: "23edfwtju7",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    name: "Tushar Tiwari",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  },
  {
    userName: "manojbajpayee",
    tweetId: "23edfwtju7",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    name: "Manoj Bajpayee",
    image:
      "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  },
  {
    userName: "jantudeb",
    tweetId: "23edfwtju7",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    name: "Jantu Deb",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  },
];

export const UserTweets: FC = () => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      className="tweet-list"
      style={{ overflow: "auto", flexGrow: 1 }}
      dataSource={tweets}
      renderItem={(item) => <ListItem {...item} />}
    ></List>
  );
};
