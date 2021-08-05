const withImages = require("next-images");
const withFonts = require("next-fonts");
const { withExpo } = require("@expo/next-adapter");
//const withTM = require("next-transpile-modules")(
//["react-native", "react-native-web"],
//  { unstable_webpack5: true }
//);

module.exports = withExpo(
  // withTM(
  // withFonts(
  //  withImages(
  {
    projectRoot: __dirname,
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
  }
  // )
  //)
  //)
);
