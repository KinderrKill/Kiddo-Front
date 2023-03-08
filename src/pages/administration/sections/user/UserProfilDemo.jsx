import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useState } from 'react';
import { MODIFY_USER_INFO } from '../../../../graphql/mutation/users.mutation';
import { GET_ALL } from '../../../../graphql/query/users.query';

function UserProfilDemo() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();

  useQuery(GET_ALL, {
    onCompleted: (data) => setUsers(data.users),
    onError: (err) => setError(err.message),
  });

  const [modifyUser, { loading: loadingModifyUser, data: dataModifyUser, error: errorModifyUser }] = useMutation(MODIFY_USER_INFO);

  const [modifiedUser, setModifiedUser] = useState();
  const [inputErrors, setInputErrors] = useState([]);

  const id = '';

  function handleInputChange(key, event) {
    // setState synchronized on last modified state
    setModifiedUser((prevModifiedUser) => ({ ...prevModifiedUser, [key]: event.currentTarget.value }));
  }

  function tryModifyUser() {
    let tempErrors = [];

    if (modifiedUser.pseudo && modifiedUser.pseudo.length <= 2) tempErrors.push('Le pseudonyme doit faire au moins 3 caractères !');

    if (inputErrors.length > 0) setInputErrors(tempErrors);
    else {
      modifiedUser({
        variables: {
          _id: id,
          input: { modifiedUser },
        },
      });
    }
  }

  useEffect(() => {
    if (errorModifyUser) setError(errorModifyUser.message);
    else if (dataModifyUser) {
      setUsers(dataModifyUser.modifiedUser);
      setModifiedUser();
      setInputErrors([]);
      setError([]);
    }
  }, [dataModifyUser, errorModifyUser]);

  return (
    <>
      <section>
        {error ? (
          <p>{error}</p>
        ) : (
          <div>
            <h2 onChange={(event) => handleInputChange('pseudo', event)}>Liste des Utilisteurs : {users.length}</h2>
          </div>
        )}
      </section>
    </>
  );
}

export default UserProfilDemo;
