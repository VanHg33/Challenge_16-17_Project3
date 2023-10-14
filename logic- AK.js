/// Define the list of cities
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

// Initialize an object to store data by state and job requirement type
let allData = {};

// Function to load data from the server
function loadDataFromServer(city) {
  return new Promise((resolve, reject) => {
    fetch(`/data?city=${city}`)
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

      // Organize the data by state and job requirements type
      let dataByStateAndType = {};

      data.forEach((item) => {
        let state = item.state;
        let job_requirement = item.job_requirement;
        let count = item.count;

        if (!dataByStateAndType[state]) {
          dataByStateAndType[state] = {};
        }

        if (!dataByStateAndType[state][job_requirement]) {
          dataByStateAndType[state][job_requirement] = 0;
        }

        dataByStateAndType[state][job_requirement] += count;
      });

      // Now you have data organized by state and job requirement type
      // You can proceed to create pie charts for each state
      createPieCharts(dataByStateAndType);
    });
  })
  .catch((error) => console.error('Error loading data:', error));

  // Function to create a multi-bar chart for a given state and its data
function createMultiBarChart(state, stateData) {
  // Extract the job requirement types and their counts for the given state
  const jobRequirements = Object.keys(stateData);
  const counts = Object.values(stateData);

  // Get the canvas element to render the chart
  const canvas = document.createElement('canvas');
  canvas.id = state; // Set a unique ID for the canvas

  // Create a container element for the chart
  const chartContainer = document.createElement('div');
  chartContainer.className = 'chart-container';
  chartContainer.appendChild(canvas);

  // Add the container to the DOM
  document.body.appendChild(chartContainer);

  // Create a bar chart using Chart.js
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: jobRequirements,
      datasets: [
        {
          label: `Job Requirements in ${state}`,
          data: counts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Customize the bar colors
          borderColor: 'rgba(75, 192, 192, 1)', // Customize the bar border colors
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}