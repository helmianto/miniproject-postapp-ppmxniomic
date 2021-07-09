import Delete from './Delete';
import Get from './Get';
import Post from './Post';
import Put from './Put';

//POST
const postData = (data) => Post('posts', false, data);

//PUT
const updateData = (data, id) => Put('posts/'+ id, false, data);

// GET
const getData = () => Get('posts?_sort=id&_order=desc', false);

// DELETE
const deleteData = (id) => Delete('posts/'+ id, false);

const API = {
    postData,
    updateData,
    getData,
    deleteData
}

export default API;

