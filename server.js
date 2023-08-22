const express = require('express')
const app = express();
const cors = require('cors');
app.use(express.json());
require('dotenv').config(); //it is neccessary to get the env variables from .env
const dbConfig = require("./config/dbConfig");
app.use(cors());

const port = process.env.PORT || 5000;

const usersRoute = require("./routes/userRoutes") 
app.use("/api/users", usersRoute);

const firmsRoute = require("./routes/firmRoutes") 
app.use("/api/firms", firmsRoute);

const supplierRoute = require("./routes/supplierRoute") 
app.use("/api/suppliers", supplierRoute);

const rawmaterialRoute = require("./routes/rawMaterialRoute") 
app.use("/api/rawmaterial", rawmaterialRoute);

const TypeRoute = require("./routes/TypeRoute") 
app.use("/api/materialtype", TypeRoute);

const finishproductRoute = require("./routes/finishProductRoute") 
app.use("/api/finishproduct", finishproductRoute);

const purchaseRoute = require("./routes/purchaseRoutes") 
app.use("/api/purchases", purchaseRoute);

const processRoute = require("./routes/processRoute") 
app.use("/api/process", processRoute);


app.listen(port , ()=> console.log(`Node Js server started at ${port}`))