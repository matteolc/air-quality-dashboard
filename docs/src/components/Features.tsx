import Image from 'next/image'
import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import dashboardCurImage from '@/images/dashboard-cur.png'
import dashboardHstImage from '@/images/dashboard-hst.png'
import stationImage from '@/images/station.png'

const people = [
  {
    name: 'Min',
    description: 'The minimum value (shown in green)',
  },
  {
    name: 'Max',
    description: 'The maximum value (shown in red)',
  },
  {
    name: 'Avg',
    description: 'The average value',
  },
  {
    name: 'P95',
    description:
      '95% of the time your the value is below this number, and the other 5% of the time it exceeds that number.',
  },
  {
    name: 'P90',
    description:
      '90% of the time your the value is below this number, and the other 10% of the time it exceeds that number.',
  },
  {
    name: 'P75',
    description:
      '75% of the time your the value is below this number, and the other 25% of the time it exceeds that number.',
  },
  {
    name: 'P50',
    description:
      '50% of the time your the value is below this number, and the other 50% of the time it exceeds that number.',
  },
  // More people...
]

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="scroll-mt-12 py-12"
    >
      <Container>
        <SectionHeading number="2" id="features-title">
          Features
        </SectionHeading>
        <p className="mt-8 font-display text-4xl font-bold tracking-tight text-slate-900">
          Real-time updates and historical data by day, week, month and year.
        </p>
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          You may provision one or more stations. The dashboard shows an
          onboarding screen when there are no stations provisioned. When the
          first station is provisioned, confetti rains down and a button linking
          to the new station dashboard appears. The dashboard shows monitored
          values received in real-time by the station.
        </p>
        <div className="py-8">
          <Image
            className="inset-0 h-full w-full rounded-xl shadow-sm shadow-cyan-900"
            src={dashboardCurImage}
            alt=""
            sizes="(min-width: 1024px) 18rem, (min-width: 768px) 16rem, 11rem"
          />
        </div>
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          You can also browse historical data by day, week, month and year. See
          table below for a detail of the statitisics shown in the historical
          data.
        </p>
        <div className="py-8">
          <Image
            className="inset-0 h-full w-full rounded-xl shadow-sm shadow-cyan-900"
            src={dashboardHstImage}
            alt=""
            sizes="(min-width: 1024px) 18rem, (min-width: 768px) 16rem, 11rem"
          />
        </div>
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          There is a station navigator that you can use to cycle through
          existing stations and to do maintenance on a station. The maintenance
          page allows you to truncate each data readings up to the last month or
          to delete the station.
        </p>

        <div className="py-8">
          <Image
            className="inset-0 h-full w-full rounded-xl shadow-sm shadow-cyan-900"
            src={stationImage}
            alt=""
            sizes="(min-width: 1024px) 18rem, (min-width: 768px) 16rem, 11rem"
          />
        </div>
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          Everytime a new station is provisioned confetti rains down and the
          provisioned stations counter will update accordingly.
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
