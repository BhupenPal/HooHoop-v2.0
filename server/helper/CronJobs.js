const mdq = require('mongo-date-query'),
  cron = require('node-cron-tz'),
  rimraf = require('rimraf'),
  { join } = require('path')

const CronSettings = {
  scheduled: true,
  timezone: 'Pacific/Auckland'
}

cron.schedule('0 3 * * *', async () => {
  // Perform Task Here
  rimraf(join('.', 'assets', 'uploads', 'cars', '*'), () => { })
}, CronSettings)