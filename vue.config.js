const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    host: '0.0.0.0',   // Permet d'accepter les connexions depuis n'importe quel appareil sur le réseau local
    port: 8081,         // Assure-toi que le serveur écoute sur le port 8081
    allowedHosts: 'all', // Accepte toutes les connexions depuis le réseau
  }
};
