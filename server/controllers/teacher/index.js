import express from 'express'
const router = express.Router()
import TeacherModel from '../../models/FacultyModel.js';
import  jwt  from 'jsonwebtoken';
import CourseModel from '../../models/CourseModel.js';
const JWT_SECRET = process.env.JWT_SECRET || 'codeforindia';

router.post('/teacherRegister',async(req,res)=>{
try {
  let   { name, email, password, password2, mobileNumber, address ,description}=req.body
  if (password !== password2) {
    return res.status(400).json({ error: 'password do not match!!' })
}
let findTeacher = await TeacherModel.findOne({ email })
if(findTeacher){
    return res.status(400).json({error:'email already exists please login!!'})
}

let teacherData = {
    name,
    email,
    password,
    mobileNumber,
    address,
    description,
    role:'teacher'
}
console.log(teacherData)
let teacherDetails= new TeacherModel(teacherData)
await teacherDetails.save()
res.status(200).json({success:'teacher registered successfully!'})

} catch (error) {
    console.error(error)
    res.status(500).json({error:'Internal server error'})

}

})
router.post('/teacherLogin',async(req,res)=>{
    try {
        let {
            email,
            password
        }=req.body
        let findUser = await TeacherModel.findOne({email,password})
        console.log(findUser)
        if(!findUser){
            return res.status(404).json({error:'Email not found,please registesr'})
        }
        else{
            let payload={
                email:req.body.email,
                role:findUser.role,
                userId: findUser._id,
                // teacher_id:find
                // location: location
            }
            let token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
            res.status(200).json({ success: 'teacher logged in successfully', token ,role:findUser.role,status:true,teacher_id:findUser._id});
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({error:'Internal server error'})

    }
})

router.post('/teacherUpdate',async (req,res)=>{
   try {
    let id = req.query.id;
    let find = await TeacherModel.findById(id);
    console.log(req.body,'req.body')
    let updateData = req.body
    console.log(updateData,'updateData');
   let updatedDetails = await TeacherModel.updateOne({_id:id},
      {$set:updateData})
    //   res.send(updateData); 
      console.log(updatedDetails)
      let payload={
        userDetails:updateData
    }
    // console.log('payload',payload)
    let token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
    console.log(token)
    res.status(200).json({ success: 'teacher data updated successfully', token});

   } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal server error'})

   }

})

router.get('/findTeacher',async (req,res)=>{
    try {
     let id = req.query.id;
     let find = await TeacherModel.findById(id);
      if(find){
        return res.send(find);
      } else {
        return res.status(404).json({error: 'Teacher not found'});
      }
    } catch (error) {
     console.error(error);
     res.status(500).json({error:'Internal server error'})
 
    }
 
 })

 router.get('/mycourses',async (req,res)=>{
    try {
     let id = req.query.id;
    //  console.log(id,'id')
     let find = await CourseModel.find({teacherId:id});
      if(find){
        return res.send(find);
      } else {
        return res.status(404).json({error: 'Courses not found'});
      }
    } catch (error) {
     console.error(error);
     res.status(500).json({error:'Internal server error'})
 
    }
 
 })










router.post('/addCourse',async(req,res)=>{
    try {
        console.log('from add course')
        let {courseName,description,courseImage,courseCategory,price,addChapter,token}=req.body
        const decodedToken = jwt.verify(token, JWT_SECRET);
        console.log(decodedToken.userId)
        const teacher_id=decodedToken.userId
        let courseData = {
            courseName,
            description,
            courseImage,
            courseCategory,
            price,
            addChapter,
            teacher_id
        }
        console.log({courseName,description,courseImage,courseCategory,price,addChapter,token})
        // const token = req.headers.authorization.split(' ')[1];

        // let deCodetoken = 
        let findCourse = await CourseModel.findOne({courseName,description,courseImage,courseCategory,price,addChapter,teacher_id})
        if(findCourse){
            return res.status(400).json({error:'course already exists'})
        }else{ let courseDataDetails = new CourseModel(courseData);
            await courseDataDetails.save()
            return res.status(200).json({success:'course added successfully!!'})}
       
    } catch (error) {
        console.error(error)
       return res.status(500).json({error:'Internal server error'})
    }
})
// router.post('/addChapter',async(req,res)=>{
//     try {
//         let {chapterName,chapterVideo}=req.body
//         let 
//     } catch (error) {
        
//     }
// })
export default router