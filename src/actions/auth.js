import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';

export const signup = user =>{
    return fetch(`http://localhost:8000/api/signup`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}
export const signin = user =>{
    return fetch(`http://localhost:8000/api/signin`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

//set cookie 
export const setCookie = (key, value)=>{
    if(process.browser){
        cookie.set(key,value,{
            expires:30
        });
    }
}
export const removeCookie = (key)=>{
    if(process.browser){
        cookie.remove(key,{
            expires:30
        });
    }
}

//get cookie 
export const getCookie = (key)=>{
    if(process.browser){
        return cookie.get(key);
    }
};
//localStorage 
export const setlocalStorage = (key,value)=>{
    if(process.browser){
        localStorage.setItem(key,JSON.stringify(value))
    }
} 
export const removelocalStorage = (key)=>{
    if(process.browser){
        localStorage.removeItem(key)
    }
} 
// autheticate user by passing data to cookie and localStorage
export const autheticate = (data,next) =>{
    setCookie('token',data.token)
    setlocalStorage('user',data.user)
    next();
}
export const isAuth =()=>{
    if(process.browser){
        const cookieChecked = getCookie('token')
        if(cookieChecked){
            if(localStorage.getItem('user')){
                console.log('hello world');
                return JSON.parse(localStorage.getItem('user'));
            }
            else{
                
                return false;
            }
        }
        else{
            console.log('no hello')
            return false
        }
    }
}

export const signout = (next) =>{
    removeCookie('token')
    removelocalStorage('user')
    next()
    return fetch(`http://localhost:8000/api/signout`,{
        method:'GET'
    })
    .then(response =>{
        console.log('Signout Successfully');
    }).catch(err =>{
        console.log(err);
    })
}