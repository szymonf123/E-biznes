const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.baseUrl || "https://www.saucedemo.com/"
  },
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000
})

