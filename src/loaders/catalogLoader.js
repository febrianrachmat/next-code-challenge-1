import catalogData from '../data/catalog.json'

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function catalogLoader() {
  await wait(150)
  return catalogData
}
