"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const host_route_1 = require("../modules/host/host.route");
const property_route_1 = require("../modules/property/property.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/host",
        route: host_route_1.HostRoutes
    },
    {
        path: "/property",
        route: property_route_1.PropertyRoute
    }
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
