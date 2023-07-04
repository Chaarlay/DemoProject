This directory contains two subdirectories - one for a django backend, the
other for a react frontend - that combine to create an example web application.

## Running locally

### Backend

To run the backend, it's highly recommended to set up a virtual environment. In
your virtual environment, install the dependencies contained in the
`requirements.txt`  file:

```bash
pip install -r backend/requirements.txt
```

This demo comes with a pre-populated database. You may want to copy it into
place:

```bash
cp backend/db.sqlite3.demo backend/db.sqlite3
```

To run the django application, navigate to the project root and start the
django dev server.

```bash
cd backend
./manage.py runserver 127.0.0.1:8000
```

This will start a dev server listening for connections to localhost over port
8000. You may wish to modify IP address and port information to suit your local
environment, keeping in mind that you might need to modify the backend's
allowed hosts or the frontend's configuration to allow communication between
the front- and back-end.

### Frontend

To run the frontend, navigate to the project root and install dependencies:

```bash
cd frontend
npm install
```

Run the dev server:

```bash
npm start
```
