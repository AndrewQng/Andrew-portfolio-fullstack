import useFetch from '../hooks/useFetch';

const UsersPage = () => {
    const { data: users, isLoading, error } = useFetch('/users');

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching users</div>;

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users?.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default UsersPage;