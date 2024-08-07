# To activate venv run

activate

With bash run

source .venv/Scripts/activate

# To deactivate venv run

deactivate

# To run the backend server locally

flask --debug run -h localhost

make sure you're in the backend directory

# To update the requirements.txt run

pip freeze > requirements.txt

# To create a migration

flask db migrate -m ""

# To run migration

flask db upgrade

# To run front end server

npm run dev

# To activate tailwind watch

npx tailwindcss -i ./frontend/src/index.css ./backend/static/css/styles.css -o ./output.css --watch
