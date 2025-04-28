const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/task/:id', async (req, res) => {
  try {
    const response = await axios.get(
      `https://app.asana.com/api/1.0/tasks/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ASANA_TOKEN}`,
        },
      }
    );
    res.json(response.data.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
