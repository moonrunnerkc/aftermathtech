module.exports = {
  apps: [{
    name: 'aftermathtech-site',
    script: 'npm',
    args: 'start',
    cwd: '/home/brad/aftermathtech-site',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 'max',
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
