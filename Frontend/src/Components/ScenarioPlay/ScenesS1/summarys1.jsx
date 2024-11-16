import React from "react";
import axios from "axios";
import { getUserFromStorage } from "../../../utils/getUser";
import { useNavigate } from "react-router-dom";
const SummarySceneS1 = () => {
  const token = getUserFromStorage();
  const navigate = useNavigate();
  const handleRestartClick = async () => {
    try {
      console.log("Resetting progress");
      const scenarioId = 1;
      await axios.post(
        "http://localhost:8001/api/v1/progress/reset",
        { scenarioId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Progress has been reset.");
      navigate("/scenarios/scenario1");
    } catch (error) {
      console.error("Error resetting progress:", error);
      alert(
        "Failed to reset progress: " +
          (error.response?.data?.error || "Unknown error")
      );
    }
  };
  const styles = {
    container: {
      backgroundImage: "url('/bg1.png')", // Path to your background image
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      color: "#fff",
      textShadow: "1px 1px 5px rgba(0, 0, 0, 0.7)",
    },
    contentBox: {
      background: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
      borderRadius: "10px",
      padding: "20px",
      maxWidth: "90%", // Make it responsive
      width: "100%",
      maxHeight: "90vh", // Prevent overflowing
      overflowY: "auto", // Enable scrolling if content exceeds height
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.8)",
      scrollbarWidth: "thin", // For Firefox
      scrollbarColor: "#888 #f1f1f1", // For Firefox
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
      textAlign: "justify", // Makes text easier to read
    },
    /* Customizing the scrollbar for Webkit browsers (Chrome, Safari) */
    "::webkit-scrollbar": {
      width: "8px", // Width of the scrollbar
    },
    "::webkit-scrollbar-thumb": {
      backgroundColor: "#888", // Thumb color
      borderRadius: "10px", // Rounded corners
      transition: "background-color 0.3s ease", // Smooth transition
    },
    "::webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555", // Thumb color on hover
    },
    "::webkit-scrollbar-track": {
      background: "#f1f1f1", // Track color
      borderRadius: "10px", // Rounded corners
    },
  };

  return (
    <div style={styles.container}>
      <button
        onClick={handleRestartClick}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 1,
        }}
      >
        ReStart
      </button>
      <div style={styles.contentBox}>
        <h1 style={styles.heading}>Elephant Conservation Scenario Summary</h1>
        <p style={styles.paragraph}>
          Elephants, the gentle giants of the wild, face a dire situation as
          their habitats are encroached upon by human activities. This scenario
          explores the choices made to either prioritize economic development
          through deforestation or conserve natural habitats, and their
          far-reaching consequences.
        </p>

        <h2 style={styles.subheading}>
          Choice 1: Support Deforestation for Economic Development
        </h2>
        <p style={styles.paragraph}>
          Supporting deforestation paves the way for economic growth by
          facilitating infrastructure development and creating job
          opportunities. However, this comes at a steep cost to wildlife. As
          forests are cleared, elephants lose their natural habitats and are
          forced into human settlements, resulting in increased conflicts.
          Villages bear the brunt of crop destruction and property damage, while
          elephants, stressed and displaced, face dwindling survival chances.
          Although economic gains are evident in the short term, the ecological
          imbalance and loss of biodiversity are long-lasting repercussions.
        </p>

        <h2 style={styles.subheading}>Sub-Choices Under Deforestation</h2>
        <p style={styles.paragraph}>
          To address the challenges posed by habitat loss, two measures were
          implemented. The first involved installing electric fences around
          villages. This strategy initially reduced human-elephant conflicts but
          soon proved inadequate, as elephants adapted to bypass the barriers.
          Moreover, the fences restricted the animals' migration patterns,
          further affecting their well-being. The second measure focused on
          relocating elephants to a sanctuary. While this provided a safe haven
          for some elephants and alleviated conflicts in affected areas, the
          high costs and limited capacity of sanctuaries highlighted the
          limitations of this approach.
        </p>

        <h2 style={styles.subheading}>Choice 2: Stop Deforestation</h2>
        <p style={styles.paragraph}>
          Choosing to halt deforestation prioritizes the preservation of natural
          habitats, ensuring the survival of elephants and maintaining
          ecological balance. By safeguarding forests, elephants retain their
          natural territory, reducing the likelihood of venturing into human
          settlements. This choice fosters peaceful coexistence between humans
          and wildlife. Additionally, the long-term benefits include sustained
          biodiversity, improved ecosystem services, and minimized conflicts,
          highlighting the importance of environmental conservation over
          short-term economic gains.
        </p>

        <h2 style={styles.subheading}>Conclusion</h2>
        <p style={styles.paragraph}>
          The elephant conservation scenario underscores the delicate balance
          between economic development and environmental sustainability.
          Supporting deforestation exacerbated human-elephant conflicts,
          disrupted ecosystems, and endangered these majestic creatures. In
          contrast, halting deforestation offered a harmonious solution,
          protecting both wildlife and human interests. By prioritizing
          conservation efforts, a sustainable future can be secured for
          elephants and the ecosystems they inhabit, illustrating the profound
          impact of making choices rooted in ecological responsibility.
        </p>
      </div>
    </div>
  );
};

export default SummarySceneS1;
