export default {
    defaultServers: [
        {
            location: "https://allprivatekeys-v2-1.herokuapp.com/apksocket",
            name: "APKv2 Heroku Server 1",
            mode: "socket",
            timeRestrict: {
                day: [1, 16]
            },
            weight: 1000
        },
        {
            location: "https://allprivatekeys-v2-2.herokuapp.com/apksocket",
            name: "APKv2 Heroku Server 2",
            mode: "socket",
            timeRestrict: {
                day: [1, 16]
            },
            weight: 1000
        },
        {
            location: "https://allprivatekeys-v2-3.herokuapp.com/apksocket",
            name: "APKv2 Heroku Server 3",
            mode: "socket",
            timeRestrict: {
                day: [17, 31]
            },
            weight: 1000
        },
        {
            location: "https://allprivatekeys-v2-4.herokuapp.com/apksocket",
            name: "APKv2 Heroku Server 4",
            mode: "socket",
            timeRestrict: {
                day: [17, 31]
            },
            weight: 1000
        },
        {
            location: "https://allprivatekeys-v2-5.herokuapp.com/apksocket",
            name: "APKv2 Heroku Server 5",
            mode: "socket",
            weight: 500
        },
        {
            location: "https://allprivatekeys-v2-6.herokuapp.com/apksocket",
            name: "APKv2 Heroku Server 6",
            mode: "socket",
            weight: 500
        },
        {
            location: "https://allprivatekeys-v2-7.herokuapp.com/apksocket",
            name: "APKv2 Heroku Server 7",
            mode: "socket",
            weight: 500
        },
        {
            location: "https://allprivatekeys-v2-8.herokuapp.com/apksocket",
            name: "APKv2 Heroku Server 8",
            mode: "socket",
            weight: 500
        }
    ]
}