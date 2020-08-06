import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const providers = [
  Providers.GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }),
];

const callbacks = {};

const options = {
  providers,
  callbacks,
  debug: true,
  secret: "ifiwasacatiwouldbenamedtom",
};

export default (req, res) => NextAuth(req, res, options);
