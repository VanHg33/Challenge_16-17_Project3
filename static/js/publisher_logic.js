// Define the list of cities
let cities = [
  'Adelaide',
  'Brisbane',
  'Canberra',
  'Darwin',
  'Hobart',
  'Melbourne',
  'Perth',
  'Sydney',
];

// Initialize an object to store data by state and job employment type
let allData1 = {};

// Function to load data from the server
function loadDataFromServer(city) {
  return new Promise((resolve, reject) => {
    fetch(`/data1?city=${city}`)
      .then((response) => {
        if (!response.ok) {
          // Handle the error response here
          console.error('Error loading data:', response.statusText);
          reject(response.statusText);
          return;
        }
        return response.json();
      })
      .then((data1) => {
        if (data1.error) {
          // Handle the error message received from the server
          console.error('Error loading data:', data1.error);
          reject(data1.error);
        } else {
          console.log('Data received from the server:', data1); // Log the received data
          resolve({ city, data1 });
        }
      })
      .catch((error) => {
        console.error('Error loading data:', error);
        reject(error);
      });
  });
}

// Loop through the cities and load data from the server
Promise.all(
  cities.map((city) => {
    return loadDataFromServer(city);
  })
)
  .then((results) => {
    // Process and store the data for each city
    results.forEach((result) => {
      let city = result.city;
      let data1 = result.data1;

      // Organize the data by state and type
      let dataByStateAndType1 = {};

      data1.forEach((item) => {
        let state = item.state;
        let jobPublisher = item.publisher;
        let count = item.count;

        if (!dataByStateAndType1[state]) {
          dataByStateAndType1[state] = {};
        }

        if (!dataByStateAndType1[state][jobPublisher]) {
          dataByStateAndType1[state][jobPublisher] = 0;
        }

        dataByStateAndType1[state][jobPublisher] += count;
      });

      // Now you have data organized by state and type
      // You can proceed to create pie charts for each state
      createPieCharts(dataByStateAndType1);
    });
  })
  .catch((error) => console.error('Error loading data:', error));

  // Initialize a set to keep track of states for which pie charts have been created
let createdPieCharts = new Set();

function createPieCharts(dataByStateAndType1) {
  // Loop through the states
  for (let state in dataByStateAndType1) {
    if (dataByStateAndType1.hasOwnProperty(state)) {
      // Check if a pie chart has already been created for this state
      if (!createdPieCharts.has(state)) {
        console.log(`Creating pie chart for state: ${state}`);
        let stateData = dataByStateAndType1[state];
        // Create a pie chart for the current state
        createPieChart(stateData, state);

        // Add the state to the set of created pie charts
        createdPieCharts.add(state);
      }
    }
  }
}

// Function to create a pie chart
function createPieChart(data1, state) {
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
    .data(
      pie(
        Object.entries(data1).map(([key, value]) => ({
          key,
          value,
        }))
      )
    )
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
  let legendItem = svg.append("g").attr("class", "legend-item");
  let publishers = Object.keys(data1);
  let legendSpacing = 20;

  publishers.forEach((publisher, index) => {
    legendItem
      .append("rect")
      .attr("x", 20)
      .attr("y", height / 2 + index * legendSpacing)
      .attr("width", 15)
      .attr("height", 15)
      .style("fill", color(publisher)); // Assign the color based on the job type

    legendItem
      .append("text")
      .attr("x", 40)
      .attr("y", height / 2 + index * legendSpacing + 12)
      .text(`${publisher} (${((data1[publisher] / d3.sum(Object.values(data1))) * 100).toFixed(2)}%)`);
  });
}