const mdq = require('mongo-date-query'),
    cron = require('node-cron-tz')

const CronSettings = {
    scheduled: true,
    timezone: 'Pacific/Auckland'
}

cron.schedule('0 0 * * *', async () => {
  // Perform Task Here
}, CronSettings)