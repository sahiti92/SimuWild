import React from "react";
import "./News.css";

const News = () => {
  const newsArticles = [
    {
      title: "New Species Discovered in Amazon",
      date: "October 15, 2024",
      summary:
        "Scientists have discovered a new species of frog in the Amazon rainforest, marking a breakthrough in biodiversity. This discovery highlights the importance of conservation in preserving unknown species. The frog has unique markings that aid its camouflage in the dense foliage. Researchers are excited about the potential medicinal properties of this species. Conservationists emphasize the need for stronger protections.",
    },
    {
      title: "Coral Reef Restoration in Australia",
      date: "July 18, 2024",
      summary:
        "Efforts to restore Australia’s Great Barrier Reef are underway with coral planting projects. Marine biologists are hopeful that this will support marine biodiversity. The project includes innovative techniques to ensure coral survival. Researchers aim to mitigate the effects of ocean warming on coral ecosystems. Public participation in reef preservation is encouraged.",
    },
    {
      title: "Record-Breaking Wildlife Conservation Funding",
      date: "June 12, 2024",
      summary:
        "A record-breaking $1 billion fund has been set aside for global wildlife conservation. This funding will go toward protecting endangered species and restoring habitats. Environmental organizations are optimistic about the potential impacts. Governments worldwide have committed to transparent fund usage. The fund will support new wildlife protection projects across continents.",
    },
    {
      title: "Launch of the Global Wildlife Tracker App",
      date: "May 3, 2024",
      summary:
        "A new app, Global Wildlife Tracker, lets users monitor animal migrations in real-time. The app uses satellite data to track endangered species’ movements. Conservationists believe this technology could prevent illegal hunting. Users receive updates on wildlife sightings and conservation tips. The app has already gathered a significant user base of nature enthusiasts.",
    },
    {
      title: "Conservation Success in the Amazon Basin",
      date: "April 22, 2024",
      summary:
        "Amazon Basin conservation efforts show promising results in reforestation. Over 10,000 hectares of forest have been restored, attracting native wildlife. Local communities have played a critical role in these efforts. The project has positively impacted biodiversity and climate resilience. International support is helping to expand these conservation areas further.",
    },
    {
      title: "Endangered Species Bill Passed in the U.S.",
      date: "March 5, 2024",
      summary:
        "The U.S. passed a bill to enhance protections for endangered species nationwide. This legislation aims to halt the decline of critical wildlife populations. Environmentalists see this as a step toward preserving ecological balance. The bill includes penalties for violating wildlife protection laws. Wildlife agencies will receive funding to enforce the new policies.",
    },
    {
      title: "New Eco-Tourism Program in Southeast Asia",
      date: "February 10, 2024",
      summary:
        "A new eco-tourism initiative invites visitors to explore and support conservation in Southeast Asia. Tours offer insights into endangered habitats and native species. Visitors can participate in conservation activities during their stay. The program aims to generate funds for local conservation projects. Increased awareness and eco-friendly tourism practices are encouraged.",
    },
    {
      title: "Research on Climate Impact on Wildlife Habitats",
      date: "January 27, 2024",
      summary:
        "A recent study reveals alarming trends in habitat loss due to climate change. Researchers studied animal displacement in regions with extreme weather. Results show some species struggle to adapt to altered ecosystems. Conservationists call for stronger climate action to protect wildlife. The study advocates for immediate preservation of critical habitats.",
    },
    {
      title: "European Union Bans Single-Use Plastics",
      date: "December 15, 2023",
      summary:
        "The European Union has officially banned single-use plastics to reduce environmental pollution. This ban aims to protect marine life affected by plastic waste. Alternatives like biodegradable and reusable materials are promoted. Environmental groups celebrate this decision as a victory for ocean health. The policy is expected to inspire similar bans globally.",
    },
    {
      title: "First Successful Translocation of Rhinos in India",
      date: "November 8, 2023",
      summary:
        "India completed its first successful translocation of rhinos to increase genetic diversity. The rhinos were moved to a new sanctuary with abundant resources. This initiative aims to prevent inbreeding in isolated populations. Conservationists are monitoring the rhinos’ adaptation to their new habitat. This project could serve as a model for other countries.",
    },
    {
      title: "Ocean Cleanup Project Removes 1 Ton of Waste",
      date: "October 1, 2023",
      summary:
        "An ocean cleanup initiative removed over 1 ton of waste from the Pacific Ocean. Volunteers and researchers collaborated on this massive effort. The waste collected primarily consisted of plastic debris harmful to marine life. The project aims to raise awareness about ocean pollution. Plans are underway to expand cleanup efforts in other regions.",
    },
    {
      title: "Revival of Native Plant Species in South America",
      date: "September 3, 2023",
      summary:
        "Botanists are leading a project to revive endangered plant species in South America. Native species are being replanted to restore biodiversity. These plants support various wildlife and local ecosystem health. Communities are involved in nurturing these plants to maturity. The project highlights the importance of preserving indigenous flora.",
    },
  ];

  return (
    <div className="news-section">
      <h1>Latest News</h1>
      <div className="news-list">
        {newsArticles.map((article, index) => (
          <div key={index} className="news-item">
            <h2>{article.title}</h2>
            <p className="news-date">{article.date}</p>
            <p>{article.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;