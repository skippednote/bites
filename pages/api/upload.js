const Airtable = require("airtable");
const slug = require("slug");
const { S3 } = require("aws-sdk");
const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AIRTABLE_KEY } = process.env;

const s3 = new S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});
const base = new Airtable({ apiKey: AIRTABLE_KEY }).base("appIBLFgF6dD2yNyl");

export default async (req, res) => {
  try {
    const { data, name } = req.body;
    const [, sliced] = data.split(",");
    const buffer = Buffer.from(sliced, "base64");
    const { Location } = await s3
      .upload({
        Bucket: "sound-bites",
        Key: `${slug(name)}-${Date.now()}.webm`,
        Body: buffer,
        ACL: "public-read",
      })
      .promise();

    await base("Store").create({
      Name: name,
      URL: Location,
      "Created On": new Date().toISOString(),
    });

    res.statusCode = 200;
    res.json({ Location });
  } catch (e) {
    res.statusCode = 500;
    res.json({ e });
  }
};
