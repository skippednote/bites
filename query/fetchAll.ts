import Airtable from "airtable";
const { AIRTABLE_KEY } = process.env;

export async function fetchAll() {
  const base = new Airtable({ apiKey: AIRTABLE_KEY }).base("appIBLFgF6dD2yNyl");
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

  return records;
}
