import Image from 'next/image'
import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import temperatureImage from '@/images/temperature.png'
import humidityImage from '@/images/humidity.png'
import pressureImage from '@/images/pressure.png'

export function Weather() {
  return (
    <div className="py-12">
      <section
        id="resources"
        aria-labelledby="resources-title"
        className="scroll-mt-12 py-12"
      >
        <Container>
          <SectionHeading number="5" id="resources-title">
            Weather
          </SectionHeading>
          <p className="mt-8 font-display text-4xl font-bold tracking-tight text-slate-900">
            Weather information.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Weather information is calculated by the device and is not
            necessarily the same as the weather information from the nearest
            meteorological station.
          </p>
        </Container>
      </section>

      <section
        id="free-chapters"
        aria-label="Free preview"
        className="bg-cornflower-950 scroll-mt-2 rounded-r-full sm:scroll-mt-2"
      >
        <div className="overflow-hidden lg:relative">
          <Container
            size="md"
            className="relative grid grid-cols-2 items-center gap-y-12 py-8 lg:static"
          >
            <div>
              <h2 className="font-display text-6xl font-extrabold tracking-tight text-white sm:w-3/4 md:w-3/4 lg:w-auto">
                Temperature
              </h2>
              <p className="mt-4 text-lg tracking-tighter text-cyan-200">
                Sensor heat compensated temperature [degrees Celsius].
                Temperature measured by BME688 which is compensated for the
                influence of sensor (heater) in degree Celsius. The self heating
                introduced by the heater is depending on the sensor operation
                mode and the sensor supply voltage. The BME688 is factory
                trimmed, thus the temperature sensor of the BME688 is very
                accurate. The temperature value is a very local measurement
                value and can be influenced by external heat sources.
              </p>
            </div>
            <div>
              <Image
                className="ml-6 w-60 rounded-2xl"
                src={temperatureImage}
                alt=""
              />
            </div>
          </Container>
        </div>
      </section>
      <section
        id="free-chapters"
        aria-label="Free preview"
        className="bg-cornflower-200 mt-2 scroll-mt-2 rounded-r-full sm:scroll-mt-2"
      >
        <div className="overflow-hidden lg:relative">
          <Container
            size="md"
            className="relative grid grid-cols-2 items-end gap-y-12 py-8 lg:static"
          >
            <div>
              <h2 className="font-display text-6xl font-extrabold tracking-tight text-cyan-950 sm:w-3/4 md:w-3/4 lg:w-auto">
                Humidity
              </h2>
              <p className="mt-4 text-lg tracking-tighter text-cyan-900">
                Sensor heat compensated humidity [%]. Relative measured by
                BME688 which is compensated for the influence of sensor (heater)
                in %. Relative humidity strongly depends on the temperature (it
                is measured at). It may require a conversion to the temperature
                outside of the device.
              </p>
            </div>
            <div>
              <Image
                className="ml-6 mt-8 w-40 rounded-2xl"
                src={humidityImage}
                alt=""
              />
            </div>
          </Container>
        </div>
      </section>
      <section
        id="free-chapters"
        aria-label="Free preview"
        className="bg-cornflower-950 mt-2 scroll-mt-2 rounded-r-full sm:scroll-mt-2"
      >
        <div className="overflow-hidden lg:relative">
          <Container
            size="md"
            className="relative grid grid-cols-2 items-end gap-y-12 py-8 lg:static"
          >
            <div>
              <h2 className="font-display text-6xl font-extrabold tracking-tight text-white sm:w-3/4 md:w-3/4 lg:w-auto">
                Pressure
              </h2>
              <p className="mt-4 text-lg tracking-tighter text-cyan-200">
                Pressure sensor signal [Pa]. Pressure directly measured by the
                BME688 in Pa.
              </p>
            </div>
            <div>
              <Image
                className="ml-6 mt-4 w-60 rounded-2xl"
                src={pressureImage}
                alt=""
              />
            </div>
          </Container>
        </div>
      </section>
    </div>
  )
}
