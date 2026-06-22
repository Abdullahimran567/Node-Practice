const fs = require('fs');
const path = require('path');


const dataPath = path.join(__dirname, '..', '..', 'data.json');

const readUsers = () => {
    if (!fs.existsSync(dataPath)) {
        const initial = { id: 0, users: [] };
        fs.writeFileSync(dataPath, JSON.stringify(initial, null, 2));
        return initial;
    }

    const raw = fs.readFileSync(dataPath, 'utf-8');

    if (!raw.trim()) {
        const initial = { id: 0, users: [] };
        fs.writeFileSync(dataPath, JSON.stringify(initial, null, 2));
        return initial;
    }

    try {
        return JSON.parse(raw);
    } catch (err) {
        
        const initial = { id: 0, users: [] };
        fs.writeFileSync(dataPath, JSON.stringify(initial, null, 2));
        return initial;
    }
};

const writeUsers = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

const getusers = (req, res) => {
    const { id } = req.params;
    const data = readUsers();

    if (!id) {
        if (data.users.length == 0) {
            return res.status(403).json({ msg: "No user exists", users: [] });
        }

        return res.status(200).json({ msg: "All user data", users: data.users });
    }
    else {
        let user = data.users.find(item => item.id == id);

        if (!user) {
            return res.status(403).json({ err: "No user found" });
        }

        return res.status(200).json({ msg: "User found ", user: user });
    }
};

const addUser = (req, res) => {
    const { username, password } = req.body;
    const data = readUsers();

    let user = { username: username, password: password };
    user.id = data.id;
    data.id++;

    data.users.push(user);
    writeUsers(data);

    res.status(200).json({ msg: "User successfully added" });
};

const deluser = (req, res) => {
    const { id } = req.params;
    const data = readUsers();

    const index = data.users.findIndex(item => item.id == id);

    if (index == -1) {
        return res.status(403).json({ err: "User Not found" });
    }

    data.users.splice(index, 1);
    writeUsers(data);

    res.status(200).json({ msg: "User deleted successfully" });
};

const updateuser = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const data = readUsers();

    const index = data.users.findIndex(item => item.id == id);

    if (index == -1) {
        return res.status(403).json({ err: "User not found" });
    }

    data.users[index] = { ...data.users[index], ...body };
    writeUsers(data);

    res.status(200).json({ msg: "User updated Successfully" });
};

module.exports = { getusers, addUser, deluser, updateuser };