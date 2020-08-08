import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Airtable from "airtable";
import { fetchAll } from "../../../query/fetchAll";
const { AIRTABLE_KEY } = process.env;

const base = new Airtable({ apiKey: AIRTABLE_KEY }).base("appIBLFgF6dD2yNyl");

const providers = [
  Providers.GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }),
];

async function fetchOrCreateUser(user) {
  const records = await fetchAll("User");
  let userId;

  for (const r of records) {
    if (r.fields["Email"] === user.email) {
      userId = r.id;
      break;
    }
  }

  if (!userId) {
    console.log("creating user");
    const record = await base("User").create({
      Name: user.name,
      Image: user.image,
      Email: user.email,
    });

    userId = record.id;
  }

  return userId;
}

const callbacks = {
  signIn: async (user) => {
    console.log("SIGNGIN");
    const userId = await fetchOrCreateUser(user);
    user.userId = userId;
    return true;
  },
  jwt: async (token, user) => {
    if (user) {
      token.userId = user.userId;
    }
    return token;
  },
  session: async (session, user) => {
    session.userId = user.userId;
    return session;
  },
};

const options = {
  secret: "ifiwasacatiwouldbenamedtom",
  session: {
    jwt: true,
  },
  jwt: {},
  providers,
  callbacks,
  debug: false,
};

export default (req, res) => NextAuth(req, res, options);
