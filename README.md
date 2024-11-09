# notion-clone

Frontend using Vite, React, Typescript.

Backend using NodeJS, Typescript.

# To run locally (with docker)

Development:

docker compose -f docker-compose.yml up --build

Production:

NODE_ENV=production docker compose up --build

# To run locally (no docker)

frontend:

`cd frontend`

`npm install`

`npm run dev`

backend:

`cd backend`

`npm install`

`npm run dev`


# Troubleshooting

Clear volume storage:

`docker-compose down --volumes`

`docker volume prune -f`

Clear existing postgres processes:

`ps aux | grep postgres`

`sudo kill -9 process_id`
