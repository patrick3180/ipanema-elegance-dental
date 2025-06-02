
import React from "react";
import { Tag } from "lucide-react";

interface BlogPostTagsProps {
  tags?: string[];
}

const BlogPostTags = ({ tags }: BlogPostTagsProps) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto mb-6 flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <div key={index} className="flex items-center bg-dental-beige/50 text-dental-purple text-xs px-3 py-1 rounded-full">
          <Tag size={12} className="mr-1" />
          {tag}
        </div>
      ))}
    </div>
  );
};

export default BlogPostTags;
