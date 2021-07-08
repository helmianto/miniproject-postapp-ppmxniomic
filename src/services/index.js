import Delete from './Delete';
import Get from './Get';
import Post from './Post';
import Put from './Put';

//POST
const postData = (data) => Post('data-post', false, data);

//PUT
const updateData = (data, id) => Put('data-post/'+ id, false, data);

// GET
const getData = () => Get('data-post?_sort=id&_order=desc', false);

// DELETE
const deleteData = (id) => Delete('data-post/'+ id, false);

const API = {
    postData,
    updateData,
    getData,
    deleteData
}

export default API;

