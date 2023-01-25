const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('employees.json')
const routes = require('./routes.json')
const customRoutes = require('./routes')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.rewriter(routes))
server.use(customRoutes)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})