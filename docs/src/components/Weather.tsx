import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'

export function Weather() {
  return (
    <div className="py-12">
      <section
        id="resources"
        aria-labelledby="resources-title"
        className="scroll-mt-12 py-12"
      >
        <Container>
          <SectionHeading number="3" id="resources-title">
            Weather
          </SectionHeading>
          <p className="mt-8 font-display text-4xl font-bold tracking-tight text-slate-900">
            Weather information.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Design assets, icon teardowns, and a community of fellow icon
            designers where you can ask questions, get feedback, and accelerate
            your learning.
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
            className="tems-end relative grid grid-cols-2 gap-y-12 py-8 lg:static"
          >
            <div>
              <h2 className="font-display text-6xl font-extrabold tracking-tight text-white sm:w-3/4 md:w-3/4 lg:w-auto">
                Temperature
              </h2>
              <p className="mt-4 text-lg tracking-tighter text-cyan-200">
                Sensor heat compensated temperature [degrees Celsius].
                Temperature measured by BME680 which is compensated for the
                influence of sensor (heater) in degree Celsius. The self heating
                introduced by the heater is depending on the sensor operation
                mode and the sensor supply voltage. The BME680 is factory
                trimmed, thus the temperature sensor of the BME680 is very
                accurate. The temperature value is a very local measurement
                value and can be influenced by external heat sources.
              </p>
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
            className="tems-end relative grid grid-cols-2 gap-y-12 py-8 lg:static"
          >
            <div>
              <h2 className="font-display text-6xl font-extrabold tracking-tight text-cyan-950 sm:w-3/4 md:w-3/4 lg:w-auto">
                Humidity
              </h2>
              <p className="mt-4 text-lg tracking-tighter text-cyan-900">
                Sensor heat compensated humidity [%]. Relative measured by
                BME680 which is compensated for the influence of sensor (heater)
                in %. Relative humidity strongly depends on the temperature (it
                is measured at). It may require a conversion to the temperature
                outside of the device.
              </p>
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
            className="tems-end relative grid grid-cols-2 gap-y-12 py-8 lg:static"
          >
            <div>
              <h2 className="font-display text-6xl font-extrabold tracking-tight text-white sm:w-3/4 md:w-3/4 lg:w-auto">
                Pressure
              </h2>
              <p className="mt-4 text-lg tracking-tighter text-cyan-200">
                Pressure sensor signal [Pa]. Pressure directly measured by the
                BME680 in Pa.
              </p>
            </div>
          </Container>
        </div>
      </section>
    </div>
  )
}
