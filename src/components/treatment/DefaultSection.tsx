
import React from "react";

interface DefaultSectionProps {
  title: string;
  content: string | React.ReactNode;
}

const DefaultSection = ({ title, content }: DefaultSectionProps) => {
  return (
    <div className="my-12">
      <h2 className="heading-md mb-4">{title}</h2>
      {typeof content === "string" ? <p className="body-md">{content}</p> : content}
    </div>
  );
};

export default DefaultSection;
