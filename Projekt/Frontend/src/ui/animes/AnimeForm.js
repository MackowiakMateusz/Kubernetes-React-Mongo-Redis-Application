import { Field, Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { createAnime,editAnime } from '../../ducks/animes/operations';
import { withRouter } from 'react-router';
import * as Yup from 'yup';
const SignupSchema = Yup.object().shape({
    title: Yup.string()
      .min(0, 'Title Too Short!(min:0 characters)')
      .max(50, 'Title Too Long!(max:50 characters)')
      .required('Required'),
    description: Yup.string()
      .min(0, 'Description Too Short!(min:0 characters)')
      .max(2500, 'Description Too Long!(max:2500 characters)')
      .required('Required'),
    director: Yup.string()
      .min(0, 'Director Too Short!(min:0 characters)')
      .max(50, 'Director Too Long!(max:50 characters)')
      .required('Required'),
    studio: Yup.string()
      .min(0, 'Studio Too Short!(min:0 characters)')
      .max(50, 'Studio Too Long!(max:50 characters)')
      .required('Required'),
    image: Yup.string()
      .min(0, 'Image Too Short!(min:0 characters)')
      .max(10000, 'Image Too Long!(max:10000 characters)')
      .required('Required'),
    rating: Yup.number()
      .min(0, 'Rating must be above or equal to 0!')
      .max(10, 'Rating must be below or equal to 10!')
      .required('Required'),
    releaseDate: Yup.date().required('Required')
  });
const AnimeForm = ({ createAnime,editAnime,isEditFormInsteadOfAddForm, editedAnime,history }, props) => {

    const handleSubmit = (values) => {
        if(isEditFormInsteadOfAddForm===true)
        {
            console.log("Edited Object"+values)
            editAnime(editedAnime._id,values);
            history.push('/animes')
        }
        else
        {
            console.log("Added Object"+values)
            createAnime(values);
            history.push('/animes')
        }
    }
    return (
        <div className="animeAddFormDiv">
            {isEditFormInsteadOfAddForm===false&&<div>Anime Add Form</div>}
            {isEditFormInsteadOfAddForm===true&&<div>Anime Edit Form</div>}
            <Formik
                initialValues={isEditFormInsteadOfAddForm===true?{
                  title:editedAnime.title,
                description:editedAnime.description,
                  director:editedAnime.director,
                  studio:editedAnime.studio,
                  image:editedAnime.image,
                  rating:editedAnime.rating,
                  releaseDate:editedAnime.releaseDate,
                  genre:editedAnime.genre,
                voiceActors:editedAnime.voiceActors,
              }:{
                title:"",
                description:"",
                director:"",
                studio:"",
                image:"",
                rating:0,
                releaseDate:"",
                genre:"romance",
              voiceActors:[],
            }}
                validationSchema={SignupSchema}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}>
                {({ errors, touched }) => (
                    <Form>
                        <div>
                        Title:
                        </div>
                        <div>
                        <Field name="title" />
                        </div>
                        {errors.title && touched.title ? (
                          <div>{errors.title}</div>
                        ) : null}
                        <div>
                        Director:
                        </div>
                        <div>
                        <Field name="director" />
                        </div>
                        {errors.director && touched.director ? (
                          <div>{errors.director}</div>
                        ) : null}
                        <div>
                        Studio:
                        </div>
                        <div>
                        <Field name="studio" />
                        </div>
                        {errors.studio && touched.studio ? (
                          <div>{errors.studio}</div>
                        ) : null}
                        <div>
                        Description:
                        </div>
                        <div>
                        <Field name="description" />
                        </div>
                        {errors.description && touched.description ? (
                          <div>{errors.description}</div>
                        ) : null}
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
                        Release Date:
                        </div>
                        <div>
                        <Field name="releaseDate" />
                        </div>
                        {errors.releaseDate && touched.releaseDate ? (
                          <div>{errors.releaseDate}</div>
                        ) : null}
                        <div>
                        Genre:
                        </div>
                        <div>
                        <Field name="genre" as="select">
                          <option value="romance">romance</option>
                          <option value="thriller">thriller</option>
                          <option value="action">action</option>
                        </Field>
                        </div>

                        <div>
                        Rating:
                        </div>
                        <div>
                        <Field name="rating" />
                        </div>
                        {errors.rating && touched.rating ? (
                          <div>{errors.rating}</div>
                        ) : null}
                        <div>
                        <button type="submit" className='MainButton'>
                            {isEditFormInsteadOfAddForm===false&&<div>Add New Anime</div>}
                            {isEditFormInsteadOfAddForm===true&&<div>Edit This Anime</div>}
                        </button>
                        </div>
                    </Form>
                )}
                    
                </Formik>
        </div>
    )
}

const mapStateToProps = (state,props) => {
    return {
        isEditFormInsteadOfAddForm:props.isEditFormInsteadOfAddForm,
        editedAnime:props.editedAnime
    };   
}

const mapDispatchToProps = ({
    createAnime,
    editAnime
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnimeForm));