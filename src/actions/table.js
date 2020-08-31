import fetch from 'isomorphic-fetch';

//router.put('/table/updateRow',requireSignin,authMiddleware,UpdateRow);
export const Listall= token =>{
    return fetch(`http://localhost:8000/api/table/allRows`,{
        method:'GET',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}
export const CreateRow = (row,token) =>{
    return fetch(`http://localhost:8000/api/table/createRow`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(row)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

export const DeleteRow = (row,token) =>{
    return fetch(`http://localhost:8000/api/table/deleteRow`,{
        method:'DELETE',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(row)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}
export const UpdateRow= (newrow,token) =>{
    return fetch(`http://localhost:8000/api/table/updateRow`,{
        method:'PUT',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(newrow)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}