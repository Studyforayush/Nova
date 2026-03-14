import VideoModel from "../models/VideoModel.js";
import express from "express";
const router = express.Router();


router.post("/upload", async (req, res) => {

    // if (!imgUrl || !videoUrl) {
    //   res.status(400);
    //   return new Error("imgUrl & videoUrl fields are required");
    // }

    try {
        let imgUrl = req.body.imgUrl;
        let videoUrl = req.body.videoUrl
      
        let videoData = { imgUrl, videoUrl }
        let videoDataPayload = new VideoModel(videoData);
        console.log(videoDataPayload)
        await videoDataPayload.save();

        res.status(201).json({
            success: true,
            videoDataPayload
        });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
});


export default router;