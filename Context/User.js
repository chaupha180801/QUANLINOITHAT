var userId = -1;

const setUserId = (id) => {
    userId = id;
    console.log("Set userid: " + userId);
};

const getUserId = () => {
    return userId;
};
module.exports = {
    setUserId, getUserId
};
