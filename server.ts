import express from 'express';
import bodyParser from 'body-parser';
import './db';
const app = express();
import todoRoutes from './Routes/todoRoutes';

app.use('/todos', todoRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
