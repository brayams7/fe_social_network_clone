import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { stylesReactSelect } from "../../utilsFuntions/utilsForm";
import PreviewImage from "../PreviewImage/PreviewImage";

const options = [
  { value: "Solter@", label: "Solter@" },
  { value: "Casad@", label: "Casad@" },
  { value: "Novi@", label: "Novi@" },
  { value: "No disponible", label: "No disponible" },
];

const optionsTabs = [
  {
    value: "profileImage",
    label: "Perfil",
    component: (getValue) => <PreviewImage getValue={getValue}/>,
  },
  {
    value: "coverImage",
    label: "Portada",
    component: () => <h1>hola guapo</h1>,
  },
];

const animatedComponents = makeAnimated();

/**
 * 
 * @param {*} param0 
 * @returns
 * 
 * Agregar un todo list para agregar los lugares donde trabaja el usuario:
 * guiarse:
 *  https://github.com/apni-coding/Todo-List-Using-React/blob/main/src/Component/TodoList.js
 *  https://apni-coding.github.io/Todo-List-Using-React/
 */

const ProfileModal = ({ userProfile,isViewModal }) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [tabSelect, setTabSelect] = useState(optionsTabs[0])
  const [selectValuesRelationShips, setSelectValuesRelationShips] = useState([])
  const [selectValuesWorks, setselectValuesWorks] = useState([])

  const mapTypesRelationShips = (list=[])=>{
    const listOptionsUser = []
    list.forEach(item=>{
      const encontrado = options.find(i=>i.value === item)
      encontrado && listOptionsUser.push(encontrado)
    })
    return listOptionsUser
  }

  useEffect(() => {
    console.log({userProfile})
    setValue('firstName', userProfile.firstName)
    setValue('lastName', userProfile.lastName)
    setValue('username', userProfile.username)
    setValue('username', userProfile.username)
    setSelectValuesRelationShips(mapTypesRelationShips([userProfile.detailProfile.relationShip]))
    // setValue('livesIn', userProfile.detailProfile.livesIn)

    // setValue('relationShip', optionsTabs)

  }, [userProfile, setValue, isViewModal])
  
  const getValue = (value) => {
    console.log({ value });
  };

  const onSubmit = async (data) =>{
    console.log(data)
  }
  return (
    <div>
      {/* <button
                className="btn btn-primary"
                data-bs-target="#modalEditProfile"
                data-bs-toggle="modal"
            >
                Open first modal
            </button> */}
      <div
        className="modal fade"
        id="modalEditProfile"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4">
            <div className="modal-body">
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <form className="form_auth" onSubmit={handleSubmit(onSubmit)}>
                <h3>Tu información</h3>
                <div className="mb-2">
                  <div className="align-self-start">
                    <input
                      {...register("firstName", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                      })}
                      type="text"
                      className="form-control custom_input"
                      id="firstName"
                      name="firstName"
                      placeholder="primer nombre"
                    />
                    {errors?.firstName && (
                      <p className="custom_error_message">
                        {errors?.firstName?.message}
                      </p>
                    )}
                  </div>
                  <div className="align-self-start">
                    <input
                      {...register("lastName", {
                        required: {
                          value: true,
                          message: "Debe agregar un apellido",
                        },
                      })}
                      type="text"
                      className="form-control custom_input"
                      id="lastName"
                      name="lastName"
                      placeholder="sergundo nombre"
                    />
                    {errors?.lastName && (
                      <p className="custom_error_message">
                        {errors?.lastName?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-2 flex-column gap-0">
                  <input
                    {...register("username", {
                      required: {
                        value: true,
                        message: "Agrega un nombre de usuario",
                      },
                    })}
                    type="text"
                    className="form-control custom_input"
                    id="username"
                    name="username"
                    placeholder="Usuario"
                  />
                  {errors?.username && (
                    <p className="custom_error_message">
                      {errors?.username?.message}
                    </p>
                  )}
                </div>
                <div className="mb-2">
                  <div className="align-self-start">
                    <input
                      {...register("livesIn", {
                        required: false,
                      })}
                      type="text"
                      className="form-control custom_input"
                      id="livesIn"
                      name="livesIn"
                      placeholder="¿Dónde vives?"
                    />
                  </div>
                  {/* <div className="align-self-start">
                    <input
                      {...register("country", {
                        required: false,
                      })}
                      type="text"
                      className="form-control custom_input"
                      id="country"
                      name="country"
                      placeholder="Pais"
                    />
                  </div> */}
                </div>

                <div className="mb-2">
                  <Controller
                    name="relationShip"
                    control={control}
                    defaultValue={selectValuesRelationShips}
                    value={selectValuesRelationShips}
                    render={({ field }) => (
                      <Select
                        {...field}
                        
                        closeMenuOnSelect={false}
                        placeholder="Agrega tu relación"
                        noOptionsMessage={() => "No existen opciones"}
                        className="w-100"
                        isMulti
                        // components={animatedComponents}
                        options={options}
                        styles={stylesReactSelect}
                        onChange={(data)=>setSelectValuesRelationShips(data)}
                        defaultValue={selectValuesRelationShips}
                        value={selectValuesRelationShips}
                      />
                    )}

                  />
                </div>
                
                <div className="mb-2">
                  <Controller
                    name="workAt"
                    control={control}
                    defaultValue={selectValuesRelationShips}
                    value={selectValuesRelationShips}
                    render={({ field }) => (
                      <Select
                        {...field}
                        
                        closeMenuOnSelect={false}
                        placeholder="Agrega tu relación"
                        noOptionsMessage={() => "No existen opciones"}
                        className="w-100"
                        isMulti
                        // components={animatedComponents}
                        options={options}
                        styles={stylesReactSelect}
                        onChange={(data)=>setSelectValuesRelationShips(data)}
                        defaultValue={selectValuesRelationShips}
                        value={selectValuesRelationShips}
                      />
                    )}

                  />
                </div>

                <hr className="w-75 mx-auto my-0" />
                <div className="mb-2 flex-column">
                  <nav>
                    <div className="nav nav-tabs" style={{fontSize:13}} id="nav-tab" role="tablist">
                    {optionsTabs.map((item, id) => (
                      <button
                      key={id}
                      className={
                        tabSelect.value === item.value
                          ? "nav-link active active_tab"
                          : "nav-link"
                      }
                      onClick={()=>setTabSelect(item)}
                      id={`${item.value}-tab`}
                      data-bs-toggle="tab"
                      data-bs-target={`#${item.value}-tab-pane`}
                      // data-bs-target= "#home-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls={`${item.value}-tab-pane`}
                      // aria-controls="home-tab-pane"
                      aria-selected={
                        tabSelect.value === item.value ? "true" : "false"
                      }
                    >
                    {item.label}
                  </button>
                    ))}
                    </div>
                  </nav>
                  <div className="tab-content" id="nav-tabContent">
                    {optionsTabs.map((item, id) => (
                      <div
                        key={id}
                        className={
                          item.value === tabSelect.value
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                        }
                        // id="home-tab-pane"
                        id={`${item.value}-tab-pane`}
                        role="tabpanel"
                        aria-labelledby={`${item.value}-tab`}
                        // aria-labelledby="home-tab"
                        tabIndex="0"
                      >
                        {item.component(getValue)}
                      </div>
                    ))}

                  </div>


                  <div className="mb-2">hola mundo</div>

                  {/* <PreviewImage /> */}
                </div>

                <div className="modal-footer border-top-0">
                  <button
                    className="btn btn-light"
                    style={{ height: "2rem" }}
                    data-bs-target="#modalEditProfile"
                    data-bs-toggle="modal"
                    type="reset"
                  >
                    Atras
                  </button>
                  <button
                    className="button_util button_util_6rem"
                    type="submit"
                  >
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
