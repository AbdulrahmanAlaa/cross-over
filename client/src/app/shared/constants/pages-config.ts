/**
 * holds all application routes that could be replaced in future with out cracking 
 * the app
 */
export let config = {
    'login': {
        'name': 'login',
        'route': '/login',
        'loadChildren': 'app/login/login.module#LoginModule'
    },
    'videos': {
        'name': 'movies',
        'route': '/movies',
        'loadChildren': 'app/video/video.module#VideoModule',
        'childs': {
            'list': {
                'name': '',
                'route': '/',
            },
            'details':{
                'name': 'details/:id',
                'route': '/details',
            }
        }
    }
};
