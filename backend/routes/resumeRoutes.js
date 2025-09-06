import express from "express"
import {protect} from "../middlewares/authMiddleware.js"
import {createResume, deleteResume, getResumeById, getUserResume, updateResum} from "../controllers/resumeController.js"
import { uploadResumeImage } from "../controllers/uploadImages.js";

const resumeRouter=express.Router();


resumeRouter.post("/",protect,createResume);
resumeRouter.get("/",protect,getUserResume);
resumeRouter.get("/:id",protect,getResumeById);
resumeRouter.put("/:id",protect,updateResum);
resumeRouter.put("/:id/upload-images",protect,uploadResumeImage);

resumeRouter.delete("/:id",protect,deleteResume);


export default resumeRouter;