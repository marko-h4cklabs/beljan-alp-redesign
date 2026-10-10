import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ["_inventory/**", "scripts/**"],
  },
];

export default eslintConfig;
