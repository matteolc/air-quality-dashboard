import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'

const people = [
  {
    name: 'UNRELIABLE',
    value: '0',
    description:
      'Sensor data is unreliable, the sensor must be calibrated. Stabilization or run-in is ongoing.',
  },
  {
    name: 'LOW_ACCURACY',
    value: '1',
    description:
      'Low accuracy, sensor should be calibrated. Expose sensor once to good air (e.g. outdoor air) and bad air (e.g. box with exhaled breath) for auto-trimming.',
  },
  {
    name: 'MEDIUM_ACCURACY',
    value: '2',
    description:
      'Medium accuracy, sensor calibration may improve performance. Auto-trimming ongoing.',
  },
  {
    name: 'HIGH_ACCURACY',
    value: '3',
    description: 'High accuracy',
  },
  // More people...
]

export function Calibration() {
  return (
    <section
      id="sensor-calibration"
      aria-labelledby="sensor-calibration"
      className="scroll-mt-12 py-12"
    >
      <Container>
        <SectionHeading number="1" id="sensor-calibration-title">
          Calibration
        </SectionHeading>
        <p className="mt-8 font-display text-4xl font-bold tracking-tight text-slate-900">
          BME688 undergoes regular calibration to improve the confidence level
          of its readings.
        </p>
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          IAQ accuracy is shown in the IAQ meter on a scale from 0 to 3. IAQ
          accuracy indicator will notify the user when she/he should initiate a
          calibration process. Calibration is performed automatically in the
          background if the sensor is exposed to clean and polluted air for
          approximately 30 minutes each.
        </p>
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          Furthermore, gas sensor stabilization status, indicating initial
          stabilization status of the gas sensor element and gas sensor run-in
          status, indicating power-on stabilization status of the gas sensor
          element, are taken into account when showing real-time data.
          Stablization can be ongoing or finished.
        </p>

        <div className="px-4 sm:mx-2 sm:px-6 lg:-mx-6 lg:px-8">
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle">
                <table className="bg-cornflower-200 min-w-full divide-y divide-cyan-900 rounded-lg">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-cyan-900 sm:pl-6 lg:pl-8"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-cyan-900"
                      >
                        Value
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-cyan-900"
                      >
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-cornflower-900 divide-cornflower-800 divide-y">
                    {people.map((person) => (
                      <tr key={person.name}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold text-cyan-200 sm:pl-6 lg:pl-8">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-cyan-300">
                          {person.value}
                        </td>
                        <td className=" px-3 py-4 text-sm text-cyan-300">
                          {person.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
