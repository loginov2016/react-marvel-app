import {useState} from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';

import useMarvelService from '../../customhooks/useMarvelService.hook';
import ErrorMessage from '../errorMessage/ErrorMessage';


import { classNames as cn } from '../../lib/classNames';
import buttonStyles from '../../style/button.module.scss';
import charSearchStyles from './charSearchForm.module.scss';
import { format } from 'path';

interface ICharType {
    id: string,
    name: string,
    description: string,
    thumbnail: string,
    homepage: string,
    wiki: string,
    comics: IComicType[]
}

interface IComicType {
    name: string;
    resourceURI: string;
}

/* 
    id: char.id,
    name: char.name,
    description: char.description,
    thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
    homepage: char.urls[0].url,
    wiki: char.urls[1].url,
    comics: char.comics.items 
*/

const CharSearchForm = () => {
    //console.log('charSearchStyles: ', charSearchStyles);
    const [char, setChar] = useState<ICharType[]>(null);
    const {loading, error, getCharByName, clearError} = useMarvelService();

    const onCharLoaded = (char:ICharType[]) => {
        console.log('charSearchForm: ', char);
        setChar(char);
    }

    const updateChar = (name: string) => {
        clearError();
        getCharByName(name).then(onCharLoaded);
    }

    const errorMessage = error ? <div className={charSearchStyles['char__search-critical-error']}><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ?
                    <div className={charSearchStyles['char__search-wrapper']}>
                        <div className={charSearchStyles['char__search-success']}>There is! Visit {char[0].name} page?</div>
                        <Link to={`/characters/${char[0].id}`} className={cn(buttonStyles['button'], buttonStyles['button__secondary'])}>
                            <div className={buttonStyles.inner}>To page</div>
                        </Link>
                    </div> : 
                    <div className={charSearchStyles['char__search-error']}>
                        The character was not found. Check the name and try again
                    </div>;

    return (
        <div className={charSearchStyles['char__search-form']}>
            <Formik
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit = { ({charName}) => {
                    updateChar(charName);
                }}
            >
                <Form>
                    <label className={charSearchStyles['char__search-label']} htmlFor="charName">Or find a character by name:</label>
                    <div className={charSearchStyles['char__search-wrapper']}>
                        <Field 
                            id="charName"
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"
                        />
                        <button 
                            type='submit'
                            className={cn(buttonStyles.button, buttonStyles.button__main)}
                            disabled={loading}>
                            <div className={buttonStyles.inner}>find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className={charSearchStyles['char__search-error']} name="charName" />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default CharSearchForm;