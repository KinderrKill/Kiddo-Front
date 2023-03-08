import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import * as gqlQueryRequest from '../../../../graphql/query/users.query';

// Import asset
import { FaStepBackward } from 'react-icons/fa';
import { UsersIcon } from '@heroicons/react/outline';

export default function User() {
  const returnArrowPath = '/administration';

  const [users, setUsers] = useState([]);

  useQuery(gqlQueryRequest.GET_ALL, {
    onCompleted: (data) => {
      setUsers(data.users);
    },
    onError: (err) => console.log(JSON.stringify(err, null, 4)),
  });

  return (
    <div className='flex'>
      <div className='admin-container'>
        <h2 className='flex items-center self-start my-5 ml-5 text-2xl'>
          <Link to={returnArrowPath}>
            <FaStepBackward className='transition-all cursor-pointer select-none hover:text-fuchsia-600' />
          </Link>
          | Gestion des utilisateurs ({users.length})
        </h2>
        <article className='section_tab'>
          <span>|</span>
          <span>Consultation</span>
          <span>|</span>
        </article>

        <article className='flex-col mt-10'>
          <table className='table'>
            <thead className='bg-gray-50'>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Crée le</th>
                <th>Consulter</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {users.map((user, index) => (
                <tr key={index} className='text-center whitespace-nowrap'>
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.created_at).toLocaleString().replace(' ', ' à ')}</td>
                  <td className='px-6 py-4'>
                    <Link to={`/administration/users/${user._id}`} className='table-show-btn'>
                      Consulter
                    </Link>
                  </td>
                  <td className='px-6 py-4'>
                    <Link to='/administration/users' className='table-delete-btn'>
                      Supprimer
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </div>
    </div>
  );
}
