// hi disini saya akan membuat Bookshelf API

const Hapi = require('@hapi/hapi')
const routes = require('./routes')

// server
const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {}
  })
  server.route(routes)

  await server.start()
  console.log(`Server running on ${server.info.uri}`)
}
init()
