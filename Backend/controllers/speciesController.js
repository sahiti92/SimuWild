const axios = require('axios');

const IUCN_API_URL = 'https://apiv4.iucnredlist.org/api/v4/';
const IUCN_TOKEN = 'M7nPwzmpKeErp7CnVsLVYJE1Ukag3ZeqrN61'; // Replace with your API token

const fetchSpeciesData = async (scientificName) => {
    try {
        const response = await axios.get(`${IUCN_API_URL}taxa/scientific_name/${scientificName}`, {
            params: { token: IUCN_TOKEN }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching species data:', error);
        throw error;
    }
};

const fetchAssessmentById = async (assessmentId) => {
    try {
        const response = await axios.get(`${IUCN_API_URL}assessment/${assessmentId}`, {
            params: { token: IUCN_TOKEN }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching assessment data:', error);
        throw error;
    }
};

module.exports = { fetchSpeciesData, fetchAssessmentById };
