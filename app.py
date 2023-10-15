
from flask import Flask, render_template, jsonify

import numpy as np
import pandas as pd

import sqlite3

conn = sqlite3.connect('Data Wrangling/JSearchdata.sqlite')

# Check to see if the connection to db is successful.
test_df = pd.read_sql('SELECT * FROM json_data', conn)
print("\n================== CHECK ==========================\n")
print(test_df.head(2))
print("\n===================================================\n")

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/map")
def map():
    return render_template("map.html")

# Jordan html connection
@app.route('/Employment')
def employment():
    return render_template('employment.html')

# AK HTML connection
@app.route('/Education')
def education():
    return render_template('education.html')

# Ola HTML connection
@app.route('/Publisher')
def publisher():
    return render_template('publisher.html')



@app.route("/api/city_count")
def city_count():
    print("\n================== /api/city_count ==========================\n")
    
    conn = sqlite3.connect('Data Wrangling/JSearchdata.sqlite')
    cursor = conn.cursor()
    cursor.execute("SELECT job_city, COUNT(*) as count FROM json_data GROUP BY job_city")
    
    results = cursor.fetchall()
    conn.close()
    
    print("\n================== city count ==========================\n")
    print(results)
    print("\n===================================================\n")

    data = []
    
    for result in results:
        row = {
            'city': result[0],
            'count': result[1]
        }
        
        data.append(row)
    
    return jsonify(data)

@app.route("/api/job_category/<job_city>")
def job_category(job_city=None):
    print("\n================== /api/job_info/<job_city> ==========================\n")
    
    conn = sqlite3.connect('Data Wrangling/JSearchdata.sqlite')
    cursor = conn.cursor()
    
    sql_string = f"SELECT job_employment_type, count(*) FROM json_data where job_city='{job_city}' group by job_employment_type"
    cursor.execute(sql_string)
    
    # Fetch all the data
    results = cursor.fetchall()
    # Close the database connection
    conn.close()
    
    print("\n================== job type count ==========================\n")
    print(results)
    print("\n===================================================\n")

    data = []
    
    for result in results:
        row = {
            'title': result[0],
            'count': result[1]
        }
        
        data.append(row)
    
    return jsonify(data)

@app.route("/api/job_info/<job_city>")
def job_info(job_city=None):
    print("\n================== /api/job_info/<job_city> ==========================\n")
    
    conn = sqlite3.connect('Data Wrangling/JSearchdata.sqlite')
    cursor = conn.cursor()
    
    sql_string = f"SELECT * FROM json_data where job_city='{job_city}'"
    cursor.execute(sql_string)

    results = cursor.fetchall()
    conn.close()
    
    print("\n================== detail ==========================\n")
    print(results)
    print("\n===================================================\n")

    data = []
    
    for result in results:
        row = {
            'Company_name': result[1],
            'Job_publisher': result[2],
            'Job_type': result[3],
            'Job_title': result[4],
            'Job_apply_link': result[5],
            'Job_description': result[6],
            'Job_city': result[7],
            'Job_state': result[8]
        }
        
        data.append(row)
    
    return jsonify(data)

@app.route("/api/mapping")
def mapping():
    print("\n================== /api/map ==========================\n")
    
    conn = sqlite3.connect('Data Wrangling/JSearchdata.sqlite')
    cursor = conn.cursor()
    
    sql_string = f"SELECT job_state, COUNT(*) as count, job_latitude, job_longitude FROM json_data GROUP BY job_state"
    cursor.execute(sql_string)

    results = cursor.fetchall()
    conn.close()
    
    print("\n================== city_count ==========================\n")
    print(results)
    print("\n===================================================\n")

    data = []
    
    for result in results:
        row = {
            'state': result[0],
            'count': result[1],
            'latitude': result[2],
            'longitude': result[3]
        }
        
        data.append(row)
    
    return jsonify(data)


# Jordan part

@app.route('/data')
def get_data():
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect('Data Wrangling/JSearchdata.sqlite')  # Updated with the correct database file name
        cursor = conn.cursor()

        # Execute a query to retrieve data with state and job employment type information
        cursor.execute("SELECT job_state, job_employment_type, COUNT(*) as count FROM json_data GROUP BY job_state, job_employment_type")

        # Fetch all the data
        data = cursor.fetchall()

        # Close the database connection
        conn.close()

        # Prepare data for sending as JSON
        result = [{'state': row[0], 'employment_type': row[1], 'count': row[2]} for row in data]

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)})
    


# AK part
@app.route('/data0')
def get_education():
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect('Data Wrangling/JSearchdata.sqlite')  # Updated with the correct database file name
        cursor = conn.cursor()

        # Execute a query to retrieve data with state and job requirement type information
        cursor.execute("SELECT job_state, job_required_education_bachelors_degree, COUNT(*) FROM json_data GROUP BY job_state, job_required_education_bachelors_degree")

        # Fetch all the data
        data0 = cursor.fetchall()

        # Close the database connection
        conn.close()

        # Prepare data for sending as JSON
        result = [{'state': row[0], 'job_required_education_bachelors_degree': row[1], 'count': row[2]} for row in data0]

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)})


# Ola part
# Define a route to retrieve data with state and job employment type information
@app.route('/data1')
def get_publisher():
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect('Data Wrangling/JSearchdata.sqlite')  # Updated with the correct database file name
        cursor = conn.cursor()

        # Execute a query to retrieve data with state and job employment type information
        cursor.execute("SELECT job_state, job_publisher, COUNT(*) FROM json_data GROUP BY job_state, job_publisher")

        # Fetch all the data
        data1 = cursor.fetchall()

        # Close the database connection
        conn.close()

        # Prepare data for sending as JSON
        result = [{'state': row[0], 'publisher': row[1], 'count': row[2]} for row in data1]

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)})



if __name__ == '__main__':
    app.run(debug=True)



