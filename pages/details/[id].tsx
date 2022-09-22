import React from "react";
import { useRouter } from "next/router";

const PostDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>this is the detail of post : {id}</div>;
};

export default PostDetails;
