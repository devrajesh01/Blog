import { useLocation } from "react-router-dom";

export const BlogDetails = () => {
  const location = useLocation();
  const post = location.state?.post;
  console.log(post);
  return (
    <div>
      <h1>{post?.title} {post?.id}</h1>
      <p>{post?.body}</p>
    </div>
  );
};