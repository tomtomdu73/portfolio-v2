import Image from 'next/image'
import { useEffect, useState } from 'react'

const getRandomImage = (num, exclude) => {
  let randomNum
  do {
    randomNum = Math.floor(Math.random() * num) + 1
  } while (exclude.includes(randomNum))
  return `url(img/${randomNum}.jpg)`
}

export const generateRows = (numRows, numItems, numImages) => {
  let previousRowImages = []

  return Array.from({ length: numRows }, (item, index) => {
    let currentRowImages = []

    for (let i = 0; i < numItems; i++) {
      const image = getRandomImage(numImages, [...previousRowImages, ...currentRowImages])
      currentRowImages.push(parseInt(image.match(/\d+/)[0], 10))
    }

    previousRowImages = currentRowImages

    return (
      <div className="row" key={index}>
        {currentRowImages.map((imageNum, index) => (
          <div className="row__item" key={index}>
            <div className="row__item-inner">
              <Image
                width={1400}
                height={1100}
                src={`/img/${imageNum}.jpg`}
                alt="image"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAI0lEQVR4nGNIqp9/7u3/C+//H3n8n0HLJTGvex2TaTSDkCkAzhoM7i3oidcAAAAASUVORK5CYII="
                className="row__item-img grayscale"
                priority
              />
              {/* <div
                className="row__item-img grayscale"
                style={{ backgroundImage: `url(img/${imageNum}.jpg)` }}
              ></div> */}
            </div>
          </div>
        ))}
      </div>
    )
  })
}
