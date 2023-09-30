import Image from 'next/image'
import { CheckIcon } from '@/components/CheckIcon'
import { Container } from '@/components/Container'
import { ExternalLink } from './ExternalLink'
import logoImage from '@/images/logo.png'

export function Introduction() {
  return (
    <>
      <section
        id="introduction"
        aria-label="Introduction"
        className="pb-8 pt-10 sm:pb-6 md:pt-8"
      >
        <Container className="text-xl tracking-normal text-slate-700">
          <div>
            <Image
              className="mb-8 ml-6 h-60 w-auto rounded-2xl"
              src={logoImage}
              alt=""
            />
          </div>
          <p className="font-display text-5xl font-bold tracking-tight text-slate-900">
            Air Quality Dashboard
          </p>
          <p className="mt-8 text-2xl font-medium tracking-wide">
            A real-time and historical Air Quality dashboard, ideal for indoor
            air monitoring and controlling HVAC systems, featuring:
          </p>
          <ul className="mt-12 space-y-6 text-lg">
            <li className="flex">
              <CheckIcon className="h-8 w-8 flex-none fill-cyan-950" />
              <span className="ml-4">
                <ExternalLink
                  href="https://remix.run"
                  name="Remix"
                ></ExternalLink>{' '}
                on top of the{' '}
                <ExternalLink
                  href="https://github.com/remix-run/blues-stack"
                  name="Remix Blues Stack"
                />
              </span>
            </li>
            <li className="flex">
              <CheckIcon className="h-8 w-8 flex-none fill-cyan-950" />
              <span className="ml-4">
                <ExternalLink
                  href="https://www.timescale.com/"
                  name="TimescaleDB"
                />{' '}
                a PostgreSQL based database with advanced support for timeseries
                data. Used to store sensor data in a hypertable and query data
                efficiently in time buckets to extract basic statistics
              </span>
            </li>
            <li className="flex">
              <CheckIcon className="h-8 w-8 flex-none fill-cyan-950" />
              <span className="ml-4">
                <ExternalLink href="https://socket.io" name="SocketIO" /> a
                websocket client and server implementation which provides
                bidirectional and low-latency communication for every platform.
                Used to control communication between the dashboard and the
                environmental stations and for real-time updates of the
                dashboard
              </span>
            </li>
            <li className="flex">
              <CheckIcon className="h-8 w-8 flex-none fill-cyan-950" />
              <span className="ml-4">
                <ExternalLink
                  href="https://www.bosch-sensortec.com/products/environmental-sensors/gas-sensors/bme688/"
                  name="BME688"
                ></ExternalLink>{' '}
                a{' '}
                <ExternalLink
                  href="https://www.bosch-sensortec.com/"
                  name="Bosch"
                />{' '}
                4-in-1 Gas Sensor aimed at Air quality and specific gas sensing.
                The BME688 features Artificial Intelligence (AI) and integrated
                high-linearity and high-accuracy pressure, humidity and
                temperature sensors.{' '}
                <ExternalLink
                  href="https://github.com/BoschSensortec/BME68x-Sensor-API"
                  name="BME68x-Sensor-API"
                ></ExternalLink>{' '}
                on Github
              </span>
            </li>
            <li className="flex">
              <CheckIcon className="h-8 w-8 flex-none fill-cyan-950" />
              <span className="ml-4">
                <ExternalLink
                  href="https://www.bosch-sensortec.com/software-tools/software/bsec/"
                  name="BSEC"
                ></ExternalLink>{' '}
                a{' '}
                <ExternalLink
                  href="https://www.bosch-sensortec.com/"
                  name="Bosch"
                />{' '}
                library which provides higher-level signal processing and fusion
                for the BME688. BSEC precisely performs several calculations
                outside the device such as ambient air temperature, ambient
                relative humidity, pressure and air quality (IAQ) level.
              </span>
            </li>
          </ul>
        </Container>
      </section>

      <section
        id="free-chapters"
        aria-label="Free preview"
        className="bg-cornflower-200 mt-8 scroll-mt-2 rounded-r-full text-cyan-950 sm:scroll-mt-2"
      >
        <div className="overflow-hidden lg:relative">
          <Container
            size="md"
            className="relative grid grid-cols-1 items-end gap-y-12 py-8 lg:static"
          >
            <div>
              <h2 className="font-display text-6xl font-extrabold tracking-tight text-cyan-950 sm:w-3/4 md:w-3/4 lg:w-auto">
                BSEC
              </h2>
              <p className="mt-4 text-lg tracking-tighter text-cyan-900">
                <ExternalLink
                  name="Bosch Software Environmental Cluster (BSEC)"
                  href="https://github.com/boschsensortec/BSEC-Arduino-library"
                />{' '}
                is a library providing higher-level signal processing and fusion
                for the BME68X. It precisely performs several calculations
                outside the device such as ambient air temperature, ambient
                relative humidity, pressure and air quality (IAQ) level.
                Moreover, the software algorithms handle humidity compensation,
                baseline as well as long-term drift correction of the gas
                sensor. The BSEC software is a closed source binary available
                via a Software License Agreement (SLA) on the{' '}
                <ExternalLink
                  name="Bosch Sensortec website"
                  href="https://www.bosch-sensortec.com/"
                />
              </p>
            </div>
          </Container>
        </div>
      </section>
    </>
  )
}
