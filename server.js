const hapi = require('@hapi/hapi')
const axios = require('axios')
const {Client, Pool} = require('pg')
const {ApolloServer, gql} = require('apollo-server-hapi')
const redis = require('redis')

const start = async () => {
const app = hapi.server({
    port: 4000,
    host: 'localhost'
})
await app.start()
console.log('Server had started on', app.info.uri);
// const redisClient = await redis.createClient(6379)

// redisClient.on('connect', () => {
//     console.log('Connection to Redis...')
// })

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '12345',
    database: 'postgres'
})
await client.connect()
        .then(console.log('PostreSQL connected successfully'))

const typeDefs = gql`
    type User {
        name: String,
        email: String,
        password: String
    }
    type Query {
        hello: String
        getUsers: [User]
    }
`
const resolvers = {
    Query: {
        hello: () => {
            return 'Hi'
        },
        getUsers: async () => {
            let data = await client.query('SELECT * from public.users')
            console.log(data.rows)
            return data.rows
        }
    }
}
const server = new ApolloServer({typeDefs, resolvers})
await server.applyMiddleware({app})

app.route({
    method: 'GET',
    path: '/api',
    handler: async function (request, reply) {
        // let dateren = redisClient.get('name')
        // console.log(dateren)
        return 1
    }
})
app.route({
    method: 'POST',
    path: '/api',
    handler: async function (request, reply) {
        console.log(request.payload)
        // redisClient.setex('name', 3600, request.payload.name)
        // let dateren = redisClient.get('name')
        // console.log(dateren)
        await client.query('insert into public.users values ($1, $2, $3)', [request.payload.name, request.payload.email, request.payload.password])
        return 1
    }
})
}

start()
//insert into public.users values ($1, $2, $3)', ['Slavus54', 'sddiosa@f.ru', '12sd_2']