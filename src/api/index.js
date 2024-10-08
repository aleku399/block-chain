// Mock API for login (replace this with actual API when available)
export const loginUser = async (username, password) => {
    // Simulate a token response
    console.log("password", password, username);
    const token = 'mock-jwt-token';
    const user = { username };

    // Normally you'd call your API like this:
    // const response = await axios.post('/api/login', { username, password });
    // const { token, user } = response.data;

    // Simulating successful login
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { token, user };
};

// Mock API for register (replace this with actual API when available)
export const registerUser = async (fullName, username, phone, password) => {
    console.log("phone", phone);
    console.log("password", password);
    const token = 'mock-jwt-token';
    const user = { username, fullName };

    // Simulate registration
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { token, user };
};

// Logout user
export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

// Check if user is authenticated
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    console.log("Token in localStorage:", token); 
    return token !== null;
};

