# M&D / Sibon / BPeap Back-End

This is the back-end for the M&D software. Ensure you have Node 10 installed (prefably using NVM) and Yarn installed globally (`npm install -g yarn`).

## Running

    $> yarn
    $> yarn start

This will listen on localhost:8080.

## Development Setup

This repo includes a Docker configuration. Start a Dockerized Mongo instance as follows:

    $> docker-compose up mongo

The database needs to be primed with tag data. Run this with a Mongo instance running:

    $> yarn db:reset

Run this command to clear out dashboards and views if they get corrupt.

### Initial Tag Data

When you run `yarn db:reset`, it runs the `scripts/reset-*.js` script against the database. This does the following:

* Deletes _*all*_ tags, events, dashboards, and views
* Inserts MOT and PI tags
* Inserts _virtual_ MOT tags for Duval data sets
* Inserts event types

Depending on what you're doing, you might want to configure all the data sets to pull from Druid. In that case, replace all the lines that look like this:

    rawSeries('2-51320-TM1B Hydrogen', 'ppm')

with:

    druidSeries('2-51320-TM1B Hydrogen', '2-51320-TM1B', 'hydrogen', 'ppm')

and re-run `yarn db:reset`.

## Overriding Default Configuration

This code uses environment variables for configuration. The defaults are:

* PORT = 8080
* MONGO_URL = mongodb://localhost:27017/bpeap
* MONGO_DB = bpeap
* DRUID_QUERY_HOST (no default)
* DRUID_BROKER_PORT = 8082
* MOT_DATASOURCE = mot
* PI_DATASOURCE = pi

If you need to override these values, set them on the command line as follows:

    $> PORT=9090 MONGO_URL="mongodb://someotherserver:4444/someotherdbname" yarn start

Or copy the `dotenv-sample` file to `.env` and update the values for your environment.

## Troubleshooting

*NOTE:* When you run `db:reset`, it deletes _all_ dashboards and views. This means that the front-end, if running, will be asking for dashboards and views that no longer exist. For that reason, _*MAKE SURE YOU SIGN OUT BEFORE RESETTING THE DATABASE*_.
