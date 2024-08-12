const PORT = 8081;
const express = require('express'); // api 설정
const cors = require('cors'); // http 통신을 위한 cors 설정
const database = require('./services/database'); // database 설정 (.env 설정)

const app = express();
app.use(cors()); // cors
app.use(express.json()); // json 파싱

app.get('/', (req, res) => {
  // request 보낼 시 response 받아서 실행
  res.send('Hello World');
});

// db에 api를 통해 내용을 가져옴 database.pool query (select * from visitors)
app.get('/visitors', async (req, res) => {
  try {
    const result = await database.pool.query('SELECT * FROM visitors');
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/revenue', async (req, res) => {
  try {
    const result = await database.pool.query('SELECT * FROM revenue');
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/sales_map', async (req, res) => {
  try {
    const result = await database.pool.query('SELECT * FROM sales_map');
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/volume_services', async (req, res) => {
  try {
    const result = await database.pool.query('SELECT * FROM volume_services');
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`)); // 서버 실행 (npm start dev => package.json)
