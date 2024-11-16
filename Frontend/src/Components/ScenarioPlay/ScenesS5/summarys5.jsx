import React from "react";

const SundarbansInfo = () => {
  const styles = {
    container: {
      backgroundImage: "url('/bg.png')", // Path to your background image
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      color: "#fff",
      textShadow: "1px 1px 5px rgba(0, 0, 0, 0.7)",
      //background: "rgba(0, 0, 0, 0.2)",
    },
    contentBox: {
      background: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
      borderRadius: "10px",
      padding: "20px",
      maxWidth: "800px",
      width: "100%",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.8)",
    },
    heading: {
      fontSize: "2rem",
      marginBottom: "20px",
      textAlign: "center",
    },
    subheading: {
      fontSize: "1.5rem",
      marginTop: "20px",
    },
    paragraph: {
      fontSize: "1rem",
      lineHeight: "1.6",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentBox}>
        <h1 style={styles.heading}>The Bengal Tigers of Sundarbans</h1>
        <p style={styles.paragraph}>
          The Bengal tiger population in the Sundarbans, the world's largest
          mangrove forest, faces severe threats from rising sea levels caused by
          climate change and habitat destruction. Parts of the forest have
          already been submerged, and illegal timber logging and deforestation
          further fragment the tigers' territory. As a result, tigers are
          increasingly venturing into villages, attacking livestock and people.
          In 2019, these conflicts peaked, sparking widespread concern over the
          future of both tigers and nearby communities.
        </p>
        <h2 style={styles.subheading}>Conserve the Habitat</h2>
        <p style={styles.paragraph}>
          Conserving the Sundarbans' habitat is crucial for the survival of
          Bengal tigers and the safety of human settlements. Planting trees,
          restoring mangroves, and mitigating climate change can stabilize the
          tigers' environment, ensuring they have ample prey and reducing their
          need to enter villages. This approach protects tigers, reduces
          conflicts, and maintains the mangrove ecosystem, which provides
          essential benefits like storm protection and biodiversity.
        </p>
        <h2 style={styles.subheading}>Continue Deforestation</h2>
        <p style={styles.paragraph}>
          Deforestation through illegal timber logging and construction gravely
          endangers Bengal tigers. Habitat loss forces them closer to human
          settlements, escalating attacks on people and livestock. Fragmented
          forests also reduce prey populations, worsening the crisis. Ongoing
          destruction threatens not only the tiger population but also the
          delicate balance of the Sundarbans, increasing risks for both wildlife
          and local communities.
        </p>
        <h2 style={styles.subheading}>Conclusion</h2>
        <p style={styles.paragraph}>
          Conserving the habitat ensures a sustainable future for the
          Sundarbans, its tigers, and the people who depend on it. In contrast,
          continuing deforestation leads to greater conflict, environmental
          degradation, and the decline of an iconic species. Immediate action is
          essential to secure this unique ecosystem.
        </p>
      </div>
    </div>
  );
};

export default SundarbansInfo;
