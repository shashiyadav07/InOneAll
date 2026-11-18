import express from "express";
import { MongoClient } from "mongodb";

const dbname = "school";
const url = "mongodb://localhost:27017";
import cors from "cors";

const client = new MongoClient(url);

const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());


// MongoDB connection
async function dbConnection() {

    await client.connect();

    console.log("MongoDB connected");

}

dbConnection();


// Signup API
app.post("/signup", async (req, res) => {

    try {

        console.log("Frontend se data:");
        console.log(req.body);

        const { userId, name, email, password } = req.body;

        const collection = client
            .db(dbname)
            .collection("AIclass");


        // Check user
        const check = await collection.findOne({
            email: email
        });


        if (check) {

            return res.status(400).send({
                message: "user already exists"
            });

        }


        // Insert user
        await collection.insertOne({
            userId,
            name,
            email,
            password
        });


        res.status(200).send({
            message: "user created successfully"
        });


    } catch (error) {

        console.log(error);

        res.status(500).send({
            message: "Server error"
        });

    }

});
// const products = []
app.get('/dashboard', async(req,res)=>{
    const collection = client.db(dbname).collection('content');
    const products = await collection.find({}).sort({ createdAt: -1 }).toArray();
    res.json(products);
})
app.post("/content", async (req, res) => {
    try {

        const {
            link,
            category,
            course,
            branch,
            semester,
            subject,
            description
        } = req.body;

        const collection = client
            .db(dbname)
            .collection("content");

        await collection.insertOne({
            link,
            category,
            course,
            branch,
            semester,
            subject,
            description,
            createdAt: new Date()
        });

        res.status(200).send({
            message: "Content added successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).send({
            message: "Error uploading content"
        });

    }
});
app.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;
        const check = await client.db(dbname).collection('AIclass').findOne({ email: email, password: password });
        if (check) {
            res.status(200).send({ message: "Login successful" });
        } else {
            res.status(401).send({ message: "Invalid email or password" });
        }
    }
    catch(err){
        console.log(err);
    }
})


app.listen(3000, () => {
    console.log("Server running on port 3000");
});