const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = Router();
const port = process.env.PORT || 3000;
var fs = require('fs');
app.use(bodyParser.json());
app.route('/bfhl').get((req, res) => {const operationCode =1;;res.json({ operation_code: operationCode });
  })
  .post((req, res) => {
    const { user_id, college_email, college_roll_number, numbers, alphabets } = req.body;

    // Check if the required properties exist in the request body
    if (!user_id || !college_email || !college_roll_number || !numbers || !alphabets) {
      return res.status(400).json({ error: 'Missing required fields in the request body' });
    }

    // Check if alphabets is an array
    if (!Array.isArray(alphabets)) {
      return res.status(400).json({ error: 'Alphabets must be an array' });
    }

    // Calculate the highest alphabet in the input array of alphabets
    const highest_alphabet = alphabets.reduce((max, current) => {
      return current > max ? current : max;
    }, 'A');

    // Create the response JSON
    const response = {
      status: 'Success',
      user_id,
      college_email,
      college_roll_number,
      numbers,
      alphabets,
      highest_alphabet,
    };

    res.json(response);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/api/', router);