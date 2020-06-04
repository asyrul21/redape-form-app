# RedApe Form App
This repo stores the application code for the technical assessment given by Redape Solutions. For this assessment, I will be attempting the FrontEnd part of the application. This app is now live [here](https://redape-react-app.herokuapp.com).

## Some Assumptions and Notes
1. When building this app the fields returned by the API are static and do not change. Hence, the app assumes the input types present in the returned fields (email, radio, select, telephone and hidden) are the only ones that are needed by the app.

    Further addition of fields in the future would require the form component to be retested.

2. Input validation of this app was only done on the Contact field, as the email field has already been validated by the form. The radio button is optional and select input types has a default value. Do note that the accepted phone number format is one of the following:
    - (123) 456-7890
    - (123)456-7890
    - 123-456-7890
    - 123.456.7890
    - 1234567890
    - +31636363634
    - 075-63546725

3. Upon deployment the Redux dev Tool middleware configured in the store file causes the app to break on Safari. To fix this, I simply commented the code.
```javascript
const store = createStore(
    rootReducer, initialState,
    compose(
        applyMiddleware(...middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        // causes page not to load on safari
    )
)
```

4. The hidden field does not appear on the form, but upon submiting it appears together in the json. In the requirements, the json are supposed to have 3 fields: label, value and isValid. The hidden field does not have any label field, hence in the json I simply output as "(no label)".

5. Finally, validation was done only for two aspects: mandatory field and telephone format. Further validation can always be added in the validate() method.

## Kickstarting with Create React App
1. Create app
```bash
npx create-react-app redape-form-app --use-npm
```
2. Run
```bash
npm start
```
# Reduxation
1. Install
```bash
npm install redux react-redux redux-thunk
```

## Deployment

Refer: https://github.com/asyrul21/movieApp

1. Install serve
```bash
npm install serve --save
```

2. Modify package.json
```json
  "scripts": {
    "start": "serve -s build",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
```

3. To run locally, change package.json back to
```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
```

4. Heroku create and deploy
```bash
heroku create redape-react-app

-commit your changes

git push heroku master
```

## Some references

1. Dynamic input handle change
```javascript
handleChange(event, field) {
    event.preventDefault();
    if (event)
        return this.setState({
            submitted: false,
            [`${field}`]: event.target.value
            // OR
            // [e.target.name]: e.target.value
            // but for this need to give name attributes to every form field
        });
}
```

2. Telephone formate regex

https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript

3. Redux crash course

https://www.youtube.com/watch?v=93p3LxR9xfM

4. Redux Error handling

https://www.firehydrant.io/blog/graceful-error-handling-with-redux/

5. Fixing CORS Issue

https://stackoverflow.com/questions/56781610/from-origin-http-localhost3000-has-been-blocked-by-cors-policy-no-acces/56781665

