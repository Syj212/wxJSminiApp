const options = {
    swaggerDefinition: {
        info: {
            title: 'miniapp',
            version: '1.0.0',
            description: `接口api`
        },
        host: `localhost:80`,
        basePath: '/',
        produces: ['application/json', 'application/xml'],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: ''
            }
        }
    },
    route: {
        url: '/swagger',//打开swagger文档页面地址
        docs: '/swagger.json' //swagger文件 api
    },
    basedir: __dirname, //app absolute path

    files: [  //在那个文件夹下面收集注释
        '../../routes/api/private/*.js',
        '../../routes/api/public/*.js'
    ]
}

module.exports = options
