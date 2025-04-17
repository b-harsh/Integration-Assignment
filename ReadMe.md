Data Ingestion Tool: ClickHouse and Flat File Integration
This project allows bidirectional data ingestion between a ClickHouse database and Flat Files (CSV), with a web-based interface to handle configurations and monitor the progress.

🎯 Project Overview
Frontend: React with Material UI (MUI)

Backend: FastAPI (Python)

Database: ClickHouse (configured with JWT authentication)

Functionality:

Ingest data from ClickHouse to Flat File.

Ingest data from Flat File to ClickHouse.

Select columns for ingestion.

Show progress and task status in real-time.

🛠️ Setup and Installation
1. Prerequisites
Make sure you have the following installed:

Node.js (for frontend)

Python 3.8+ (for backend)

pip (for Python dependencies)

You'll also need a ClickHouse instance running, either locally or on a remote server. If you don’t have a ClickHouse instance, you can use ClickHouse Cloud or set up a local ClickHouse server using Docker.

2. Backend Setup (FastAPI)
Navigate to the backend/ directory in your project.

Create and activate a virtual environment:

bash
Copy
Edit
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
Install dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Make sure you have ClickHouse credentials (username, password, host, etc.) available for configuration.

Start the backend server:

bash
Copy
Edit
uvicorn app.main:app --reload
The backend should now be running at http://localhost:8000.

3. Frontend Setup (React)
Navigate to the frontend/ directory in your project.

Install dependencies:

bash
Copy
Edit
npm install
Start the frontend server:

bash
Copy
Edit
npm start
The frontend should now be running at http://localhost:3000.

🚀 Usage
1. Frontend (React UI)
Open your browser and navigate to http://localhost:3000.

The UI allows you to configure the following:

Source: Choose between ClickHouse or Flat File.

ClickHouse Configuration:

Host: ClickHouse server hostname/IP.

Port: Port for ClickHouse (default 8123).

Database: Database in ClickHouse.

User: Username for ClickHouse.

JWT Token: Provide your ClickHouse JWT token for authentication.

Flat File Configuration:

File Name: Provide the local file name (CSV).

Delimiter: Set the delimiter used in the file (e.g., , for CSV).

Column Selection: Specify the columns to ingest.

File Upload: The app currently does not handle file uploads. You need to specify a local file and its delimiter in the UI.

Once configured, press the Start Ingestion button. The ingestion process will begin, and you will see the progress and status updates on the UI.

🧑‍💻 Backend API Endpoints
The backend exposes the following API endpoints:

1. File to ClickHouse (CSV to ClickHouse)
POST /ingest/csv-to-clickhouse

Request Payload:

json
Copy
Edit
{
  "file_name": "your_file.csv",
  "columns": ["column1", "column2"],
  "delimiter": ",",
  "host": "your_clickhouse_host",
  "port": "your_clickhouse_port",
  "user": "your_clickhouse_user",
  "jwt_token": "your_jwt_token",
  "database": "your_database",
  "table_name": "your_table_name"
  
}
2. Get Progress
GET /ingest/progress/{task_id}

Response:

json
Copy
Edit
{
  "task_id": "some_task_id",
  "progress": 75
}
🧪 Testing
You can use sample datasets like uk_price_paid and ontime for testing with ClickHouse.

Test Cases:
ClickHouse -> Flat File: Ingest data from a ClickHouse table to a flat file (CSV).

Flat File -> ClickHouse: Upload data from a CSV to a new ClickHouse table.

Progress Reporting: Check the ingestion progress in real-time.

Error Handling: Ensure correct error messages for connection issues, invalid data, or query problems.

🧑‍💻 Code Structure
Backend:
/backend/app: Contains FastAPI app, models, and services.

/backend/requirements.txt: Python dependencies.

Frontend:
/frontend/src: React components and UI logic.

/frontend/package.json: Node.js dependencies.

