const { model, Schema } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailReg = /^\S+@\S+\.\S+$/;
// const dateRegexp = /^\d{2}-d{2}-\d{4}/;
const genderList = ['woman', 'man'];

const userSchema = new Schema(
	{
		password: {
			type: String,
			required: [true, 'Set password for user'],
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
		},
		token: {
			type: String,
			default: '',
		},
		avatarURL: {
			type: String,
			// required: true,
		},
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			required: [true, 'Verify token is required'],
		},
		userName: {
			type: String,
			default: '',
		},
		gender: {
			type: String,
			enum: genderList,
			// required: true,
		},
        weight: {
            type: Number,
			default: 0,
        },
        activityTime: {
            type: Number,
			default: 0,
        },
        willDrink: {
            type: Number,
			default: 0,
        },
		dailyNorma: {
			type: Number,
			default: 0,
		},
		outdatedPassword: {
			type: String,
			// required: [true, 'Set outdated password for user'],
		},
		newPassword: {
			type: String,
			// required: [true, 'Set new password for user'],
		},
		repeatedNewPassword: {
			type: String,
			// required: [true, 'Repeat new password for user'],
		},
	},
	{ versionKey: false }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
	email: Joi.string().pattern(emailReg).required(),
	password: Joi.string().min(8).max(64).required(),
});
const emailSchema = Joi.object({
	email: Joi.string().pattern(emailReg).required(),
});
const loginSchema = Joi.object({
	email: Joi.string().pattern(emailReg).required(),
	password: Joi.string().min(8).max(64).required(),
});

const updateUserSchema = Joi.object({
	avatarURL: Joi.string(),
	gender: Joi.string().valid(...genderList),
	userName: Joi.string(),
	email: Joi.string().pattern(emailReg),
	outdatedPassword: Joi.string().min(8).max(64),
	newPassword: Joi.string().min(8).max(64),
});

const updateDailyNormaDataSchema = Joi.object({
	dailyNorma: Joi.number().required(),
    gender: Joi.string().valid(...genderList),
    weight: Joi.number().required(),
    activityTime: Joi.number().required(),
    willDrink: Joi.number().required(),
});

const schemas = {
	registerSchema,
	loginSchema,
	emailSchema,
	updateUserSchema,
	updateDailyNormaDataSchema,
};

const User = model('user', userSchema);

module.exports = { User, schemas };