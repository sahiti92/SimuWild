import React from "react";

const Features = () => {
  const features = [
    {
      title: "Story-Based Learning",
      description: "Navigate human impact on wildlife.",
      image: "/learning.jpg",
    },
    {
      title: "Endangered Species Watchlist",
      description: "Track at-risk species.",
      image: "/species.jpg",
    },
    {
      title: "Virtual Map and Quiz",
      description: "Interactive learning through maps and quizzes.",
      image: "/map.jpg",
    },
    {
      title: "Indigenous Knowledge",
      description: "Share and document indigenous practices.",
      image: "/knowledge.jpg",
    },
  ];

  return (
    <section style={sectionStyle}>
      {features.map((feature, index) => (
        <div key={index} style={featureBlockStyle}>
          <img src={feature.image} alt={feature.title} style={imageStyle} />
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  );
};

const sectionStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px",
  padding: "20px",
};

const featureBlockStyle = {
  backgroundColor: "#f4f4f4",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
};

const imageStyle = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "8px",
};

export default Features;
