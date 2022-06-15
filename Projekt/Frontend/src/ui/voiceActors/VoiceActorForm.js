import { Field, Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { createVoiceActor,editVoiceActor } from '../../ducks/voiceActors/operations';
import { withRouter } from 'react-router';
import * as Yup from 'yup';
const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(0, 'First Name Too Short!(min:0 characters)')
      .max(50, 'First Name Too Long!(max:50 characters)')
      .required('Required'),
    lastName: Yup.string()
      .min(0, 'Last Name Too Short!(min:0 characters)')
      .max(50, 'Last Name Too Long!(max:50 characters)')
      .required('Required'),
    image: Yup.string()
      .min(0, 'Image Too Short!(min:0 characters)')
      .max(10000, 'Image Too Long!(max:10000 characters)')
      .required('Required'),
    birthDate: Yup.date().required('Required'),
    charactersVoiced:Yup.number().required('Required')
  });
const VoiceActorForm = ({history,isEditFormInsteadOfAddForm, createVoiceActor,editVoiceActor,editedVoiceActor }, props) => {

    const handleSubmit = (values) => {
        
        if(isEditFormInsteadOfAddForm===true)
        {
            console.log("Edited Object"+values)
            editVoiceActor(editedVoiceActor._id,values);
            history.push('/voiceActors')
        }
        else
        {
            console.log("Added Object"+values)
            createVoiceActor(values);
            history.push('/voiceActors')
        }
    }
    
    return (
        <div className="voiceActorAddFormDiv">
            {isEditFormInsteadOfAddForm===false&&<div>Voice Actor Add Form</div>}
            {isEditFormInsteadOfAddForm===true&&<div>Voice Actor Edit Form</div>}
            <Formik
                initialValues={isEditFormInsteadOfAddForm===true?{
                  firstName: editedVoiceActor.firstName,
                  lastName: editedVoiceActor.lastName,
                  image:editedVoiceActor.image,
                  gender:editedVoiceActor.gender,
                  birthDate:editedVoiceActor.birthDate,
                  charactersVoiced:editedVoiceActor.charactersVoiced,
                  animes:editedVoiceActor.animes,
                }:{
                  firstName: "",
                  lastName: "",
                  image:"",
                  gender:"male",
                  birthDate:"",
                  charactersVoiced:0,
                  animes:[],
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}>
                {({ errors, touched }) => (
                    <Form>
                        <div>
                        First Name: 
                        </div>
                        <div>
                        <Field name="firstName" />
                        </div>
                        {errors.firstName && touched.firstName ? (
                          <div>{errors.firstName}</div>
                        ) : null}
                        <div>
                        Last Name:
                        </div>
                        <div>
                        <Field name="lastName" />
                        </div>
                        {errors.lastName && touched.lastName ? (
                          <div>{errors.lastName}</div>
                        ) : null}
                        <div>
                        Gender:
                        </div>
                        <div>
                        <Field name="gender" as="select">
                          <option value="male">male</option>
                          <option value="female">female</option>
                        </Field>
                        </div>
                        <div>
                        ImageUrl: 
                        </div>
                        <div>
                        <Field name="image" />
                        </div>
                        {errors.image && touched.image ? (
                          <div>{errors.image}</div>
                        ) : null}
                        <div>
                        Birth Date: 
                        </div>
                        <div>
                        <Field name="birthDate" />
                        </div>
                        {errors.birthDate && touched.birthDate ? (
                          <div>{errors.birthDate}</div>
                        ) : null}
                        <div>
                        Number Of Voiced Characters: 
                        </div>
                        <div>
                        <Field name="charactersVoiced" />
                        </div>
                        {errors.charactersVoiced && touched.charactersVoiced ? (
                          <div>{errors.charactersVoiced}</div>
                        ) : null}
                        <button type="submit" className='MainButton'>
                            {isEditFormInsteadOfAddForm===false&&<div>Add New Voice Actor</div>}
                            {isEditFormInsteadOfAddForm===true&&<div>Edit This Voice Actor</div>}
                        </button>
                    </Form>
                )}
                    
                </Formik>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {};   
}

const mapDispatchToProps = ({
    createVoiceActor,
    editVoiceActor
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VoiceActorForm));