# RedApe Form App
This repo stores the application code for the technical assessment given by Redape Solutions. For this assessment, I will be attempting the FrontEnd part of the application.

## Kickstarting with Create React App
1. Create app
```bash
npx create-react-app redape-form-app --use-npm
```

2. Run
```bash
npm start
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

accepts one of the following formats:
- (123) 456-7890
- (123)456-7890
- 123-456-7890
- 123.456.7890
- 1234567890
- +31636363634
- 075-63546725

# Reduxation
1. Install
```bash
npm install redux react-redux redux-thunk
```
2. Error handling

https://www.firehydrant.io/blog/graceful-error-handling-with-redux/

3. Redux crash course

https://www.youtube.com/watch?v=93p3LxR9xfM

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


## Fixing CORS Issue

https://stackoverflow.com/questions/56781610/from-origin-http-localhost3000-has-been-blocked-by-cors-policy-no-acces/56781665


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.