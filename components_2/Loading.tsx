import { FunctionComponent } from 'react'
import { useState } from 'react'

interface LoadingProps {
  className?: string
  w?: string
  h?: string
}

const Loading: FunctionComponent<LoadingProps> = ({
  className,
  w = 5,
  h = 5,
}) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="w-full flex justify-center">
      {isLoading && (
        <img></img>
        // <PhotographIcon className="absolute animate-pulse h-1/4 w-1/4 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-fgd-3 z-10" />
      )}
      <img {...props} onLoad={() => setIsLoading(false)} />
    </div>
  )
}

export default Loading
