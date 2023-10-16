import React, { useState, useEffect } from 'react';

import UserInput from './components/users/UserInput';
import Courseusers from './components/users/Courseusers';
import ErrorAlert from './components/UI/ErrorAlert';

function App() {
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost/users');

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message || 'Fetching the users failed.');
        }

        setLoadedUsers(resData.users);
      } catch (err) {
        setError(
          err.message ||
            'Fetching users failed - the server responsed with an error.'
        );
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  async function addUserHandler(userText) {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost/users', {
        method: 'POST',
        body: JSON.stringify({
          text: userText,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Adding the user failed.');
      }

      setLoadedUsers((prevusers) => {
        const updatedUsers = [
          {
            id: resData.user.id,
            text: userText,
          },
          ...prevusers,
        ];
        return updatedUsers;
      });
    } catch (err) {
      setError(
        err.message ||
          'Adding a user failed - the server responsed with an error.'
      );
    }
    setIsLoading(false);
  }

  async function deleteUserHandler(userId) {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost/users/' + userId, {
        method: 'DELETE',
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Deleting the user failed.');
      }

      setLoadedUsers((prevusers) => {
        const updatedUsers = prevusers.filter((user) => user.id !== userId);
        return updatedUsers;
      });
    } catch (err) {
      setError(
        err.message ||
          'Deleting the user failed - the server responsed with an error.'
      );
    }
    setIsLoading(false);
  }

  return (
    <div>
      {error && <ErrorAlert errorText={error} />}
      <userInput onAddUser={addUserHandler} />
      {!isLoading && (
        <CourseUsers users={loadedUsers} onDeleteUser={deleteUserHandler} />
      )}
    </div>
  );
}

export default App;
