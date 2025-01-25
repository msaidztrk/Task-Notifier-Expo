// export const Routes = {
//     HOME: '/screens',
//     ABOUT: '/screens/about',
//     LOGIN : '/screens/LoginScreen',

// } as const;

export const Routes = {
    HOME: '/screens/HomeScreen',
    ABOUT: '/screens/AboutScreen',
    LOGIN: '/screens/LoginScreen'
} as const;


// Define the type for route keys
export type RouteKeys = keyof typeof Routes;

// Define the type for route values
export type RouteValues = typeof Routes[RouteKeys];