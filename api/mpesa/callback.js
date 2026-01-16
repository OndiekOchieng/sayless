export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const result = req.body.Body.stkCallback;

    if (result.ResultCode === 0) {
      const meta = result.CallbackMetadata.Item;

      const amount = meta.find((i) => i.Name === "Amount").Value;
      const phone = meta.find((i) => i.Name === "PhoneNumber").Value;
      const receipt = meta.find((i) => i.Name === "MpesaReceiptNumber").Value;

      console.log("✅ Payment Success:", phone, amount, receipt);

      // TODO:
      // Save payment
      // Unlock Sayless feature
      // Mark user/session as paid
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Callback error" });
  }
}
