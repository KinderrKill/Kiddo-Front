import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';

import * as gqlQueryRequest from '../../../../graphql/query/users.query';
import useToggle from '../../../../hooks/useToggle';
import CustomInput from '../../../../components/administration/CustomInput';

//Assets
import { FaPhone, FaMailBulk, FaStepBackward, FaPenAlt } from 'react-icons/fa';

import profilPic from '../../../../assets/admin/blank_profil_pic.png';

export default function UserProfil() {
  const returnArrowPath = '/administration/users';

  const [user, setUser] = useState();
  const [error, setError] = useState();

  const [modifiedPanel, toggleModifiedPanel] = useToggle(false);

  const { id } = useParams();

  useQuery(gqlQueryRequest.GET_BY_ID, {
    variables: { id },
    onCompleted: (data) => setUser(data.getUserById),
    onError: (err) => setError(err.message),
  });

  console.log(user);

  return (
    <div className='flex'>
      <div className='admin-container'>
        <h2 className='self-start my-5 ml-5 text-2xl'>
          <Link to={returnArrowPath}>
            <FaStepBackward className='transition-all cursor-pointer select-none hover:text-fuchsia-600' />
          </Link>{' '}
          | Utilisateur
        </h2>

        <section className='flex self-start ml-10'>
          <img src={profilPic} alt='' className='w-40 bg-fuchsia-300' />
          <article className='flex flex-col justify-center ml-4'>
            <span className='mb-3 text-xl font-bold'>
              Jean-Michel Dupont
              {/* <FaPenAlt className='text-sm text-gray-500' />
              <span className='ml-2 text-sm transition-all cursor-pointer select-none hover:text-fuchsia-600' onClick={toggleModifiedPanel}>
                {modifiedPanel ? 'Modifier' : 'Consulter'}
              </span> */}
            </span>
            <div className='mb-3'>
              <span className='mr-3 flex'>
                <FaMailBulk className='mr-2 text-fuchsia-600' />
                test10@gmail.com
              </span>
              <span className='flex'>
                <FaPhone className='mr-2 text-fuchsia-600' />
                02.35.01.02.03
              </span>
            </div>
            <span className='text-gray-500'>10 Cours de la République 76600 Le Havre</span>
          </article>
        </section>

        {modifiedPanel ? <ProfilInfo /> : <ProfilModifier />}
      </div>
    </div>
  );
}

function ProfilInfo() {
  return (
    <section className='grid w-full grid-cols-3 gap-4 px-10 mt-5'>
      <article className='col-span-2 admin-section'>
        <span className='admin-section__title'>Activités récentes...</span>
        <div className='mt-5'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, suscipit perferendis, explicabo quae architecto dignissimos modi delectus
            at, quidem fuga amet ad quibusdam magnam exercitationem culpa sit odit assumenda. Itaque.
          </p>
        </div>
      </article>
      <article className='admin-section'>
        <span className='admin-section__title'>Catégories : </span>
        <div className='mt-5'>
          <ul>
            <li>Événements</li>
            <li>Commentaires</li>
            <li>Signalements</li>
          </ul>
        </div>
      </article>
    </section>
  );
}

function ProfilModifier() {
  const [inputValue, setInputValue] = useState();
  console.log(inputValue);

  return (
    <section className='grid w-full grid-cols-2 gap-4 px-10 mt-5'>
      <article className='admin-section'>
        <span className='admin-section__title'>Modification du profil</span>

        <CustomInput label='JM76' setState={setInputValue} customWidth='w-[30rem]' />
        <div className='flex'>
          <CustomInput label='Jean-Michel' setState={setInputValue} />
          <CustomInput label='Dupont' setState={setInputValue} />
        </div>

        <div className='flex'>
          <CustomInput label='Homme' setState={setInputValue} />
          <CustomInput label='Développeur' setState={setInputValue} />
        </div>

        <div className='flex'>
          <CustomInput label='test10@gmail.com' setState={setInputValue} />
          <CustomInput label='02.35.01.02.03' setState={setInputValue} />
        </div>

        <CustomInput label='10 Cours de la République 76600 Le Havre' setState={setInputValue} customWidth='w-[30rem]' />

        <button className='mt-10 table-edit-btn'>Modifier</button>
        <button className='mt-10 ml-3 table-delete-btn'>Supprimer le profil</button>
      </article>

      <article className='flex flex-col items-start admin-section'>
        <span className='admin-section__title'>Modification des enfants</span>

        <table className='table mt-10'>
          <thead className='bg-gray-50'>
            <tr>
              <th>ID</th>
              <th>Prénom</th>
              <th>Âge</th>
              <th>Modifier</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            <tr className='whitespace-nowrap'>
              <td>0</td>
              <td>Jean-Michel Junior</td>
              <td>2 ans</td>
              <td className='px-6 py-4'>
                <Link to='/administration/users' className='table-edit-btn'>
                  Modifier
                </Link>
              </td>
              <td className='px-6 py-4'>
                <Link to='/administration/users' className='table-delete-btn'>
                  Supprimer
                </Link>
              </td>
            </tr>
          </tbody>
        </table>

        <button className='mt-10 table-edit-btn'>Enregistrer</button>
      </article>
    </section>
  );
}
