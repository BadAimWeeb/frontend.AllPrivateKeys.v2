export default {
    defaultServers: [
        {
            location: "https://allprivatekeys-v2-1.herokuapp.com/apksocket",
            name: "APKv2 HS1",
            mode: "socket",
            timeRestrict: {
                day: [1, 16]
            },
            weight: 1000
        },
        {
            location: "https://allprivatekeys-v2-2.herokuapp.com/apksocket",
            name: "APKv2 HS2",
            mode: "socket",
            timeRestrict: {
                day: [1, 16]
            },
            weight: 1000
        },
        {
            location: "https://allprivatekeys-v2-3.herokuapp.com/apksocket",
            name: "APKv2 HS3",
            mode: "socket",
            timeRestrict: {
                day: [17, 31]
            },
            weight: 1000
        },
        {
            location: "https://allprivatekeys-v2-4.herokuapp.com/apksocket",
            name: "APKv2 HS4",
            mode: "socket",
            timeRestrict: {
                day: [17, 31]
            },
            weight: 1000
        },
        {
            location: "https://allprivatekeys-v2-5.herokuapp.com/apksocket",
            name: "APKv2 HS5",
            mode: "socket",
            weight: 500
        },
        {
            location: "https://allprivatekeys-v2-6.herokuapp.com/apksocket",
            name: "APKv2 HS6",
            mode: "socket",
            weight: 500
        },
        {
            location: "https://allprivatekeys-v2-7.herokuapp.com/apksocket",
            name: "APKv2 HS7",
            mode: "socket",
            weight: 500
        },
        {
            location: "https://allprivatekeys-v2-8.herokuapp.com/apksocket",
            name: "APKv2 HS8",
            mode: "socket",
            weight: 500
        }
    ]
}