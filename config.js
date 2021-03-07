export default {
    defaultServers: [
        {
            location: "https://allprivatekeys-v2-1.herokuapp.com/apksocket",
            name: "APKv2 Heroku Server 1",
            mode: "socket"
        },
        {
            location: "https://allprivatekeys-v2-2.herokuapp.com/apksocket",
            name: "APKv2 Heroku Server 2",
            mode: "socket"
        },
        {
            location: "http://localhost:3000/apksocket",
            name: "Default local server",
            mode: "auto"
        }
    ]
}