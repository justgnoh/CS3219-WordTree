

- React (Redux)
- Node.js (Express)
- PostgreSQL
- nginx
- Docker

## Installation

Template adapted from https://github.com/raevsanton/bookstore/

1.  
    ```bash
    git clone https://github.com/CS3219-SE-Principles-and-Patterns/cs3219-project-ay2122-2122-s1-g36.git
    ```
2. Ensure you have docker and docker compose installed. 
3. Ensure docker is running.
4. Copy .env.example into .env and fill in the required fields
 - POSTGRES_URL: the url e.g. postgresql://user:secret@localhost
 - POSTGRES_DATA: where postgres data is stored on ur local setup

4. 
   ```bash
    cd cs3219-project-ay2122-2122-s1-g36
    ```
5.
    ```bash
    docker-compose up --build
    ```

6. Visit http://localhost:5001 and http://localhost:5002 and you should see "hello" 
7. Visit http://localhost:5003 to see some template UI