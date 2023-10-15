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

// Initialize an object to store data by state and job requirement type
let allData0 = {};

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
      .then((data0) => {
        if (data0.error) {
          // Handle the error message received from the server
          console.error('Error loading data:', data0.error);
          reject(data0.error);
        } else {
          console.log('Data received from the server:', data0); // Log the received data
          resolve({ city, data0 });
        }
      })
      .catch((error) => {
        console.error('Error loading data:', error);
        reject(error);
      });
  });
}

// // Function to create a multi-bar chart for a given city and its data
// function createMultiBarChart(city, cityData) {
//   // Extract the job requirement types and their counts for the given city
//   const jobRequirements = Object.keys(cityData);
//   const counts = Object.values(cityData);

//   // Get the canvas element to render the chart
//   const canvas = document.createElement('canvas');
//   canvas.id = city; // Set a unique ID for the canvas

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
//           label: `Job Requirements in ${city}`,
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

// Function to create a multi-bar chart for a given city and its data
function createMultiBarChart(city, cityData) {
  // Extract the job requirement types and their counts for the given city
  const jobRequirements = Object.keys(cityData);
  const counts = Object.values(cityData);

  // Create a container element for the chart
  const chartContainer = document.createElement('div');
  chartContainer.className = 'chart-container';

  // Add the container to the DOM
  document.body.appendChild(chartContainer);

  // Create a bar chart using Chart.js
  new Chart(chartContainer, {
    type: 'bar',
    data: {
      labels: jobRequirements,
      datasets: [
        {
          label: `Job Requirements in ${city}`,
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


// Load data from the server for all cities and create charts
Promise.all(
  cities.map((city) => {
    return loadDataFromServer(city)
      .then((result) => {
        let city = result.city;
        let data0 = result.data0;

        // Organize the data by job requirements type for the city
        let cityData = {};

        data0.forEach((item) => {
          let job_requirement = item.job_requirement;
          let count = item.count;

          if (!cityData[job_requirement]) {
            cityData[job_requirement] = 0;
          }

          cityData[job_requirement] += count;
        });

        // Now you have data organized by job requirement type for the city
        // You can proceed to create multi-bar charts for each city
        createMultiBarChart(city, cityData);
      })
      .catch((error) => console.error('Error loading data:', error));
  })
).catch((error) => console.error('Error loading data:', error));
