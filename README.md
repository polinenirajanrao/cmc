# Contact management center

This app is used by an employee of an organisation to manage contacts and groups

## What is this app made up of

* django 2.x for backend 
* angular 6 for front-end
* django-rest-framework to communicate between angular and django
* JWT for authentication
* PostgreSQL database

## Requirements

You need the following to run this app:

* Python 3.5 or higher (Python 2.x is not supported by Django 2.x)
* pip
* Node v8.x or higher
* NPM v5.x or higher

## Setup
* create a virtual environment(optional)
* have npm installed
* have latest angular cli installed
* clone the repo

Open a terminal at the repo root, and run the following:

```bash
pip install -r requirements.txt
cd cmc/front-end
npm install
ng build
cd ../..
python manage.py runserver
```

Cmc app will be available at http://127.0.0.1:8000.

## Database

This project uses a PostgreSQL database. Use below commands to setup database in an Ubuntu machine

```bash
sudo apt-get update
sudo apt-get install python-pip python-dev libpq-dev postgresql postgresql-contrib
sudo su - postgres
psql
CREATE DATABASE cmc;
CREATE USER cmcuser WITH PASSWORD 'password';
ALTER ROLE cmcuser SET client_encoding TO 'utf8';
ALTER ROLE cmcuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE cmcuser SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE cmc TO cmcuser;
\q
exit
```

For settings inside django you can see in projects settings.py file