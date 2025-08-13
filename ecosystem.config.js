module.exports = {
  apps: [{
    name: 'book-lighthouse',
    script: 'npm',
    args: 'run serve',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'production',
      HOST: '0.0.0.0'
    }
  }]
}