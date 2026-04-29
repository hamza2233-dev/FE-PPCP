export default async function handler(req, res) {
  const { phone, zip } = req.query;

  if (!phone || !zip) {
    return res.status(400).json({ error: "Missing phone or zip" });
  }

  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 10) {
    return res.status(400).json({ error: "Invalid phone number" });
  }

  const CID = "+1" + cleaned;

  const url = `https://rtb.ringba.com/v1/production/618e2f522f3a467791b46a25f3f33cc5.json?CID=${CID}&zipcode=${zip}&subid=yes&exposeCallerId=yes`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
