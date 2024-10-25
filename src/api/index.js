import axios from 'axios';



const axiosInstance = axios.create({
  baseURL: "https://block-chain-dashboard.onrender.com/api", 
  headers: {
    Authorization: `Bearer a0d7f5679d83138359d15bdb50e43399d784ce25a902f077ba8ccd4045a8e12a624fb1e26431ef4dd74bd8a68f2f0278de68d6db0fa95f638962cfde3a3b38220d2ed51ddb828b2d9f970eebe70037f3dfc6081a71898a6af7f715bebff5c6da919e403e0284cdf981bdda71a7c12ee69ea2c6e29c6fc1a25df82e2ab34308b1`,
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:1337/api/auth/local', {
            identifier: username,
            password: password,
        });
        const { jwt, user } = response.data;

        // Store the token and user in localStorage
        localStorage.setItem('token', jwt);
        localStorage.setItem('user', JSON.stringify(user));

        return { token: jwt, user };
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        throw error;
    }
};

export const loginClient = async (username, password) => {
    try {
        const response = await axiosInstance.get(`/clients?filters[username][$eq]=${username}`);
        const client = response.data.data[0]; // Assuming you get an array of clients

        console.log("client", client);
        
        if (!client) {
            throw new Error('Client not found');
        }

        // Optionally, verify password if you are storing hashed passwords, otherwise skip this
        if (client.password !== password) {
            throw new Error('Invalid credentials');
        }

        // Store client data in localStorage
        localStorage.setItem('user', JSON.stringify(client));
        
        return client;
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        throw error;
    }
};


export const registerUser = async (fullName, username, phone, password) => {
    try {
        const response = await axios.post('http://localhost:1337/api/auth/local/register', {
            username,
            email: `${username}@example.com`, // Modify this depending on your app requirements
            password,
            phone,
            fullName,
        });
        const { jwt, user } = response.data;

        // Store the token and user in localStorage
        localStorage.setItem('token', jwt);
        localStorage.setItem('user', JSON.stringify(user));

        return { token: jwt, user };
    } catch (error) {
        console.error('Registration failed:', error.response?.data || error.message);
        throw error;
    }
};

export const registerClient = async (fullName, username, phone, password, country) => {
    try {
        const response = await axiosInstance.post('/clients', {
            data: {
                username,
                phoneNumber: phone,
                password,
                fullname: fullName,
                country
            },
        });

        const client = response.data.data;

        localStorage.setItem('user', JSON.stringify(client));

        return client;
    } catch (error) {
        console.error('Registration failed:', error.response?.data || error.message);
        throw error;
    }
};


export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    console.log("Client in localStorage:", user);
    return user !== null;
};

export const fetchUserEarnings = async (userId) => {
    console.log("userId", userId);
    try {
        const response = await axiosInstance.get(`/earnings?filters[client][username][$eq]=${userId}&populate=client`);
        return response.data;
    } catch (error) {
        console.error('Error fetching earnings:', error.response?.data || error.message);
        throw error;
    }
};
