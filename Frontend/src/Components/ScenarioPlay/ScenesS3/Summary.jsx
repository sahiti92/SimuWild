import React from 'react';
import { useNavigate } from 'react-router-dom';
import './summary.css'

const SummaryPage = () => {
  const navigate = useNavigate();

  // Dummy handler to navigate to a starting page or restart the flow
  const handleRestart = () => {
    console.log("Restart clicked");
    navigate('/start'); // Assuming '/start' is the route to restart the game
  };

  // Dummy handler to navigate to an exit or home page
  const handleExit = () => {
    console.log("Exit clicked");
    navigate('/home'); // Assuming '/home' is the exit or home route
  };

  return (
    <div className="summary-container">
      <h1>The Village Dilemma: Poaching vs. Protection</h1>
      <p>
        In a remote village surrounded by the wild beauty of a rich and thriving ecosystem, the community is faced with an agonizing choice. The local wildlife, once plentiful, now stands threatened by the relentless encroachment of poaching. The villagers, struggling with limited resources, are torn between two paths that carry both opportunity and risk.
      </p>

      <h2>The Trade-offs:</h2>
      <ul>
        <li><strong>Hiring Armed Rangers:</strong> This choice provides a safeguard for the precious wildlife, ensuring their protection from poachers. However, it comes with its own set of challenges. The presence of armed rangers could escalate tensions within the village, creating divisions among the residents and potentially putting civilian lives at risk. While the ecosystem may thrive, the fragile peace of the community could be shattered.</li>
        <li><strong>Allowing Poaching to Continue:</strong> By choosing to overlook the poaching, the villagers could meet immediate economic needs, benefiting from the short-term gains that come with illegal hunting. However, this decision would come at a devastating cost. The loss of endangered species would erode the foundation of the ecosystem, causing long-term ecological damage that could have irreversible consequences for the environment and the village’s future.</li>
      </ul>

      <h2>Summary:</h2>
      <p>
        This is a dilemma that forces a choice between the preservation of the environment and the immediate survival of the community. Protecting wildlife ensures the future of the ecosystem but may fracture the village’s unity, while tolerating poaching offers short-term relief but jeopardizes the very land the villagers rely on. Both choices carry profound consequences, and the balance between these two paths will shape the future of both the wildlife and the community.
      </p>

      <div className="button-container">
        <button onClick={handleRestart}>Restart</button>
        <button onClick={handleExit}>Exit</button>
      </div>
    </div>
  );
};

export default SummaryPage;
