// /// Define the list of cities
// let cities = [
//   'Adelaide',
//   'Brisbane',
//   'Canberra',
//   'Darwin',
//   'Hobart',
//   'Melbourne',
//   'Perth',
//   'Sydney',
// ];

// // Initialize an object to store data by state and job requirement type
// let allData0 = {};

// // Function to load data from the server
// function loadDataFromServer(city) {
//   return new Promise((resolve, reject) => {
//     fetch(`/data0?city=${city}`)
//       .then((response) => {
//         if (!response.ok) {
//           // Handle the error response here
//           console.error('Error loading data:', response.statusText);
//           reject(response.statusText);
//           return;
//         }
//         return response.json();
//       })
//       .then((data0) => {
//         if (data0.error) {
//           // Handle the error message received from the server
//           console.error('Error loading data:', data0.error);
//           reject(data0.error);
//         } else {
//           console.log('Data received from the server:', data0); // Log the received data
//           resolve({ city, data0 });
//         }
//       })
//       .catch((error) => {
//         console.error('Error loading data:', error);
//         reject(error);
//       });
//   });
// }

// // Loop through the cities and load data from the server
// Promise.all(
//   cities.map((city) => {
//     return loadDataFromServer(city);
//   })
// )
//   .then((results) => {
//     // Process and store the data for each city
//     results.forEach((result) => {
//       let city = result.city;
//       let data0 = result.data0;

//       // Organize the data by state and job requirements type
//       let dataByStateAndType0 = {};

//       data0.forEach((item) => {
//         let state = item.state;
//         let job_requirement = item.job_requirement;
//         let count = item.count;

//         if (!dataByStateAndType0[state]) {
//           dataByStateAndType0[state] = {};
//         }

//         if (!dataByStateAndType0[state][job_requirement]) {
//           dataByStateAndType0[state][job_requirement] = 0;
//         }

//         dataByStateAndType0[state][job_requirement] += count;
//       });

//       // Now you have data organized by state and job requirement type
//       // You can proceed to create pie charts for each state
//       createMultiBarChart(dataByStateAndType0);
//     });
//   })
//   .catch((error) => console.error('Error loading data:', error));

// // Function to create a multi-bar chart for a given state and its data
// function createMultiBarCharts(dataByStateAndType0) {
//   for (let state in dataByStateAndType0) {
//     let stateData = dataByStateAndType0[state];
//     createMultiBarChart(state, stateData);
//   }
// }

//   // Function to create a multi-bar chart for a given state and its data
// function createMultiBarChart(state, stateData) {
//   // Extract the job requirement types and their counts for the given state
//   const jobRequirements = Object.keys(stateData);
//   const counts = Object.values(stateData);

//   // Get the canvas element to render the chart
//   const canvas = document.createElement('canvas');
//   canvas.id = state; // Set a unique ID for the canvas

//   // Create a container element for the chart
//   const chartContainer = document.createElement('div');
//   chartContainer.className = 'chart-container';
//   chartContainer.appendChild(canvas);

//   // Add the container to the DOM
//   document.body.appendChild(chartContainer);

//   // Create a bar chart using Chart.js
//   new Chart(canvas, {
//     type: 'bar',
//     data: {
//       labels: jobRequirements,
//       datasets: [
//         {
//           label: `Job Requirements in ${state}`,
//           data: counts,
//           backgroundColor: 'rgba(75, 192, 192, 0.2)', // Customize the bar colors
//           borderColor: 'rgba(75, 192, 192, 1)', // Customize the bar border colors
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   });
// }


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
let allData = {};

// Function to load data from the server
function loadDataFromServer(city) {
  return new Promise((resolve, reject) => {
    fetch(`/data0?city=${city}`)
      .then((response) => {
        if (!response.ok) {
          // Handle the error response here
          console.error('Error loading data:', response.statusText);
          reject(response.statusText);
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          // Handle the error message received from the server
          console.error('Error loading data:', data.error);
          reject(data.error);
        } else {
          console.log('Data received from the server:', data); // Log the received data
          resolve({ city, data });
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
      let data = result.data;

      // Organize the data by state and job employment type
      let dataByStateAndType = {};

      data.forEach((item) => {
        let state = item.state;
        let educationType = item.job_required_education_bachelors_degree;
        let count = item.count;

        if (!dataByStateAndType[state]) {
          dataByStateAndType[state] = {};
        }

        if (!dataByStateAndType[state][educationType]) {
          dataByStateAndType[state][educationType] = 0;
        }

        dataByStateAndType[state][educationType] += count;
      });

      // Now you have data organized by state and job employment type
      // You can proceed to create pie charts for each state
      createPieCharts(dataByStateAndType);
    });
  })
  .catch((error) => console.error('Error loading data:', error));

// Initialize a set to keep track of states for which pie charts have been created
let createdPieCharts = new Set();

function createPieCharts(dataByStateAndType) {
  // Loop through the states
  for (let state in dataByStateAndType) {
    if (dataByStateAndType.hasOwnProperty(state)) {
      // Check if a pie chart has already been created for this state
      if (!createdPieCharts.has(state)) {
        console.log(`Creating pie chart for state: ${state}`);
        let stateData = dataByStateAndType[state];
        // Create a pie chart for the current state
        createPieChart(stateData, state);

        // Add the state to the set of created pie charts
        createdPieCharts.add(state);
      }
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
    .data(
      pie(
        Object.entries(data).map(([key, value]) => ({
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
  let educations = Object.keys(data);
  let legendSpacing = 20;

  const valueToLabel = {
    '0': 'Not Required',
    '1': 'Required',
  };
  educations.forEach((education, index) => {
    legendItem
      .append("rect")
      .attr("x", 20)
      .attr("y", height / 2 + index * legendSpacing)
      .attr("width", 15)
      .attr("height", 15)
      .style("fill", color(education)); // Assign the color based on the job type

    // legendItem
    //   .append("text")
    //   .attr("x", 40)
    //   .attr("y", height / 2 + index * legendSpacing + 12)
    //   .text(`${education} (${((data[education] / d3.sum(Object.values(data))) * 100).toFixed(2)}%)`);
    legendItem
      .append("text")
      .attr("x", 40)
      .attr("y", height / 2 + index * legendSpacing + 12)
      .text(`${valueToLabel[education]} (${((data[education] / d3.sum(Object.values(data))) * 100).toFixed(2)}%)`);
  });
}
