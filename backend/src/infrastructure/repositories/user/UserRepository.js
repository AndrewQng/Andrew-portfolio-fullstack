const mongoose = require('mongoose');
const UserModel = require('../../database/models/UserModel');
const UserMapper = require('../../mappers/UserMapper');

class UserRepository {
    async findAll() {
        const docs = await UserModel.find().sort({ createdAt: -1 }).lean().exec();
        return docs.map((d) => UserMapper.toEntity(d));
    }

    async findFirst() {
        const doc = await UserModel.findOne().lean().exec();
        return UserMapper.toEntity(doc);
    }

    async findById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const doc = await UserModel.findById(id).lean().exec();
        return UserMapper.toEntity(doc);
    }

    async findByUsername(username) {
        const doc = await UserModel.findOne({ username }).lean().exec();
        return UserMapper.toEntity(doc);
    }

    async create(entity) {
        try {
            const doc = await UserModel.create(UserMapper.toDatabase(entity));
            return UserMapper.toEntity(doc);
        } catch (e) {
            if (e && e.code === 11000)
                throw new Error('Username is already taken');
            throw e;
        }
    }

    async update(id, entity) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;
        const doc = await UserModel.findById(id).exec();
        if (!doc) return null;
        try {
            Object.assign(doc, UserMapper.toDatabase(entity));
            await doc.save();
            return UserMapper.toEntity(doc);
        } catch (e) {
            if (e && e.code === 11000)
                throw new Error('Username is already taken');
            throw e;
        }
    }

    async deleteById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return false;
        const deleted = await UserModel.findByIdAndDelete(id).exec();
        return !!deleted;
    }
}

module.exports = UserRepository;
