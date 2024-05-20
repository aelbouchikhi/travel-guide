const mongoose = require('mongoose');
const { bcryptFunction } = require('../../helpers/bcrypt.helpers');
const { mailJs } = require('../../helpers/emailjs.helpers');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: false,
        trim: true, // Removes whitespace from both ends
        unique: true, // Ensures usernames are unique across documents
        sparse: true, // Ensures uniqueness is enforced only on documents where username is provided
    },
    email: {
        type: String,
        required: true,
        unique: true, // Enforces email uniqueness
        lowercase: true, // Converts email to lowercase to avoid case-sensitive uniqueness issues
        match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Validates email format
    },
    password: {
        type: String,
        required: true,
        minlength: 8, // Ensures password strength
    },
    age: {
        type: Number,
        required: false,
    },
    country: {
        type: String,
        required: false,
        trim: true,
    },
    sex: {
        type: String,
        enum: ["male", "female"],
        required: false,
    },
    phoneNumber: {
        type: String, // Changed to String to accommodate various phone number formats
        required: false,
        trim: true,
    },
    image: {
        url: {
            type: String, 
            required: false 
        },
        publicId: {
            type: String, 
            required: false
        }
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });


userSchema.post('save', async function (doc, next) {
    await mailJs.sendMail(doc.username, doc.email);
    next()
})

userSchema.pre('findOneAndUpdate', async function (next) {
    try {
        const update = this.getUpdate();
        const user = await this.model.findOne(this.getQuery());

        if (update.password) {
            const isModified = await bcryptFunction.compareHashingPass(update.password, user.password);

            if (!isModified) {
                update.password = await bcryptFunction.hashing(update.password);
            } else {
                delete update.password; // Do not update password if not modified
            }
        }

        return next();
    } catch (error) {
        next(error); // Pass the error to the next middleware/hook
    }
});

module.exports = mongoose.model('Users', userSchema);