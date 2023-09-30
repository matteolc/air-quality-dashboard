import Image from 'next/image'
import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { ExternalLink } from './ExternalLink'
import batteryImage from '@/images/battery.png'

export function Hardware() {
  return (
    <>
      <section
        id="table-of-contents"
        aria-labelledby="table-of-contents-title"
        className="scroll-mt-12 py-12"
      >
        <Container>
          <SectionHeading number="1" id="table-of-contents-title">
            Hardware
          </SectionHeading>
          <p className="mt-8 font-display text-4xl font-bold tracking-tight text-slate-900">
            An ESP32 board, a NeoPixel, a LiPo charger and an I2C BME688
            breakout.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            For this project I have used{' '}
            <ExternalLink
              name="Adafruit's Feather ESP32 v2"
              href="https://www.adafruit.com/product/5400"
            />{' '}
            which already provides with an onboard NeoPixel LED and a LiPo
            charger.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            A{' '}
            <ExternalLink
              name="Pimoroni BME688 breakout"
              href="https://shop.pimoroni.com/products/bme688-breakout?variant=39336951709779"
            />{' '}
            is connected with an I2C cable to the Feather.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            The{' '}
            <ExternalLink
              name="NeoPixel LED"
              href="https://www.adafruit.com/category/168"
            />{' '}
            is used to indicate the IAQ level with a color code:
          </p>
          <ul className="mt-4 flex items-stretch gap-4 text-lg font-bold tracking-tight text-slate-700">
            <li className="">
              <span className="h-4 w-4 rounded-full bg-[#00FF00] px-3 py-2">
                0-50
              </span>
            </li>
            <li className="mb-4">
              <span className="h-4 w-4 rounded-full bg-[#FFFF00] px-3 py-2">
                51-100
              </span>
            </li>
            <li className="mb-4">
              <span className="h-4 w-4 rounded-full bg-[#FF9900] px-3 py-2">
                101-150
              </span>
            </li>
            <li className="mb-4">
              <span className="h-4 w-4 rounded-full bg-[#FF0000] px-3 py-2 text-white">
                151-200
              </span>
            </li>
            <li className="mb-4">
              <span className="h-4 w-4 rounded-full bg-[#800080] px-3 py-2 text-white">
                201-300
              </span>
            </li>
            <li className="mb-4">
              <span className="h-4 w-4 rounded-full bg-[#800000] px-3 py-2 text-white">
                301-500
              </span>
            </li>
          </ul>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            The on-board LED will light-up everytime the sensor undergoes
            calibration or warm-up.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            I suggest using a LiPo battery proving at least 2200mAh to ensure a
            decent autonomy when operating on battery. The current battery level
            is shown at the bottom right of the screen
            <Image
              className="ml-2 inline h-8 w-auto rounded-lg"
              src={batteryImage}
              alt=""
            />
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
            className="relative grid grid-cols-1 items-end gap-y-12 py-8 lg:static"
          >
            <div>
              <h2 className="font-display text-6xl font-extrabold tracking-tight text-white sm:w-3/4 md:w-3/4 lg:w-auto">
                Provisioning
              </h2>
              <p className="mt-4 text-lg tracking-tighter text-cyan-200">
                The board requires initial provisioning of Wi-Fi credentials and
                basic device information. To provision the board, power it on
                then connect to the Wi-Fi network named "Air Quality Dashboard"
                and follow the instructions on the screen.
              </p>
            </div>
          </Container>
        </div>
      </section>
    </>
  )
}
