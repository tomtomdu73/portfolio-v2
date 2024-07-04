import Image from 'next/image'

const getRandomImage = (num, exclude) => {
  let randomNum
  do {
    randomNum = Math.floor(Math.random() * num) + 1
  } while (exclude.includes(randomNum))
  return `url(img/${randomNum}.jpg)`
}

const generateRows = (numRows, numItems, numImages) => {
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
                blurDataURL={`/img/blur.jpg`}
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

const rows = generateRows(5, 7, 20)

const BackgroundImages = () => {
  return rows
}

export default BackgroundImages
