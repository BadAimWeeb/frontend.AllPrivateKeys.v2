export default {
    defaultServers: [
        {
            location: "https://allprivatekeys-v2-1.herokuapp.com/apksocket",
            name: "APKv2 Heroku Server 1",
            mode: "socket"
        },
        {
            location: "https://allprivatekeys-v2-3.herokuapp.com/apksocket",
            name: "APKv2 Heroku Server 3",
            mode: "socket"
        },
        {
            location: "http://localhost:3000/apksocket",
            name: "Default local server",
            mode: "auto"
        }
    ]
}