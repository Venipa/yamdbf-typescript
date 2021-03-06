const path = require("path");
const glob = require("glob");
const webpackNodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");
const { spawn, spawnSync, exec } = require("child_process");
const { kill } = require("process");
const os = require("os");

module.exports = {
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  target: "node",
  externals: [webpackNodeExternals()],
  entry: {
    app: "./src/app.ts",
    ...glob
      .sync("./src/**/*.ts", {
        ignore: ["./src/**/*.test.ts", "./src/**/*.d.ts"],
      })
      .reduce((acc, file) => {
        acc[
          file.replace(/^\.\/src\/(.*?)\.ts$/, (_, filename) => filename)
        ] = file;
        return acc;
      }, {}),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  watchOptions: {
    aggregateTimeout: 200,
    poll: 2000,
    ignored: "**/node_modules",
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    concatenateModules: false, // set this to false
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./src/locales", to: "locales" }],
    }),
    {
      apply: (() => {
        let runner;
        const killDiscordRunner = () =>
          os.platform() === "win32"
            ? exec("taskkill /pid " + runner.pid + " /T /F")
            : runner.kill("SIGINT");
        process.on("SIGINT", () => runner?.pid && killDiscordRunner());
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
};
