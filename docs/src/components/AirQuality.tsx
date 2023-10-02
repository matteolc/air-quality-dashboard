import Image from 'next/image'
import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import iaqImage from '@/images/iaq.png'
import bvocImage from '@/images/bvoc.png'
import eco2Image from '@/images/eco2.png'

export function AirQuality() {
  return (
    <div className="py-12">
      <section
        id="screencasts"
        aria-labelledby="screencasts-title"
        className="scroll-mt-12 py-12"
      >
        <Container>
          <SectionHeading number="3" id="screencasts-title">
            Air Quality
          </SectionHeading>
          <p className="mt-8 font-display text-4xl font-bold tracking-tight text-slate-900">
            Air Quality indicators measured by the BME688 gas sensor.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Data collected by the BME688 sensor is fed to the BSEC algorithm
            on-board the device to extract air quality measures. The BSEC
            library provides two different air quality outputs: IAQ and static
            IAQ (sIAQ). The IAQ output is optimized for mobile applications,
            whereas the sIAQ output is optimized for stationary applications.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            The BSEC library also provides breath VOC and CO2 equivalents based
            on the static IAQ output. They are expected to perform optimally in
            stationary applications where the main source of VOCs in the
            environment comes from human activity (e.g. in a bedroom).
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
            <div>
              <Image className="ml-6 w-60 rounded-2xl" src={iaqImage} alt="" />

              <ul className="ml-6 mt-8 flex flex-wrap gap-2 text-lg font-bold tracking-tight text-slate-700">
                <li className="">
                  <span className="h-4 w-4 rounded-full bg-green-400 px-3 py-2">
                    0-50
                  </span>
                </li>
                <li className="mb-4">
                  <span className="h-4 w-4 rounded-full bg-yellow-400 px-3 py-2">
                    51-100
                  </span>
                </li>
                <li className="mb-4">
                  <span className="h-4 w-4 rounded-full bg-orange-600 px-3 py-2 text-white">
                    101-150
                  </span>
                </li>
                <li className="mb-4">
                  <span className="h-4 w-4 animate-pulse rounded-full bg-red-600 px-3 py-2 text-white">
                    151-200
                  </span>
                </li>
                <li className="mb-4">
                  <span className="h-4 w-4 animate-pulse rounded-full bg-purple-700 px-3 py-2 text-white">
                    201-300
                  </span>
                </li>
                <li className="mb-4">
                  <span className="h-4 w-4 animate-pulse rounded-full bg-amber-900 px-3 py-2 text-white">
                    301-500
                  </span>
                </li>
              </ul>
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
            className="relative grid grid-cols-2 items-center gap-y-12 py-8 lg:static"
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
            <div>
              <Image className="ml-6 w-60 rounded-2xl" src={eco2Image} alt="" />

              <ul className="ml-6 mt-8 flex flex-wrap gap-2 text-lg font-bold tracking-tight text-slate-700">
                <li className="">
                  <span className="h-4 w-4 rounded-full bg-green-400 px-3 py-2">
                    0-899
                  </span>
                </li>
                <li className="mb-4">
                  <span className="h-4 w-4 rounded-full bg-yellow-400 px-3 py-2">
                    899-1099
                  </span>
                </li>
                <li className="mb-4">
                  <span className="h-4 w-4 rounded-full bg-orange-600 px-3 py-2 text-white">
                    1099-1499
                  </span>
                </li>
                <li className="mb-4">
                  <span className="h-4 w-4 animate-pulse rounded-full bg-red-600 px-3 py-2 text-white">
                    1499-1999
                  </span>
                </li>
                <li className="mb-4">
                  <span className="h-4 w-4 animate-pulse rounded-full bg-purple-700 px-3 py-2 text-white">
                    1999-2999
                  </span>
                </li>
                <li className="mb-4">
                  <span className="h-4 w-4 animate-pulse rounded-full bg-amber-900 px-3 py-2 text-white">
                    2999-4999
                  </span>
                </li>
              </ul>
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
            className="relative grid grid-cols-2 items-center gap-y-12 py-8 lg:static"
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
            <div>
              <Image
                className=" ml-6 w-60 rounded-2xl"
                src={bvocImage}
                alt=""
              />

              <ul className="ml-6 mt-8 flex flex-wrap gap-2 text-lg font-bold tracking-tight text-slate-700">
                <li className="">
                  <span className="h-4 w-4 rounded-full bg-green-400 px-3 py-2">
                    0-0.9
                  </span>
                </li>
                <li className="mb-4">
                  <span className="h-4 w-4 rounded-full bg-yellow-400 px-3 py-2">
                    0.9-1
                  </span>
                </li>
                <li className="mb-4">
                  <span className="h-4 w-4 rounded-full bg-orange-600 px-3 py-2 text-white">
                    1-5
                  </span>
                </li>
                <li className="mb-4">
                  <span className="h-4 w-4 animate-pulse rounded-full bg-red-600 px-3 py-2 text-white">
                    5-15
                  </span>
                </li>
                <li className="mb-4">
                  <span className="h-4 w-4 animate-pulse rounded-full bg-purple-700 px-3 py-2 text-white">
                    30-40
                  </span>
                </li>
                <li className="mb-4">
                  <span className="h-4 w-4 animate-pulse rounded-full bg-amber-900 px-3 py-2 text-white">
                    40-50
                  </span>
                </li>
              </ul>
            </div>
          </Container>
        </div>
      </section>
    </div>
  )
}
