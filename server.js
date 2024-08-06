const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// mengatur izin (permissions) untuk sumber daya (resources) Anda.
const rules = auth.rewriter({
    users: 600  // hanya user yg telah terautentikasi yang dapat mengakses sumber daya ini 
})

server.db = router.db

server.use(rules)
server.use(auth)
server.use(middlewares)
server.use(router)

server.listen(3000, () => {
    console.log('json server is running on port 3000')
})


