import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'

export function AirQuality() {
  return (
    <div className="py-12">
      <section
        id="screencasts"
        aria-labelledby="screencasts-title"
        className="scroll-mt-12 py-12"
      >
        <Container>
          <SectionHeading number="2" id="screencasts-title">
            Air Quality
          </SectionHeading>
          <p className="mt-8 font-display text-4xl font-bold tracking-tight text-slate-900">
            Air Quality indicators measured by the BME688 gas sensor.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            The difference between IAQ and static IAQ (sIAQ) relies in the
            scaling factor calculated based on the recent sensor history. The
            sIAQ output has been optimized for stationary applications (e.g.
            fixed indoor devices) whereas the IAQ output is ideal for mobile
            application (e.g. carry-on devices).
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Breath VOC and CO2 equivalents are based on the static IAQ output.
            They are expected to perform optimally in stationary applications
            where the main source of VOCs in the environment comes from human
            activity (e.g. in a bedroom).
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
                IAQ
              </h2>
              <p className="mt-4 text-lg tracking-tighter text-cyan-200">
                The IAQ scale ranges from 0 (clean air) to 500 (heavily polluted
                air). During operation, algorithms automatically calibrate and
                adapt themselves to the typical environments where the sensor is
                operated (e.g., home, workplace, inside a car, etc.). This
                automatic background calibration ensures that users experience
                consistent IAQ performance. The calibration process considers
                the recent measurement history (typ. up to four days) to ensure
                that IAQ=50 corresponds to typical good air and IAQ=200
                indicates typical polluted air.
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
                eCO2
              </h2>
              <p className="mt-4 text-lg tracking-tighter text-cyan-900">
                The CO2 equivalent estimates a CO2-equivalent (CO2eq)
                concentration [ppm] in the environment. It is also calculated
                based on the sIAQ output and derived from VOC measurements and
                correlation from field studies.
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
                bVOC
              </h2>
              <p className="mt-4 text-lg tracking-tighter text-cyan-200">
                The breath VOC equivalent (bVOCeq) estimates the total VOC
                concentration [ppm] in the environment. It is calculated based
                on the sIAQ output and derived from lab tests.
              </p>
            </div>
          </Container>
        </div>
      </section>
    </div>
  )
}
