// Loop through the cities and load their respective JSON files using D3.js
cities.forEach(city => {
  d3.json(`Data Analyst jobs in ${city}.json`)
    .then(data => {
      // Process and store the data for the current city
      let extractedData = data.data.map(job => ({
        employmentType: job.job_employment_type,
        state: job.job_state,
        // Add more fields as needed
    }))
  })
});
// This is the code
let cities = [
  'Adelaide',
  'Brisbane',
  'Canberra',
  'Darwin',
  'Hobart',
  'Melbourne',
  'Perth',
  'Sydney'
];
let allData = []; // To store data from all cities

// Loop through the cities and load their respective JSON files using D3.js
cities.forEach(city => {
  d3.json(`Data Analyst jobs in ${city}.json`)
    .then(data => {
      // Process and store the data for the current city
      let extractedData = data.data.map(job => ({
        employmentType: job.job_employment_type,
        state: job.job_state,
        // Add more fields as needed
      }));
      // Append the data for the current city to the allData array
      allData.push(...extractedData);
      // Check if data has been loaded for all cities
      if (allData.length === cities.length) {
        // Now you have data from all cities in the 'allData' array
        // You can proceed with data analysis and visualization
      }
    })
    .catch(error => console.error(`Error loading data for ${city}:`, error));
});