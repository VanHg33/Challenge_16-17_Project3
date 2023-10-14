// Function to create a bar chart
function createBarChart(data, state) {
    // Define dimensions for the bar chart and legend
    let margin = { top: 20, right: 20, bottom: 30, left: 40 };
    let width = 600 - margin.left - margin.right;
    let height = 400 - margin.top - margin.bottom;
  
    // Create an SVG element for the bar chart
    let svg = d3
      .select(`#${state}-bar-chart`)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // Create the x and y scales
    let x = d3.scaleBand().range([0, width]).padding(0.1);
    let y = d3.scaleLinear().range([height, 0]);
  
    // Set the domains for the x and y scales
    x.domain(data.map((d) => d.key));
    y.domain([0, d3.max(data, (d) => d.value)]);
  
    // Create the bars for the bar chart
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.key))
      .attr("width", x.bandwidth())
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => height - y(d.value));
  
    // Add the x-axis to the bar chart
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
  
    // Add the y-axis to the bar chart
    svg.append("g").call(d3.axisLeft(y));
  }
  
  // ... (rest of the code remains the same)
  
  // Function to create bar charts from the retrieved data
  function createBarCharts(dataByStateAndType) {
    for (let state in dataByStateAndType) {
      if (dataByStateAndType.hasOwnProperty(state)) {
        if (!createdBarCharts.has(state)) {
          console.log(`Creating bar chart for state: ${state}`);
          let stateData = dataByStateAndType[state];
          createBarChart(
            Object.entries(stateData).map(([key, value]) => ({
              key,
              value,
            })),
            state
          );
          createdBarCharts.add(state);
        }
      }
    }
  }
  