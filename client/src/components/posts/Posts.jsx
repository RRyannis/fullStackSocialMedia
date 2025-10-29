import Post from "../post/Post";
import './posts.scss';
import mockingbird from "../../assets/bookFrame2.jpg";
import iceShard from "../../assets/bookFrame1.jpg";
;

const Posts = () => {
  //TEMPORARY
  const posts = [
    { id:1, name: "John Dove", userId: 1, profilePic: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600", desc: "Lovely quote from To Kill a Mockingbird", img: mockingbird }, { id:2, name: "Susan Johnson's Baby Shampoo", userId: 2, profilePic: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg", desc: "Intriguing quote from Sword of Destiny", img: iceShard }
  ];

  return <div className="posts">
    {posts.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
  </div>;
};

export default Posts;