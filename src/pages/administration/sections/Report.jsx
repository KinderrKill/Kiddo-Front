/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons';
import { GET_SIGNALED_COMMENTS } from '../../../graphql/query/extra.query';
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

export default function Signalement() {
  const returnArrowPath = '/administration';

  const [signalments, setSignalments] = useState([]);

  const { error: getSignalementError, loading: getSignalementLoading, data: getSignalmentData } = useQuery(GET_SIGNALED_COMMENTS);

  useEffect(() => {
    if (getSignalementError) console.log('getSignalementError : ', getSignalementError);

    if (getSignalmentData) {
      console.log('Set Signalments : ', getSignalmentData.getSignaledComments);
      setSignalments(getSignalmentData.getSignaledComments);
    }
  }, [getSignalementError, getSignalementLoading, getSignalmentData]);

  return (
    <div className='flex'>
      <div className='admin-container'>
        <h2 className='text-2xl self-start my-5 ml-5'>
          <Link to={returnArrowPath}>
            <FontAwesomeIcon icon={faBackwardStep} className='hover:text-fuchsia-600 transition-all cursor-pointer select-none' />
          </Link>{' '}
          | Signalements :
        </h2>

        <div className='w-full container'>
          <article className='admin-section mt-10 px-10 flex justify-center'>
            <span className='mx-2  hover:text-fuchsia-600 cursor-pointer'>Commentaires</span>
            <span className='mx-2'>|</span>
            <span className='mx-2 text-center hover:text-fuchsia-600 cursor-pointer'>Events</span>
            <span className='mx-2'>|</span>
            <span className='mx-2 text-center hover:text-fuchsia-600 cursor-pointer'>Amis</span>
          </article>

          <article className='mt-10 flex-col admin-section'>
            <span className='admin-section__title'>Commentaire(s) signalé(s) : {signalments.length}</span>
            <table className='table mt-5'>
              <thead className='bg-gray-50'>
                <tr>
                  <th>ID</th>
                  <th>Email du rédacteur</th>
                  <th>Créer le</th>
                  <th>Nombre de signalement</th>
                  <th>Consulter</th>
                </tr>
              </thead>
              <tbody className='bg-white w-full'>
                {signalments.map((report, index) => (
                  <tr key={index} className='whitespace-nowrap text-center'>
                    <td>{report._id}</td>
                    <td>{report.sender.email}</td>
                    <td>{new Date(report.created_at).toLocaleString().replace(' ', ' à ')}</td>
                    <td>{report.signalments.length}</td>
                    <td className='px-6 py-4'>
                      <Link to={`/administration/reports/${report._id}`} className='table-show-btn'>
                        Consulter
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </div>
      </div>
    </div>
  );
}
