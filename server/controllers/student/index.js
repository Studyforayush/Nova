import express from 'express'
import StudentModel from '../../models/StudentModel.js';
import CourseModel from '../../models/CourseModel.js';
import jwt from 'jsonwebtoken';
const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'codeforindia';

// import { addCourseValidation, studentRegisteration, userLoginValidations } from '../../middleware/validators/index.js';

router.post('/studentRegister', async (req, res) => {
    try {
        let { name, email, password, password2, mobileNumber, address } = req.body
        console.log(req.body)


        if (password !== password2) {
            return res.status(400).json({ error: 'password do not match!!' })
        }
        let findstudent = await StudentModel.findOne({ email })
        if (findstudent) {
            return res.status(400).json({ error: 'email already exists please login!!' })
        }

        let studentData = {
            name,
            email,
            password,
            mobileNumber,
            address,
            role: 'student',
            // cart:[]
        }
        console.log(studentData)
        let studentDetails = new StudentModel(studentData)
        await studentDetails.save()
        res.status(200).json({ success: 'student registered successfully!' })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })

    }

})
router.post('/studentLogin', async (req, res) => {
    try {
        let {
            email,
            password
        } = req.body
        let findUser = await StudentModel.findOne({ email, password })
        console.log(findUser)
        if (!findUser) {
            return res.status(404).json({ error: 'Email not found,please register' });
        }
        else {
            let payload = {
                email: req.body.email,
                role: findUser.role,
                userId: findUser._id,
                // student_id:find
                // location: location
            }
            var token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
            res.status(200).json({ success: 'student logged in successfully', token, role: findUser.role, status: true, student_id: findUser._id });
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
})

router.post('/studentUpdate', async (req, res) => {
    try {
        let id = req.query.id;
        let find = await StudentModel.findById(id);
        console.log(req.body, 'req.body')
        let updateData = req.body
        console.log(updateData, 'updateData');
        let updatedDetails = await StudentModel.updateOne({ _id: id },
            { $set: updateData })
        //   res.send(updateData); 
        console.log(updatedDetails)
        let payload = {
            userDetails: updateData
        }
        // console.log('payload',payload)
        let token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
        console.log(token)
        res.status(200).json({ success: 'student data updated successfully', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })

    }

})


router.get('/findStudent', async (req, res) => {
    try {
        let id = req.query.id;
        let find = await StudentModel.findById(id);
        if (find) {
            return res.send(find);
        } else {
            return res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })

    }

})



router.post('/addToCart', async (req, res) => {
    try {
        const { courseData } = req.body;
        console.log(courseData, 'courseData');
        let id = req.query.id;
        // console.log(id)
        let find = await StudentModel.findById(id);
        if (!find) {
            return res.status(400).json({ error: 'Student Not Found' })
        }
        console.log(find)
        //  find.courses.push(courseData);
        find.cart.push(courseData);
        await find.save()
        return res.status(200).json({ success: 'Course Added to Cart' })


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })

    }
})
export default router