const userHooks = {
    getUserData: async token => {
        return await fetch(`http://localhost:8000/api/users`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .catch(err => err)
    },
    deleteUser: async (token,data) => {
        return await fetch(`http://localhost:8000/api/users`,{
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .catch(err => err)
    },
    updateUser: async (token,data) => {
        return await fetch(`http://localhost:8000/api/users`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .catch(err => err)
    },
    createNewUser: async data => {
        return await fetch(`http://localhost:8000/api/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(res => res.json())
        .catch(err => err)
    },
    authenticateUser: async formData => {
        return await fetch(`http://localhost:8000/api/users/login`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(res => res.json())
        .catch(err => err)
    }
}

export default userHooks