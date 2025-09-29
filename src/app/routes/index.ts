import { Router } from "express" 
import { HostRoutes } from "../modules/host/host.route"
import { PropertyRoute } from "../modules/property/property.route"
export const router = Router()

const moduleRoutes = [
    {
        path: "/host",
        route: HostRoutes
    } ,
    {
        path:"/property",
        route:PropertyRoute
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
}) 