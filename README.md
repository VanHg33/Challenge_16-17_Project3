# Challenge_16-17_Project3

# Project Description:

The focus of this project is the creation of a website dedicated to showcasing Data-related job listings in Australia. This includes common roles such as data engineers, data scientists, data analysts, and more. Data for this project is sourced from the JSearch API, and the data retrieval process is facilitated through Jupyter Notebooks. After extracting the data, it undergoes a rigorous cleaning process to filter and retain only relevant information, including details like company names, job titles, job publishers, and job application links.

Following data cleansing, the information is exported into a SQLite database. SQLite was chosen because it is a serverless, self-contained database, which makes it highly suitable for this web application. The SQLite Viewer Web app is employed to view and manage the SQLite database.

To visualize this data and provide valuable insights, Flask APIs are utilized to extract data from the SQLite Database. This data is then used to create interactive visualizations in the form of pie charts, maps, and tables.

**List of HTML Pages:**

***index.html (Home Page):*** The primary landing page displaying data-related job listings across Australia.

***dashboard.html (Dashboard Page):*** This page offers the capability to select different cities in Australia for searching data job opportunities.

***map.html (Map Page):*** Presents markers for each state in Australia, along with the total number of job listings in each state.

***employment.html (Employment Page):*** Showcases pie charts illustrating employment type statistics in the data job field.

***education.html (Education Page):*** Features pie charts highlighting the educational requirements for data-related jobs.

***publisher.html (Publisher Page):*** Provides insights into the popular job publishers for data job listings in each Australian state.

# Tech Stack Used:
The project is powered bby Python Flask API and includes HTML/CSS, JavaScript and SQLite database.
Python (including Pandas, JSON)
JavaScript (including Plotly, Leaflet, and D3.js)
SQLite
HTML and CSS
Bootstrap for styling and design (JavaScript library)

Size of data: The databse includes 592 rows and 12 columns 


In the website's header, you'll find buttons for accessing the dashboard, map, and a dropdown menu leading to statistical tables for employment, education, and publishers. Each HTML page is associated with its JavaScript file for ease of connection and manipulation, while a CSS file is used to maintain the format and style of the website's features.
