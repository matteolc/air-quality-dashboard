import { Author } from '@/components/Author'
import { Calibration } from '@/components/Calibration'
import { SourceCode } from '@/components/SourceCode'
import { Introduction } from '@/components/Introduction'
import { Weather } from '@/components/Weather'
import { AirQuality } from '@/components/AirQuality'
import { Features } from '@/components/Features'
import { Hardware } from '@/components/Hardware'

export default function Home() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2">
      <div>
        <Introduction />
        <Hardware />
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
