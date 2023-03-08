/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faSunPlantWilt } from '@fortawesome/free-solid-svg-icons';
import { useLazyQuery } from '@apollo/client';
import { GET_BY_ID } from '../../../../graphql/query/comments.query';
import { useEffect } from 'react';
import { useState } from 'react';

function SignalmentPage() {
  const returnArrowPath = '/administration/reports';

  const url = window.location.href.split('/');
  const commentId = url[url.length - 1];

  const [signalment, setSignalement] = useState();

  const [fetchSignalment, { error: getSignalementError, loading: getSignalementLoading, data: getSignalmentData }] = useLazyQuery(GET_BY_ID);

  useEffect(() => {
    if (!signalment) {
      fetchSignalment({ variables: { commentId: commentId } });
    }

    if (getSignalementError) console.log('getSignalementError : ', getSignalementError);

    if (!getSignalementLoading && getSignalmentData) {
      console.log('GetSignalmentData :', getSignalmentData);
      setSignalement(getSignalmentData.comment);
    }
  }, [getSignalmentData]);

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
            <span className='admin-section__title'>Commentaire signalé : {commentId}</span>
            {getSignalmentData && signalment?.content ? (
              <>
                <p className='mt-5'>
                  Message concerné : <span className='text-red-500'>{signalment.content.message}</span>
                </p>
                <Link
                  to={`../event/${signalment.target_event._id}`}
                  className='text-blue-500 hover:text-blue-700 hover:cursor-pointer transition-all my-5'>
                  Allez au commentaire
                </Link>
                {signalment.signalments.map((signalment, index) => (
                  <p className='my-4'>
                    Signalé par {signalment.sender.first_name} le {new Date(signalment.signaled_at).toLocaleString().replace(' ', ' à ')} pour la
                    raison suivante : {signalment.signalment.name}
                  </p>
                ))}
              </>
            ) : (
              <p>{getSignalementError || 'Chargement...'}</p>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}

export default SignalmentPage;
