const axios = require("axios");
const cors = require("cors");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3200;

// CORS: Allow all origins (safe for demo, tighten in prod)
app.use(
  cors({
    origin: "*",
  })
);

// Start server
app.listen(PORT, () => {
  const baseURL = process.env.PORT
    ? `https://dcycle-backend.onrender.com`
    : `http://localhost:${PORT}`;
  console.log(`Server running at ${baseURL}`);
});

// Gender endpoint
app.get("/api/genderize/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(`https://api.genderize.io/?name=${name}`);
    res.json(response.data);
  } catch (err) {
    console.error("Genderize API error:", err.message);
    res.status(500).json({ error: "Failed to fetch gender data" });
  }
});

// Nationality endpoint
app.get("/api/nationalize/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(
      `https://api.nationalize.io/?name=${name}`
    );
    res.json(response.data);
  } catch (err) {
    console.error("Nationalize API error:", err.message);
    res.status(500).json({ error: "Failed to fetch nationality data" });
  }
});

// Age endpoint
app.get("/api/agify/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(`https://api.agify.io/?name=${name}`);
    res.json(response.data);
  } catch (err) {
    console.error("Agify API error:", err.message);
    res.status(500).json({ error: "Failed to fetch age data" });
  }
});

// COVID historical data endpoint
app.get("/api/covid/historical", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.covidtracking.com/v2/us/daily.json`
    );
    res.json(response.data);
  } catch (err) {
    console.error("COVID API error:", err.message);
    res.status(500).json({ error: "Failed to fetch COVID data" });
  }
});
