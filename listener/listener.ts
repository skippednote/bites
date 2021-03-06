import { spawn } from "child_process";
import tmi from "tmi.js";
import { BiteI } from "../components/Bites";
import { fetchAll, Fields } from "../query/fetchAll";

const { TMI_TOKEN } = process.env;

async function fetchBites() {
  try {
    const records = await fetchAll();
    const r: { [key: string]: BiteI } = records.reduce(
      (acc: { [key: string]: BiteI }, r: Airtable.Record<Fields>) => {
        if (!r.fields["Approved"]) {
          return acc;
        }
        if (r.fields["Name"]) {
          acc[r.fields["Name"]] = {
            id: r.id,
            name: r.fields["Name"],
            url: r.fields["URL"] || "",
            created_on: r.fields["Created On"] || "",
          };
        }
        return acc;
      },
      {}
    );

    return r;
  } catch (e) {
    console.log(e);
  }
}

async function main() {
  let bites = await fetchBites();
  setInterval(async () => {
    console.log("fetching sounds");
    bites = await fetchBites();
  }, 60000);

  const client = tmi.Client({
    options: {
      debug: true,
    },
    connection: {
      reconnect: true,
      secure: true,
    },
    identity: {
      username: "skipbot",
      password: TMI_TOKEN,
    },
    channels: ["skippednote"],
  });

  client.connect().catch(console.error);
  client.on("message", async (channel, tags, message, self) => {
    if (self) return;
    if (!bites) return;
    const { username } = tags;

    // !bites ls
    if (message === "!bites ls") {
      const bitesString = Object.keys(bites).join(", ");
      client.say(
        channel,
        `@${username} here are all the bites available: ${bitesString}`
      );
      return;
    }
    const match = message.match(/!bites (.+)/);

    if (match) {
      // !bites random
      if (match[1] === "random") {
        const { length } = Object.keys(bites);
        const getRandomBiteIndex = () =>
          Math.floor(Math.random() * (length - 1));
        const { url, name } = Object.values(bites)[getRandomBiteIndex()];
        client.say(channel, `@${username}: Playing a random bite: ${name}`);
        spawn("vlc", ["--intf", "dummy", url]);
        return;
      }

      // !bites [sound name]
      if (bites && bites[match[1]]) {
        client.say(channel, `@${username}: Playing the sound: ${match[1]}`);
        const { url } = bites[match[1]];
        spawn("vlc", ["--intf", "dummy", url]);
      } else {
        client.say(channel, `@${username}: Bite not found!`);
      }
    }
  });
}

main();
