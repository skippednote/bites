import Airtable from "airtable";
const { AIRTABLE_KEY } = process.env;

export interface Fields extends Airtable.FieldSet {
  Name?: string;
  URL?: string;
  "Created On"?: string;
  User?: string;
  "Name (from User)"?: string;
  "Image (from User)"?: string;
  Approved?: string;
}

export async function fetchAll(table = "Bite") {
  const base = new Airtable({ apiKey: AIRTABLE_KEY }).base("appIBLFgF6dD2yNyl");
  const records = await (base(table) as Airtable.Table<Fields>)
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
