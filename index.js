const express=require('express')
const cors=require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app=express();

const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.px2gaoj.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

        const productCollection= client.db('E-trade').collection('products')

        app.get('/products', async(req,res)=>
        {
            const query={}
            const cursor= productCollection.find(query)
            const products = await cursor.toArray();
            const count=await productCollection.estimatedDocumentCount()
            res.send({count,products})
        })

  } 
  
  finally {
    


  }
}
run().catch(console.dir);




app.get('/',(req,res)=>
{
    res.send('server running')
})

app.listen(port,()=>
{
    console.log(`port running ${port}`)
})
