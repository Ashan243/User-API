

module.exports.postData = (id) => {

    return {name: "Juewell", email: "j123@hotmail.com", id: id}
}

module.exports.deleteData = (id) =>{

    if (!id) throw new Error("No id found")

    return {id: id, timeStamp: new Date().getTime()} 
}