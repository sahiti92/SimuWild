const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/species/india', async (req, res) => {
    try {
        const response = await axios.get('https://api.iucnredlist.org/api/v4/countries/IN');
        const speciesData = response.data.result;

        // Optionally filter for specific categories
        const endangeredSpecies = speciesData.filter(species => 
            species.category === 'CR' || species.category === 'EN' || species.category === 'VU'
        );

        res.json(endangeredSpecies);
    } catch (error) {
        console.error('Error fetching species data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
