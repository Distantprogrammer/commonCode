const axios = require('axios')
const fs = require('fs').promises
const data = require('../src/assets/json/dynamic-router.json')
const path = require('path')
const isHttp = false
async function fetchData(url) {
  try {
    if (isHttp) {
      const response = await axios.get(url)
      return response.data
    }
    const data = await fs.readFile(url, 'utf8')
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

async function saveDataToFile(data, filePath) {
  try {
    if (isHttp) {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    } else {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    }
  } catch (error) {
    console.error('Error saving data to file:', error)
    throw error
  }
}

async function main() {
  let url = ''
  if (isHttp) {
    url = 'http://localhost:5173/src/assets/json/dynamic-router.json'
  } else {
    url = path.join(__dirname, '../src/App.vue')
  }
  const filePath = 'data.json'
  const data = await fetchData(url)
  await saveDataToFile(data, filePath)
}

main().catch(console.error)
