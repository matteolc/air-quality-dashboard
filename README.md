# Air Quality Dashboard

An Air Quality real-time and historical dashboard built with [Remix](https://remix.run) on top of the Remix Blues Stack, with:

- [TimescaleDB](https://www.timescale.com/) TimescaleDB is a PostgreSQL based database with advanced support for timeseries data. It is used to store
sensor data in a hypertable and query data efficiently in time buckets to extract basic statistics.
- [SocketIO](https://socket.io) SocketIO is a websocket client and server implementation which provides bidirectional and low-latency communication for every platform. It is used to control
communication between the dashboard and the environmental stations and for real-time updates of the dashboard.
- [BME688](https://www.bosch-sensortec.com/products/environmental-sensors/gas-sensors/bme688/) The BME688 is [Bosch](https://www.bosch-sensortec.com/) 4-in-1 Gas Sensor aimed at Air quality and specific gas sensing. The BME688 features Artificial Intelligence (AI) and integrated high-linearity and high-accuracy pressure, humidity and temperature sensors.
- [BSEC](https://www.bosch-sensortec.com/software-tools/software/bsec/) BSEC is a [Bosch](https://www.bosch-sensortec.com/) library which provides higher-level signal processing and fusion for the BME680 ([BME68x-Sensor-API](https://github.com/BoschSensortec/BME68x-Sensor-API) on Github). BSEC precisely performs several calculations outside the device such as ambient air temperature, ambient relative humidity, pressure and air quality (IAQ) level.

## Main features

- Shows an onboarding screen until the first station is provisioned. As soon as a station has been provisioned, confetti rain and a button that links to the new station dashboard will appear.
- Shows a real-time dashboard with Air Quality (IAQ, BVOC and CO2) and Weather (Temperature, Pressure, Humidity) data for every connected station.
- Shows a real-time indication of the status of the BME688 sensor, to validate the confidence of readings (*)
- Shows a real-time indication of the battery charge level (when available)
- Shows an hour/day/week/month/year cumulative report with AVG/MIN/MAX/P95/P90/P75/P50 for each parameter monitored.
- Rains confetti on the dashboard everytime a new station is added.
- Allows to delete a station and to truncate to the last month the readings for each parameter monitored.

Data stored in the database:

- Basic information regarding the station: name, location, the machine UUID of the board
- The reading value of each parameter monitored

(*) A visual indication is given once the sensor data is ready, according to:

- Gas sensor stabilization status. Indicates initial stabilization status of the gas sensor element: stabilization is ongoing (0) or stabilization is finished (1)
- Gas sensor run-in status. Indicates power-on stabilization status of the gas sensor element: stabilization is ongoing (0) or stabilization is finished (1).
- Furhtermore, **IAQ Accuracy** is shown in the IAQ meter on a scale from 0 to 3. IAQ accuracy indicator will notify the user when she/he should initiate a calibration process. Calibration is performed automatically in the background if the sensor is exposed to clean and polluted air for approximately 30 minutes each.

| Name                       | Value |  Accuracy description                                                                                       |
|----------------------------|-------|-------------------------------------------------------------------------------------------------------------|
| UNRELIABLE                 |   0   | Sensor data is unreliable, the sensor must be calibrated                                                    |
| LOW_ACCURACY               |   1   | Low accuracy, sensor should be calibrated                                                                   |
| MEDIUM_ACCURACY            |   2   | Medium accuracy, sensor calibration may improve performance                                                 |
| HIGH_ACCURACY              |   3   | High accuracy                                                                                               |

| Virtual sensor             | Value |  Accuracy description                                                                                                                                         |
|----------------------------|-------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| IAQ                        |   0   | Stabilization / run-in ongoing                                                                                                                                |
|                            |   1   | Low accuracy,to reach high accuracy(3),please expose sensor once to good air (e.g. outdoor air) and bad air (e.g. box with exhaled breath) for auto-trimming  |
|                            |   2   | Medium accuracy: auto-trimming ongoing                                                                                                                        |
|                            |   3   | High accuracy

### Air Quality

- **IAQ** The IAQ scale ranges from 0 (clean air) to 500 (heavily polluted air). During operation, algorithms automatically calibrate and adapt themselves to the typical environments where the sensor is operated (e.g., home, workplace, inside a car, etc.).This automatic background calibration ensures that users experience consistent IAQ performance. The calibration process considers the recent measurement history (typ. up to four days) to ensure that IAQ=50 corresponds to typical good air and IAQ=200 indicates typical polluted air.
- **CO2** CO2 equivalent estimate [ppm]
- **BVOC** Breath VOC concentration estimate [ppm]
- **Gas** Gas sensor signal [Ohm]. Gas resistance measured directly by the BME680 in Ohm.The resistance value changes due to varying VOC concentrations (the higher the concentration of reducing VOCs, the lower the resistance and vice versa).

The difference between IAQ and static IAQ (sIAQ) relies in the scaling factor calculated based on the recent sensor history. The sIAQ output has been optimized for stationary applications (e.g. fixed indoor devices) whereas the IAQ output is ideal for mobile application (e.g. carry-on devices).

- **bVOCeq** The breath VOC equivalent (bVOCeq) estimates the total VOC concentration [ppm] in the environment. It is calculated based on the sIAQ output and derived from lab tests.
- **CO2eq** The CO2 equivalent estimates a CO2-equivalent (CO2eq) concentration [ppm] in the environment. It is also calculated based on the sIAQ output and derived from VOC measurements and correlation from field studies.

Since bVOCeq and CO2eq are based on the sIAQ output, they are expected to perform optimally in stationnary applications where the main source of VOCs in the environment comes from human activity (e.g. in a bedroom).

### Weather

- **Temperature** Sensor heat compensated temperature [degrees Celsius]. Temperature measured by BME680 which is compensated for the influence of sensor (heater) in degree Celsius. The self heating introduced by the heater is depending on the sensor operation mode and the sensor supply voltage. The BME680 is factory trimmed, thus the temperature sensor of the BME680 is very accurate. The temperature value is a very local measurement value and can be influenced by external heat sources.
- **Humidity** Sensor heat compensated humidity [%]. Relative measured by BME680 which is compensated for the influence of sensor (heater) in %. Relative humidity strongly depends on the temperature (it is measured at). It may require a conversion to the temperature outside of the device.
- **Pressure** Pressure sensor signal [Pa]. Pressure directly measured by the BME680 in Pa.

## Arduino Code

The Arduino code will:

- Send BME688 data at an interval of 5s
- Turn off the onboard led when BME688 readings are stable
- Use the NeoPixel as a color-coded IAQ indicator

## Local development

To try and test the application on your local machine you will need:

- **Docker** Used for the TimescaleDB service. Run `docker-compose up` to pull the image and start the service.
- **BME688** Used to gather environmental data. I used the [Pimoroni](https://shop.pimoroni.com/products/bme688-breakout?variant=39336951709779) one.
- An **ESP32** or **Raspberry Pico W** Used to send environmental data via Wi-Fi or BLE. I used the [Adafruit Feather ESP32 v2]() board which comes with a handy I2C connector, a LiPo charger and connector and a
NeoPixel RGBW LED.

Steps to start the dashboard server and client:

- Clone this repository
- Start TimescaleDB with `docker-compose up`
- Run database migrations `npx prisma migrate dev`
- Start the dev server `npx run dev`

To provision your ESP32 or Raspberry Pico W board:

- Connect the BME688 sensor to I2C
- Upload the Arduino sketch with Arduino IDE
- Provision Wi-Fi and SocketIO service address

As soon as the board connects to the server you will see a confetti rain and a link to the dashboard.

## Production build

## Contributions

Your contribution is welcome. Open a PR and we can take it from there.


# Remix Blues Stack

Learn more about [Remix Stacks](https://remix.run/stacks).

```
npx create-remix@latest --template remix-run/blues-stack
```

## What's in the stack

- [Multi-region Fly app deployment](https://fly.io/docs/reference/scaling/) with [Docker](https://www.docker.com/)
- [Multi-region Fly PostgreSQL Cluster](https://fly.io/docs/getting-started/multi-region-databases/)
- Healthcheck endpoint for [Fly backups region fallbacks](https://fly.io/docs/reference/configuration/#services-http_checks)
- [GitHub Actions](https://github.com/features/actions) for deploy on merge to production and staging environments
- Email/Password Authentication with [cookie-based sessions](https://remix.run/utils/sessions#creatememorysessionstorage)
- Database ORM with [Prisma](https://prisma.io)
- Styling with [Tailwind](https://tailwindcss.com/)
- End-to-end testing with [Cypress](https://cypress.io)
- Local third party request mocking with [MSW](https://mswjs.io)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

Not a fan of bits of the stack? Fork it, change it, and use `npx create-remix --template your/repo`! Make it your own.

## Quickstart

Click this button to create a [Gitpod](https://gitpod.io) workspace with the project set up, Postgres started, and Fly pre-installed

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/remix-run/blues-stack/tree/main)

## Development

- Start the Postgres Database in [Docker](https://www.docker.com/get-started):

  ```sh
  npm run docker
  ```

  > **Note:** The npm script will complete while Docker sets up the container in the background. Ensure that Docker has finished and your container is running before proceeding.

- Initial setup:

  ```sh
  npm run setup
  ```

- Run the first build:

  ```sh
  npm run build
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.

The database seed script creates a new user with some data you can use to get started:

- Email: `rachel@remix.run`
- Password: `racheliscool`

If you'd prefer not to use Docker, you can also use Fly's Wireguard VPN to connect to a development database (or even your production database). You can find the instructions to set up Wireguard [here](https://fly.io/docs/reference/private-networking/#install-your-wireguard-app), and the instructions for creating a development database [here](https://fly.io/docs/reference/postgres/).

### Relevant code:

This is a pretty simple note-taking app, but it's a good example of how you can build a full stack app with Prisma and Remix. The main functionality is creating users, logging in and out, and creating and deleting notes.

- creating users, and logging in and out [./app/models/user.server.ts](./app/models/user.server.ts)
- user sessions, and verifying them [./app/session.server.ts](./app/session.server.ts)
- creating, and deleting notes [./app/models/note.server.ts](./app/models/note.server.ts)

## Deployment

This Remix Stack comes with two GitHub Actions that handle automatically deploying your app to production and staging environments.

Prior to your first deployment, you'll need to do a few things:

- [Install Fly](https://fly.io/docs/getting-started/installing-flyctl/)

- Sign up and log in to Fly

  ```sh
  fly auth signup
  ```

  > **Note:** If you have more than one Fly account, ensure that you are signed into the same account in the Fly CLI as you are in the browser. In your terminal, run `fly auth whoami` and ensure the email matches the Fly account signed into the browser.

- Create two apps on Fly, one for staging and one for production:

  ```sh
  fly apps create app-0d97
  fly apps create app-0d97-staging
  ```

  > **Note:** Once you've successfully created an app, double-check the `fly.toml` file to ensure that the `app` key is the name of the production app you created. This Stack [automatically appends a unique suffix at init](https://github.com/remix-run/blues-stack/blob/4c2f1af416b539187beb8126dd16f6bc38f47639/remix.init/index.js#L29) which may not match the apps you created on Fly. You will likely see [404 errors in your Github Actions CI logs](https://community.fly.io/t/404-failure-with-deployment-with-remix-blues-stack/4526/3) if you have this mismatch.

- Initialize Git.

  ```sh
  git init
  ```

- Create a new [GitHub Repository](https://repo.new), and then add it as the remote for your project. **Do not push your app yet!**

  ```sh
  git remote add origin <ORIGIN_URL>
  ```

- Add a `FLY_API_TOKEN` to your GitHub repo. To do this, go to your user settings on Fly and create a new [token](https://web.fly.io/user/personal_access_tokens/new), then add it to [your repo secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) with the name `FLY_API_TOKEN`.

- Add a `SESSION_SECRET` to your fly app secrets, to do this you can run the following commands:

  ```sh
  fly secrets set SESSION_SECRET=$(openssl rand -hex 32) --app app-0d97
  fly secrets set SESSION_SECRET=$(openssl rand -hex 32) --app app-0d97-staging
  ```

  > **Note:** When creating the staging secret, you may get a warning from the Fly CLI that looks like this:
  >
  > ```
  > WARN app flag 'app-0d97-staging' does not match app name in config file 'app-0d97'
  > ```
  >
  > This simply means that the current directory contains a config that references the production app we created in the first step. Ignore this warning and proceed to create the secret.

  If you don't have openssl installed, you can also use [1password](https://1password.com/password-generator/) to generate a random secret, just replace `$(openssl rand -hex 32)` with the generated secret.

- Create a database for both your staging and production environments. Run the following:

  ```sh
  fly postgres create --name app-0d97-db
  fly postgres attach --app app-0d97 app-0d97-db

  fly postgres create --name app-0d97-staging-db
  fly postgres attach --app app-0d97-staging app-0d97-staging-db
  ```

  > **Note:** You'll get the same warning for the same reason when attaching the staging database that you did in the `fly set secret` step above. No worries. Proceed!

Fly will take care of setting the `DATABASE_URL` secret for you.

Now that everything is set up you can commit and push your changes to your repo. Every commit to your `main` branch will trigger a deployment to your production environment, and every commit to your `dev` branch will trigger a deployment to your staging environment.

If you run into any issues deploying to Fly, make sure you've followed all of the steps above and if you have, then post as many details about your deployment (including your app name) to [the Fly support community](https://community.fly.io). They're normally pretty responsive over there and hopefully can help resolve any of your deployment issues and questions.

### Multi-region deploys

Once you have your site and database running in a single region, you can add more regions by following [Fly's Scaling](https://fly.io/docs/reference/scaling/) and [Multi-region PostgreSQL](https://fly.io/docs/getting-started/multi-region-databases/) docs.

Make certain to set a `PRIMARY_REGION` environment variable for your app. You can use `[env]` config in the `fly.toml` to set that to the region you want to use as the primary region for both your app and database.

#### Testing your app in other regions

Install the [ModHeader](https://modheader.com/) browser extension (or something similar) and use it to load your app with the header `fly-prefer-region` set to the region name you would like to test.

You can check the `x-fly-region` header on the response to know which region your request was handled by.

## GitHub Actions

We use GitHub Actions for continuous integration and deployment. Anything that gets into the `main` branch will be deployed to production after running tests/build/etc. Anything in the `dev` branch will be deployed to staging.

## Testing

### Cypress

We use Cypress for our End-to-End tests in this project. You'll find those in the `cypress` directory. As you make changes, add to an existing file or create a new file in the `cypress/e2e` directory to test your changes.

We use [`@testing-library/cypress`](https://testing-library.com/cypress) for selecting elements on the page semantically.

To run these tests in development, run `npm run test:e2e:dev` which will start the dev server for the app as well as the Cypress client. Make sure the database is running in docker as described above.

We have a utility for testing authenticated features without having to go through the login flow:

```ts
cy.login();
// you are now logged in as a new user
```

We also have a utility to auto-delete the user at the end of your test. Just make sure to add this in each test file:

```ts
afterEach(() => {
  cy.cleanupUser();
});
```

That way, we can keep your local db clean and keep your tests isolated from one another.

### Vitest

For lower level tests of utilities and individual components, we use `vitest`. We have DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.
