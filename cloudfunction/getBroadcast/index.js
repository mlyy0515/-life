const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database({
  env: 'kiana-x666h',
})
exports.main = async (event, context) => {
  return db.collection('broadcast')
  .where({
    hour: event.hour,
  })
  .get()
}