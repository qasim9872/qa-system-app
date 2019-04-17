const pkg = require('./package')
const config = require('config')
const api_url = config.get('api_url')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic|Material+Icons',
        defer: true
      },
      {
        rel: 'stylesheet',
        href: 'https://demo.productionready.io/main.css',
        defer: true
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['~/assets/style/app.styl'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/vuetify', '@/plugins/axios', '@/plugins/vue'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/auth'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true,
    credentials: true
  },
  /*
  ** Proxy module configuration
  */
  proxy: {
    '/api/v1/': api_url
  },
  /*
  ** Auth module configuration
  */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'api/v1/auth/login',
            method: 'post',
            propertyName: 'token'
          },
          user: {
            url: 'api/v1/user',
            method: 'get',
            propertyName: ''
          },
          logout: false
        }
      }
    }
  },
  // Toast
  toast: {
    icon: 'fiber_manual_record',
    position: 'bottom-left',
    duration: 5000,
    action: {
      icon: 'clear',
      onClick: (event, toast) => {
        toast.goAway(0)
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
