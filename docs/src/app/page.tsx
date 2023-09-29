import { Author } from '@/components/Author'
import { Calibration } from '@/components/Calibration'
import { SourceCode } from '@/components/SourceCode'
import { Introduction } from '@/components/Introduction'
import { Weather } from '@/components/Weather'
import { AirQuality } from '@/components/AirQuality'
import { Features } from '@/components/Features'

export default function Home() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2">
      <div>
        <Introduction />
        <Features />
        <AirQuality />
        <Calibration />
        <Weather />
        <SourceCode />
        <Author />
      </div>
    </div>
  )
}
