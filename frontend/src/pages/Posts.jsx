import React, { useEffect, useState } from "react";
import PostCard from "../components/Postcard";
import { callGeminiAPI } from "../api/gemini";
import { getRecentPosts } from "../api/instaService";
import useStore from "../store/instaStore";

const Posts = ({ setModalContent }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const {instaId} = useStore();
  const [posts, setPosts] = useState([]);

  // Fetch posts on mount
useEffect(() => {
  const fetchPosts = async () => {
    try {
      // Get current date and date from 1 year ago
      const to = new Date();
      const from = new Date();
      from.setFullYear(from.getFullYear() - 1);
      
      const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      };

      const data = await getRecentPosts(
        instaId,
        formatDate(from),
        formatDate(to)
      );
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  fetchPosts();
}, [instaId]);

  const handleGenerateCaptions = async (post) => {
    const prompt = `Generate 3 creative Instagram captions for a post with the text: "${post.text}", hashtags: ${post.hashTags?.join(
      ", "
    )}, and overall vibe from engagement: ${post.likes} likes, ${post.comments} comments.`;

    setIsGenerating(true);
    setModalContent({ title: "Generating Captions...", content: null });

    const response = await callGeminiAPI(prompt);

    setModalContent({
      title: `✨ AI Caption Suggestions`,
      content: response.split("\n"),
    });

    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Posts Performance</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.postID}
            post={{
              id: post.postID,
              image: post.postImage,
              caption: post.text,
              tags: post.hashTags || [],
              likes: post.likes,
              comments: post.comments,
              date: new Date(post.date).toLocaleDateString(),
              url: post.postUrl,
            }}
            onGenerateCaption={() => handleGenerateCaptions(post)}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
