import passport from 'passport'
import local from 'passport-local'
import User from '../mongoose/models/User.js'

passport.use(new local.Strategy({
    usernameField: "email",
    passwordField: "password"
}, async function(email, password, done) {
    try {
        const user = await User.findOne({email})
        if (!user || !user.verifyPassword(password)) throw new Error("User not found")
        else return done(null, user)
    } catch(err) {
        return done(err)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        if (!user) throw new Error("User not found")
        return done(null, user)
    } catch(err) {
        return done(err, false)
    }
})

export default passport
