import { NextApiRequest, NextApiResponse } from "next";
import Airtable from "airtable";
import slug from "slug";
import { S3 } from "aws-sdk";
const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AIRTABLE_KEY } = process.env;

const s3 = new S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});
const base = new Airtable({ apiKey: AIRTABLE_KEY }).base("appIBLFgF6dD2yNyl");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data, name, user } = req.body;
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
      User: JSON.stringify(user),
    });

    res.statusCode = 200;
    res.json({ Location });
  } catch (e) {
    res.statusCode = 500;
    res.json({ e });
  }
};
