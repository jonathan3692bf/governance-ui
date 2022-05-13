import React, { useEffect, useState } from 'react'

import loading1 from '/img/realms-web/icons/loading1.png'
import loading2 from '/img/realms-web/icons/loading2.png'
import loading3 from '/img/realms-web/icons/loading3.png'

const loadingImages = [loading1, loading2, loading3]

export default function BtnWithLoader() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex === loadingImages.length - 1) {
        setCurrentIndex(0)
      } else {
        setCurrentIndex(currentIndex + 1)
      }
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <img src={loadingImages[currentIndex]} />
    </div>
  )
}
