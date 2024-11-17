const { fetchSpeciesData, fetchAssessmentById } = require('../controllers/speciesController');

const fetchIUCNData = async (req, res) => {
    try {
        const speciesName = req.query.scientificName; // Get scientific name from query
        const speciesData = await fetchSpeciesData(speciesName);

        const assessments = await Promise.all(
            speciesData.assessments.map(async (assessment) => {
                const assessmentDetails = await fetchAssessmentById(assessment.id);
                return assessmentDetails;
            })
        );

        res.json(assessments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from IUCN' });
    }
};

module.exports = fetchIUCNData;
