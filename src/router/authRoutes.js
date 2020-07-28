import express from 'express'
import passport from '../auth/passport.js'
import User from '../mongoose/models/User.js'

const router = express.Router()
router.use(passport.initialize())
router.use(passport.session())

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) res.send({err, info})
        else {
            req.login(user, (err) => {
                console.log(err)
            })
            res.send({ok:true})
        }
    })(req, res, next)
})

router.post('/register', async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if (user) throw new Error("User already exists")
        else {
            const hash = await User.hashPassword(password)
            const newUser = new User({email, password: hash})
            await newUser.save()
            req.login(newUser, (err) => {
                console.log(err)
            })
            res.send({ok:true})
        }
    } catch(err) {
        res.send({err: err.message})
    }
})

router.post('/logout', (req, res) => {
    req.logout()
    res.clearCookie("connect.sid")
    res.send({auth: req.isAuthenticated()})
})

export default router