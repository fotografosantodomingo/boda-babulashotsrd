import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ["out/**", ".next/**", "node_modules/**", "worker/**"],
  },
];

export default eslintConfig;
