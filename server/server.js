import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import blogRouter from './routes/blog.route.js'
import cors from 'cors'
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app=express();
let PORT=process.env.PORT || 8080;

async function main(){
   await mongoose.connect(process.env.MONGO)
}

main()
.then((res)=>{
    console.log(`connected to db`)
})
.catch((err)=>console.log(err))

app.listen(PORT,()=>{
    console.log(`Server is working on port ${PORT}`);
})

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:process.env.FE_UEL,
    credentials:true
}))
app.use(morgan('dev'))
app.use(cookieParser())

//Routes
app.use("/api/auth" , authRouter)
app.use("/api/user" , userRouter)
app.use("/api/blog" , blogRouter)

app.use(errorMiddleware)


//wrong routes
app.all('*',(req,res)=>{
    res.status(404).json({
        success:false,
        message:"Route not found"
    })
})