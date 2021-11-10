# Team 36 - WordTree
Tech Stack: 
- React
- Node.js (Express)
- PostgreSQL
- Docker / Kubernetes

Note: Our original code repository template is adapted from https://github.com/raevsanton/bookstore/.
## Installation

 ```bash
    git clone https://github.com/CS3219-SE-Principles-and-Patterns/cs3219-project-ay2122-2122-s1-g36.git
 ```
 ```bash
    cd cs3219-project-ay2122-2122-s1-g36
 ```
### Backend Setup (including k8s)
1. Ensure you have Docker application running. 
2. Enable kubernetes on Docker desktop.
3. cd server and you will see all the backend microservices.
4. For frontend, download the firebase config js file locally (Ask Admin for the file). Add an env.js into /frontend/src folder env.js.
5. For each microservices (except Auth Service), add a .env file and fill in the required fields as follows:
   - POSTGRES_URL: the url to ElephantSQL (to get from Admin). If local database is used, need to run the schema.sql file in migrations > schema.sql.
6. For Auth Service, download the firebase admin sdk json file locally (Ask Admin for the file). Add a .env file into auth folder fill in the required fields as follows:
    - GOOGLE_APPLICATION_CREDENTIALS: To include the path to the JSON file.
7. Run the following commands in order:
```bash
    cd cs3219-project-ay2122-2122-s1-g36
```
```bash
    docker-compose up --build
```
```bash
    cd kubernetes
```
```bash
    kubectl apply -f 1-namespace.yaml
```
```bash
    kubectl apply -f 2-deployment.yaml
```
```bash
    kubectl apply -f 3-service.yaml
```
```bash
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.4/deploy/static/provider/cloud/deploy.yaml
```
```bash
    kubectl apply -f 4-ingress.yaml
```

A very detailed guide is also provided: https://docs.google.com/document/d/1wCqnVBfssOi5EvXQJEbJAH__EJsxyB8XdbW5GPtXdHU/edit?usp=sharing

7. If you wish to test for k8s cluster autoscaling (as demonstrated in the report), cd to kuberneteshpa folder in Step 6 instead and apply all the files, then also run
```bash
    kubectl apply -f 5-hpa.yaml
```
The whole backend now resides in the local k8s cluster.

### Frontend Setup
Follow the instructions below to set up the frontend.

```bash
    cd frontend
 ```
 ```bash
    npm install 
 ```
 ```bash
    npm start 
 ```
 
1. Visit http://localhost:3000 and start using WordTree!
