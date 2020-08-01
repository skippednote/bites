const Airtable = require("airtable");
const { AIRTABLE_KEY } = process.env;

export default async (_req, res) => {
  try {
    const base = new Airtable({ apiKey: AIRTABLE_KEY }).base(
      "appIBLFgF6dD2yNyl"
    );
    const records = await base("Store")
      .select({
        sort: [
          {
            field: "Created On",
            direction: "desc",
          },
        ],
      })
      .all();
    const r = records.map((r) => {
      return {
        id: r.id,
        name: r.get("Name"),
        url: r.get("URL"),
        created_on: r.get("Created On"),
      };
    });

    res.statusCode = 200;
    res.json(r);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.json({ e });
  }
};
