const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const { spawn, spawnSync, exec } = require("child_process");
const os = require("os");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    {
      apply: (() => {
        let runner;
        const killDiscordRunner = () =>
          os.platform() === "win32"
            ? exec("taskkill /pid " + runner.pid + " /T /F")
            : runner.kill("SIGINT");
        process.on("SIGINT", () => {
          runner?.pid && killDiscordRunner();
          process.exit();
        });
        return (compiler) => {
          compiler.hooks.afterEmit.tap("AfterEmitPlugin", (compilation) => {
            if (runner?.pid) killDiscordRunner();
            runner = spawn("node", ["dist\\app.js"], {
              detached: true,
              shell: true,
            });
          });
        };
      })(),
    },
  ],
});
