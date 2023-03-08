/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuthContext from '../../../hooks/useAuthContext';
import Button from '../../../components/shared/Button';
import { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_BY_ID } from '../../../graphql/query/users.query';
import { MODIFY_USER_INFO } from '../../../graphql/mutation/users.mutation';
import PhoneInput from 'react-phone-number-input';

import './user-info.css';
import { CATEGORIES } from '../../../utils/constants/categoryList';
import Etiquette from '../../../components/shared/Etiquette';

// children pics
import childProfil from '../../../assets/images/blank_child_profil.svg';
import boyProfil from '../../../assets/images/profil_male_child.svg';
import girlProfil from '../../../assets/images/profil_female_child.svg';

import { FaTimesCircle } from 'react-icons/fa';

export default function UserInfoV2() {
  const navigate = useNavigate();
  const authContext = useAuthContext();

  // User object
  const [user, setUser] = useState(userObjectModel());
  const [modifiedUser, setModifiedUser] = useState({});

  // GQL Query / Mutation
  const [fetchUser, { loading: loadingUserData, data: dataUserData, error: errorUserData, refetch }] = useLazyQuery(GET_BY_ID);
  const [modifyUser, { loading: loadingModifyUser, data: dataModifyUser, error: errorModifyUser }] = useMutation(MODIFY_USER_INFO);

  useEffect(() => {
    // Base checking if user is still connected or connected
    if (authContext.isAuthChecked && !authContext.isAuth) {
      navigate('../');
    }

    // Fetch User data
    if (authContext._id !== '') {
      if (!loadingUserData && user.email) {
        refetch();
      } else if (!loadingUserData && !dataUserData) {
        fetchUser({ variables: { id: authContext._id } });
      }
    }

    //if (loadingUserData) console.log('loadingUserData : ', loadingUserData);
    if (errorUserData) console.log('errorUserData : ', errorUserData);
    if (dataUserData) setUser(dataUserData.getUserById);

    // Modify User data
    //if (loadingModifyUser) console.log('loadingModifyUser : ', loadingModifyUser);
    if (errorModifyUser) console.log('errorModifyUser : ', errorModifyUser);
    //if (dataModifyUser) { setModifiedUser({})}
  }, [authContext, loadingUserData, dataUserData, errorUserData, loadingModifyUser, errorModifyUser, dataModifyUser]);

  // Handle Adress input change
  function handleAdressInput(event) {
    let modifiedAdress = { [event.target.name]: event.target.value };
    if (modifiedUser.adress) modifiedAdress = { ...modifiedUser.adress, ...modifiedAdress };

    setModifiedUser({ ...modifiedUser, adress: modifiedAdress });
  }

  const DESCRIPTION_MAX_LENGTH = 500;
  const [descriptionLength, setDescriptionLength] = useState(DESCRIPTION_MAX_LENGTH);

  function handleDescriptionInput(event) {
    setModifiedUser({ ...modifiedUser, description: event.target.value });
    setDescriptionLength(DESCRIPTION_MAX_LENGTH - event.target.value.length);
  }

  // Handle Children input change
  function addChildren() {
    setUser({ ...user, children: [...user.children, {}] });
  }

  function removeChildren(index) {
    let actualChildrens = [...user.children];
    actualChildrens.splice(index, 1);

    setUser({ ...user, children: actualChildrens });
  }

  function handleChildrenInput(event, index, key) {
    let children = [...user.children];

    children[index] = { ...children[index], [key]: event.currentTarget.value };

    setUser({ ...user, children });
    console.log('USER ', children);
  }

  function getChildProfilPic(gender) {
    return gender === 'boy' ? boyProfil : gender === 'girl' ? girlProfil : childProfil;
  }

  //--------------------------------------------------------------------------------------------------------------------------
  // Modify user data
  function saveUserModification() {
    let userChildren = [...user.children];
    const finalChildren = userChildren.filter((v) => v.name != null);

    if (finalChildren.length > 0 || modifiedUser) {
      modifyUser({
        variables: {
          id: authContext._id,
          input: { ...modifiedUser, children: finalChildren },
        },
      });
    }
  }

  //   DEBUG
  /*useEffect(() => {
    console.log('ModifiedUser ', modifiedUser);
  }, [modifiedUser]);*/
  //   DEBUG

  // Dashboard Roots
  const roots = [
    {
      title: 'Acceuil',
      path: '../',
      isSelected: false,
    },
    {
      title: 'Profil',
      path: './userV2',
      isSelected: true,
    },
    {
      title: 'Mon tableau de bord',
      path: '../dashboard',
      isSelected: false,
    },
  ];

  const handleRootClick = (isSelected, path) => {
    if (!isSelected) navigate(path);
  };

  return (
    <>
      <section className='generic-container min-h-full pt-32'>
        {/* ROOT LINK */}
        <div className='flex mb-10 text-sm'>
          {roots.map((item, index) => (
            <div className='flex' key={index}>
              <p
                onClick={() => handleRootClick(item.isSelected, item.path)}
                className={`cursor-pointer hover:underline select-none ` + (item.isSelected && 'underline font-medium cursor-default')}>
                {item.title}
              </p>
              {index < roots.length - 1 && <p className='mx-2'> {'>'} </p>}
            </div>
          ))}
        </div>

        <section className='grid grid-cols-3 mb-8'>
          <article className='flex flex-col items-center'>
            <p className='border-2 p-6 rounded-xl'>Mon compte</p>
          </article>
          {/* ALL BASIC INPUT */}
          <div className='col-span-2'>
            <article className='border-2 rounded-xl p-5 col-span-2 '>
              {/* GENDER CHECKBOX */}
              <div className='flex items-center justify-around p-5 '>
                <label className='userinfo__radio-container'>
                  Homme
                  <input
                    type='radio'
                    defaultValue='male'
                    checked={user.gender === 'male'}
                    onChange={(e) => {
                      setModifiedUser({ ...modifiedUser, gender: e.currentTarget.value });
                    }}
                  />
                  <span className='checkmark'></span>
                </label>
                <label className='userinfo__radio-container'>
                  Femme
                  <input
                    type='radio'
                    checked={user.gender === 'female'}
                    defaultValue='female'
                    onChange={(e) => {
                      setModifiedUser({ ...modifiedUser, gender: e.currentTarget.value });
                    }}
                  />
                  <span className='checkmark'></span>
                </label>
                <label className='userinfo__radio-container'>
                  Autres
                  <input
                    checked={user.gender === 'other' || user.gender === undefined || user.gender === 'Unknown'}
                    type='radio'
                    defaultValue='other'
                    onChange={(e) => {}}
                  />
                  <span className='checkmark'></span>
                </label>
              </div>
              {/* OTHER INPUT */}
              <div className='flex flex-col'>
                {/* PSEUDO */}
                <input
                  type='text'
                  placeholder='Pseudonyme'
                  defaultValue={user.pseudo || ''}
                  onChange={(e) => setModifiedUser({ ...modifiedUser, pseudo: e.currentTarget.value })}
                  className='rounded-xl mb-2 border-gray-200'
                />
                {/* FIRST NAME */}
                <input
                  type='text'
                  placeholder='Prénom'
                  defaultValue={user.first_name || ''}
                  onChange={(e) => setModifiedUser({ ...modifiedUser, first_name: e.currentTarget.value })}
                  className='rounded-xl mb-2 border-gray-200'
                />
                {/* LAST NAME */}
                <input
                  type='text'
                  placeholder='Nom de famille'
                  defaultValue={user.last_name || ''}
                  onChange={(e) => setModifiedUser({ ...modifiedUser, last_name: e.currentTarget.value })}
                  className='rounded-xl mb-2 border-gray-200'
                />
                {/* E-MAIL */}
                <input
                  type='email'
                  placeholder='Adresse-email'
                  defaultValue={user.email || ''}
                  onChange={(e) => setModifiedUser({ ...modifiedUser, email: e.currentTarget.value })}
                  className='rounded-xl mb-2 border-gray-200'
                />
                {/* PHONE INPUT */}
                <PhoneInput
                  international
                  defaultValue={user.phone || ''}
                  defaultCountry='FR'
                  placeholder='Numéro de téléphone'
                  onChange={(value) => setModifiedUser({ ...modifiedUser, phone: value || '' })}
                />
                {/* BIRTHDATE */}
                <div>
                  <label>Date de naissance : </label>
                  <input
                    type='date'
                    placeholder='Date de naissance'
                    defaultValue={user.birthdate || ''}
                    onChange={(e) => setModifiedUser({ ...modifiedUser, birthdate: e.currentTarget.value })}
                    className='rounded-xl mb-2 border-gray-200'
                  />
                </div>
                {/* ADRESS */}
                <input
                  name='adress_line'
                  type='text'
                  placeholder='Adresse'
                  defaultValue={user.adress_line || ''}
                  onChange={(e) => handleAdressInput(e)}
                  className='rounded-xl mb-2 border-gray-200'
                />
                <div>
                  <input
                    name='city'
                    type='text'
                    placeholder='Ville'
                    defaultValue={user.city || ''}
                    onChange={(e) => handleAdressInput(e)}
                    className='rounded-xl mb-2 border-gray-200 w-2/3'
                  />
                  <input
                    name='zip_code'
                    type='number'
                    placeholder='Code postale'
                    defaultValue={user.zip_code || ''}
                    onChange={(e) => handleAdressInput(e)}
                    className='rounded-xl mb-2 border-gray-200 w-1/3'
                  />
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* USER DESCRIPTION */}
        <section>
          <h2 className='flex items-center'>
            Votre présentation <p className='text-lg pl-3 pt-3'>({descriptionLength})</p>
          </h2>
          <textarea
            type='text'
            placeholder='Présentez-vous en quelques mots'
            defaultValue={user.description || ''}
            maxLength={DESCRIPTION_MAX_LENGTH}
            onChange={(e) => handleDescriptionInput(e)}
            className='rounded-xl mb-2 border-gray-200 w-full'
            rows='5'
          />
        </section>

        {/* USER PREFERENCES */}
        <section>
          <h2 className='flex items-center border-b-2'>Vos préférences d'activités</h2>
          <article className='grid grid-cols-3 gap-5 p-8'>
            {CATEGORIES.map((value, index) => {
              return <Etiquette key={index} category={value.type} name={value.name} backgroundColor={value.backgroundColor} />;
            })}
          </article>
        </section>

        {/* USER CHILDREN */}
        <section className='border-b-2'>
          <h2 className='mb-4 border-b-2 pt-10'>Mes enfants</h2>

          <div className='grid grid-cols-2 justify-around pt-4 my-4'>
            {user.children &&
              user.children.map((children, index) => (
                <article key={index} className='child-card rounded-xl flex-1 flex border p-8 ml-4 mb-4  bg-zinc-100'>
                  {user.children.length > 0 && (
                    <button className='remove-child-button' onClick={() => removeChildren(index)}>
                      <FaTimesCircle />
                    </button>
                  )}

                  <div className='rounded-full p-4 flex justify-center items-center'>
                    <img src={getChildProfilPic(children.gender)} alt='child-profil' />
                  </div>
                  <div className='pl-3'>
                    <input
                      placeholder='Prénom'
                      defaultValue={user.children[index].name}
                      onChange={(e) => handleChildrenInput(e, index, 'name', children)}
                      type='text'
                      className='rounded-xl mb-2 border-gray-200 w-full'
                    />
                    <select
                      value={user.children[index].gender}
                      onChange={(e) => handleChildrenInput(e, index, 'gender', children)}
                      className='rounded-xl mb-2 border-gray-200 w-full'>
                      <option>Précicez le genre</option>
                      <option value='boy'>Garçon</option>
                      <option value='girl'>Fille</option>
                      <option value='other'>Autre</option>
                    </select>
                    <div>
                      <label>Date de naissance : </label>
                      <input
                        type='date'
                        placeholder='Date de naissance'
                        defaultValue={user.children[index].birthdate || ''}
                        onChange={(e) => handleChildrenInput(e, index, 'age', children)}
                        className='rounded-xl mb-2 border-gray-200'
                      />
                    </div>
                  </div>
                </article>
              ))}
          </div>

          <div className='flex justify-center pt-10 pb-14'>
            <Button onClick={addChildren}>Ajouter un enfant</Button>
          </div>
        </section>

        <Button onClick={saveUserModification} className='hover:scale-105 transition-all mt-4'>
          Sauvegarder les modifications
        </Button>
      </section>
    </>
  );
}

function userObjectModel() {
  return {
    gender: null,
    first_name: null,
    last_name: null,
    pseudo: null,
    phone: null,
    email: null,
    birthdate: null,
    adress: {
      city: null,
      zip_code: null,
      adress_line: null,
      adress_line_2: null,
    },
    description: null,
    children: 0,
  };
}
