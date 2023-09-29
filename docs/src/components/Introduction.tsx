import { CheckIcon } from '@/components/CheckIcon'
import { Container } from '@/components/Container'
import { ExternalLink } from './ExternalLink'

export function Introduction() {
  return (
    <section
      id="introduction"
      aria-label="Introduction"
      className="pb-8 pt-16 sm:pb-6 md:pt-24"
    >
      <Container className="text-xl tracking-normal text-slate-700">
        <p className="font-display text-5xl font-bold tracking-tight text-slate-900">
          Air Quality Dashboard
        </p>
        <p className="mt-8 text-2xl font-medium tracking-wide">
          An Air Quality real-time and historical dashboard built with{' '}
          <ExternalLink href="https://remix.run" name="Remix"></ExternalLink> on
          top of the{' '}
          <ExternalLink
            href="https://github.com/remix-run/blues-stack"
            name="Remix Blues Stack"
          />
        </p>
        <ul className="mt-12 space-y-6 text-lg">
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
              environmental stations and for real-time updates of the dashboard
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
              temperature sensors
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
              for the BME680 (
              <ExternalLink
                href="https://github.com/BoschSensortec/BME68x-Sensor-API"
                name="BME68x-Sensor-API"
              ></ExternalLink>{' '}
              on Github). BSEC precisely performs several calculations outside
              the device such as ambient air temperature, ambient relative
              humidity, pressure and air quality (IAQ) level.
            </span>
          </li>
        </ul>
      </Container>
    </section>
  )
}
