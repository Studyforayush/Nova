import { AssemblyAI } from 'assemblyai'
import express from 'express';
import CourseModel from '../../models/CourseModel.js';
import Stripe  from 'stripe';
import StudentModel from '../../models/StudentModel.js';

const router = express.Router();



router.post('/createCourse',async (req,res)=>{
   try {
    let {courseTitle,courseDescription,coursePrice,courseImage,courseCategory,teacherId,teacherName} = req.body
    console.log(req.body)
    let courseData = {
        courseTitle,
        courseDescription,
        coursePrice,
        courseImage,
        courseCategory,
        teacherId,
        teacherName
    }
    let courseDetails = new CourseModel(courseData);
    let response = await courseDetails.save()
    console.log(response)
    let id = response._id

    return res.status(200).json({success:'course created successfully!',id})
   } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' });

   }
})

router.get('/getCourse', async (req,res)=>{
   try {
    let {courseIdValue} = req.query;
    let find = await CourseModel.findOne({_id:courseIdValue});
    console.log(find);
    return res.send(find);
   } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
    
   }

})

router.get('/fetchCourse', async (req,res)=>{
   try {
    let id = req.query.id;
    let find = await CourseModel.findOne({_id:id});
    console.log(find);
    return res.send(find);
   } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
    
   }

})

 router.get('/getAllCourses', async (req,res)=>{
   try {
    let find = await CourseModel.find();
   //  console.log(find);
    return res.send(find);
   } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
    
   }

})

router.post('/updateCourse', async (req,res)=>{
   try {
   let courseId = req.query.id;
   let find = await CourseModel.findById(courseId);
   if(!find){
      return res.status(400).json({ error: 'course not found' });
   }
   let updateData = req.body
   let updatedCourse = await CourseModel.updateOne({_id:courseId},
      {$set:updateData})
      return res.send(updatedCourse);
   } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
   }

})


const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

router.post('/create-checkout-session',async (req,res)=>{
   try {
      const {products} = req.body;
      const lineItems = [{
         price_data:{
            currency:'inr',
            product_data:{
               name:products.courseTitle,
               description:products.courseDescription,
               images:[products.courseImage],
            },
            unit_amount:Math.round(products.coursePrice*100),
         },
         quantity:1,
      }]
      
      const session = await stripe.checkout.sessions.create({
         payment_method_types:['card'],
         line_items:lineItems,
         mode:'payment',
         success_url:`http://127.0.0.1:5173/layout/${products._id}/${0}`,
         cancel_url:'http://127.0.0.1:5173/cancel'

      })
      // console.log(session)
      return res.send(session)

   } catch (error) {
      console.error(error)
      return res.status(500).json({ error: error });
   }
})

router.post('/coursePurchaseSuccess',async (req,res)=>{
     
})

router.get('/transcription', async (req,res)=>{
   try {
      const client = new AssemblyAI({
        apiKey: process.env.ASSEMBLY_AI_API_KEY || "99624ecb550d4588855a75686d4fd726"
      })
      
      const audioUrl =
        'https://res.cloudinary.com/drgqcwxq6/video/upload/v1702463386/videos/l68zsoqgf9zhv0rj5pps.mp4' 
      const params = {
        audio: audioUrl,
        summarization: true,
        summary_model: 'conversational',
        summary_type: 'bullets_verbose',
        speaker_labels:true,
      //   dual_channel:true
      }
      
      const run = async () => {
        const transcript = await client.transcripts.transcribe(params)
      
        let transcribedText = transcript.summary
      res.status(200).json({success:'video transcribed',transcribedText});
      }
      
       await run()
       
      
      
   } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
    
   }

})



export default router;
