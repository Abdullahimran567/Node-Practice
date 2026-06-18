
const users = []
let id = 0;
const getusers = (req ,res)=> {
    const {id} = req.params

    if(!id) {
    if(users.length == 0) {
    return    res.status(403).json({msg : "No user exists" , users : []})

    }

    res.status(200).json({msg : "All user data" , users : users})

}
else {

    let user = users.find(item=> item.id == id)

    if(!user) {
        return res.status(403).json({err : "No user found"})
    }

    res.status(200).json({msg : "User found ", user : user})

}
}

const addUser = (req ,res)=> {
    const {username  , password} = req.body;

    let user = {username : username , password : password}
    user.id = id;
    id++;



    users.push(user)


    res.status(200).json({msg : "User successfully added"})



}

const deluser = (req ,res)=> {

    const {id} = req.params;

    const user = users.find(item => item.id == id)

   
    const index = users.findIndex(item => item.username == user.username);
    if(index == -1) {
        return res.status(403).json({err : "User Not found"})
    }

    users.splice(index  , 1);

    res.status(200).json({msg : "User deleted successfully"})
}


const updateuser = (req ,res)=> {

    const {id} = req.params
    const {body} = req;

    const index=  users.findIndex(item => item.id == id)

    if(index == -1) {
        return res.status(403).json({err : "User not found"})
    }

    users[index] = {...users[index] , ...body }

    res.status(200).json({msg : "User updated Successfully"})
}



module.exports = {getusers , addUser , deluser , updateuser}