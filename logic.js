// Define the list of cities
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

// Initialize an object to store data by state
let allData = {};

// Loop through the cities and load their respective JSON files using D3.js
cities.forEach(city => {
    d3.json(`resources/Data Analyst jobs in ${city}.json`)
      .then(data => {
            // Process and store the data for the current city
            let extractedData = data.data.map(job => ({
                employmentType: job.job_employment_type,
                state: job.job_state
            }));

            // Organize the data by state
            extractedData.forEach(item => {
                let { state, employmentType } = item;
                if (!allData[state]) {
                    allData[state] = {};
                }
                if (!allData[state][employmentType]) {
                    allData[state][employmentType] = 0;
                }
                allData[state][employmentType]++;
            });

            // Check if data has been loaded for all cities
            if (Object.keys(allData).length === cities.length) {
                // Now you have data from all cities organized by state in the 'allData' object
                // You can proceed to create pie charts for each state
                createPieCharts(allData);
            }
        })
        .catch(error => console.error(`Error loading data for ${city}:`, error));
});

// Function to create pie charts based on the organized data
function createPieCharts(dataByState) {
    // Loop through the states
    for (let state in dataByState) {
      if (dataByState.hasOwnProperty(state)) {
        let stateData = dataByState[state];
        // Create a pie chart for the current state
        createPieChart(stateData, state);
      }
    }
  }
  
  // Function to create a pie chart
  function createPieChart(data, state) {
    // Define dimensions and radius for the pie chart and legend
    let width = 600; // Make the width larger to accommodate the legend
    let height = 400; // Increased height to make space for state name and legend
    let radius = Math.min(width, height) / 3;
  
    // Select the SVG element or create one for the pie chart
    let svg = d3
      .select(`#${state}-pie-chart`)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
    // Create a group for the pie chart
    let pieGroup = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);
  
    // Create a pie layout
    let pie = d3.pie().value((d) => d.value);
  
    // Define a color scale for the pie chart segments
    let color = d3.scaleOrdinal(d3.schemeCategory10);
  
    // Generate the pie chart paths
    let arcs = pieGroup
      .selectAll("arc")
      .data(pie(Object.entries(data).map(([key, value]) => ({ key, value }))))
      .enter()
      .append("g")
      .attr("class", "arc");
  
    // Create the pie chart segments
    let arc = d3.arc().innerRadius(0).outerRadius(radius);
  
    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.key));
  
    // Add a title indicating the state above the pie chart
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 20) // Adjust the y position to place it above the pie chart
      .attr("text-anchor", "middle")
      .text(state);
  
    // Add a legend with percentages next to job types
    let jobTypes = Object.keys(data);
    let legendSpacing = 20;
  
    jobTypes.forEach((jobType, index) => {
      let legendItem = svg.append("g").attr("class", "legend-item");
  
      legendItem
        .append("rect")
        .attr("x", 20)
        .attr("y", height / 2 + index * legendSpacing)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", color(jobType)); // Assign the color based on the job type
  
      legendItem
        .append("text")
        .attr("x", 40)
        .attr("y", height / 2 + index * legendSpacing + 12)
        .text(`${jobType} (${(
          (data[jobType] / d3.sum(Object.values(data))) *
          100
        ).toFixed(2)}%)`);
    });
  }