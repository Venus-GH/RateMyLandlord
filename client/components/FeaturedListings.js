// import React, { useState } from 'react'
// const puppeteer = require('puppeteer')

// const getApts = async () => {
//     const url = 'https://streeteasy.com/rentals'

//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()

//     await page.goto(url, {waituntil: 'networkidle2'})

//     let apts = await page.evaluate(() => {
//         const results = document.querySelectorAll('li.Home-apartmentForYou a.Title')
//         return results
//         })

//     console.log(apts)

//     await browser.close()
// };

// const apts = getApts()

// const FeaturedListings = () => {
//     const [apartments, setApts] = useState(apts)

//     return apartments.map(apt => <div>{apt.innerText}</div>)

// }

// export default FeaturedListings

// //what we need from each trending apt:
// //img url, address, price, neighborhood/borough, link
