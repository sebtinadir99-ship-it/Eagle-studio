import express from "express";
import multer from "multer";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.static("public"));

app.post("/send-photo", upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        ok: false,
        error: "No photo received"
      });
    }

    const form = new FormData();

    form.append("chat_id", process.env.CHAT_ID);

    form.append(
      "photo",
      new Blob([req.file.buffer], {
        type: req.file.mimetype
      }),
      "camera-test.jpg"
    );

    const response = await fetch(
      https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendPhoto,
      {
        method: "POST",
        body: form
      }
    );

    const result = await response.json();

    res.json(result);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      error: "Server error"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
