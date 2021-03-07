export default {
    defaultServers: [
        {
            location: "https://s1-v2.allprivatekeys.org/apksocket",
            name: "APKv2 Server 1",
            mode: "socket"
        },
        {
            location: "https://s2-v2.allprivatekeys.org/apksocket",
            name: "APKv2 Server 2",
            mode: "socket"
        },
        {
            location: "http://localhost:3000/apksocket",
            name: "Default local server",
            mode: "auto"
        }
    ]
}