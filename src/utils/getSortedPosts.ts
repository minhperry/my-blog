import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

type SortMode = "created" | "modified";

const getSortedPosts = (
  posts: CollectionEntry<"blog">[],
  mode: SortMode = "created"
) => {
  return posts.filter(postFilter).sort((a, b) => {
    const getDate = (post: CollectionEntry<"blog">) => {
      if (mode === "modified") {
        return new Date(post.data.modDatetime ?? post.data.pubDatetime);
      }
      return new Date(post.data.pubDatetime);
    };

    return (
      Math.floor(getDate(b).getTime() / 1000) -
      Math.floor(getDate(a).getTime() / 1000)
    );
  });
};

export default getSortedPosts;
