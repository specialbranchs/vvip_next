module.exports = {
    apps: [
      {
        name: "test",
        script: "node_modules/next/dist/bin/next",
        args: "start",
        instances: 1,
        exec_mode: "cluster",
        autorestart: true,
        watch: false,
        vizion: false,
        max_memory_restart: "1G",
      },
    ],
  };
  