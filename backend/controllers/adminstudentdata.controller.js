const studentprofileModel = require('../models/studentprofileModel');
const Admin = require('../models/admin.model');

const adminstudentdata = async (req, res) => {
    try {
        const { college_name } = req.body;

        if (!college_name) {
            return res.status(400).json({ error: 'College name is missing in the request body' });
        }

        let data = await studentprofileModel.find({ college_name });

        // Sort first based on marksofssc in descending order
        data.sort((a, b) => b.marksofssc - a.marksofssc);

        // Then sort based on marksofhsc in descending order
        data.sort((a, b) => b.marksofhsc - a.marksofhsc);

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserById = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await Admin.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    adminstudentdata,
    getUserById,
};
