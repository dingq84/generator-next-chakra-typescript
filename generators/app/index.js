"use strict";
const Generator = require("yeoman-generator");
// Const chalk = require("chalk");
// const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.templateDir = "frontend";
    const prompts = [
      {
        type: "input",
        name: "appName",
        message: "Application name",
        default: "frontend-project-generated-by-yeoman"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const { appName } = this.props;
    this.fs.copy(
      this.templatePath(this.templateDir + "/"),
      this.destinationPath(`${appName}/`),
      {
        globOptions: { dot: true }
      }
    );

    this.fs.copyTpl(
      this.templatePath(this.templateDir + "/package.json"),
      this.destinationPath(`${appName}/package.json`),
      {
        name: appName.replace(/\s+/g, "-")
      }
    );

    this.fs.copyTpl(
      this.templatePath(this.templateDir + "/README.md"),
      this.destinationPath(`${appName}/README.md`),
      {
        appName
      }
    );

    // This.removeFiles();
  }

  // RemoveFiles() {
  //   const { appName } = this.props;
  //   this.fs.delete(`${appName}/package.json`);
  // }

  install() {
    const { appName } = this.props;
    this.yarnInstall(null, {}, { cwd: `${appName}/` });
  }
};
