// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/adminDashboard.css"; // Anpassa denna CSS-fil efter behov

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ email: '', username: '', password: '', role: 'user' });
    const [editUserId, setEditUserId] = useState(null);
    const [editUserData, setEditUserData] = useState({ email: '', username: '', role: 'user' });

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchUsers();
    }, []);

    // Hämta alla användare
    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:4002/admin/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data.users);
        } catch (err) {
            console.error('Error fetching users:', err);
            alert('Kunde inte hämta användare.');
        }
    };

    // Skapa ny användare
    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4002/admin/users', newUser, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers([...users, res.data.user]);
            setNewUser({ email: '', username: '', password: '', role: 'user' });
            alert('Användare skapad framgångsrikt.');
        } catch (err) {
            console.error('Error creating user:', err);
            alert('Kunde inte skapa användare.');
        }
    };

    // Ta bort användare
    const handleDeleteUser = async (id) => {
        if (!window.confirm('Är du säker på att du vill ta bort denna användare?')) return;
        try {
            await axios.delete(`http://localhost:4002/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(user => user._id !== id));
            alert('Användare borttagen framgångsrikt.');
        } catch (err) {
            console.error('Error deleting user:', err);
            alert('Kunde inte ta bort användare.');
        }
    };

    // Starta redigering
    const handleEditClick = (user) => {
        setEditUserId(user._id);
        setEditUserData({ email: user.email, username: user.username, role: user.role });
    };

    // Avbryt redigering
    const handleCancelEdit = () => {
        setEditUserId(null);
        setEditUserData({ email: '', username: '', role: 'user' });
    };

    // Spara redigerad användare
    const handleSaveEdit = async (id) => {
        try {
            const res = await axios.put(`http://localhost:4002/admin/users/${id}`, editUserData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.map(user => user._id === id ? res.data.user : user));
            setEditUserId(null);
            setEditUserData({ email: '', username: '', role: 'user' });
            alert('Användare uppdaterad framgångsrikt.');
        } catch (err) {
            console.error('Error updating user:', err);
            alert('Kunde inte uppdatera användare.');
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            {/* Användarhantering */}
            <section className="user-management">
                <form onSubmit={handleCreateUser}>
                    <h3>Skapa Ny Användare</h3>
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Användarnamn"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Lösenord"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        required
                    />
                    <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit">Skapa Användare</button>
                </form>

                <h3 className='titel'>Existerande Användare</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Användarnamn</th>
                            <th>Roll</th>
                            <th>Åtgärder</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>
                                    {editUserId === user._id ? (
                                        <input
                                            type="email"
                                            value={editUserData.email}
                                            onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </td>
                                <td>
                                    {editUserId === user._id ? (
                                        <input
                                            type="text"
                                            value={editUserData.username}
                                            onChange={(e) => setEditUserData({ ...editUserData, username: e.target.value })}
                                        />
                                    ) : (
                                        user.username
                                    )}
                                </td>
                                <td>
                                    {editUserId === user._id ? (
                                        <select
                                            value={editUserData.role}
                                            onChange={(e) => setEditUserData({ ...editUserData, role: e.target.value })}
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    ) : (
                                        user.role
                                    )}
                                </td>
                                <td>
                                    {editUserId === user._id ? (
                                        <>
                                            <button onClick={() => handleSaveEdit(user._id)}>Spara</button>
                                            <button onClick={handleCancelEdit}>Avbryt</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditClick(user)}>Edit</button>
                                            <button onClick={() => handleDeleteUser(user._id)}>Ta bort</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );

};

export default AdminDashboard;
