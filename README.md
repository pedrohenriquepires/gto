# Heets

## Development environment setup

```bash
# install dependencies
npm install

# install bower dependencies
bower install

# build application
gulp
```

## Gulp tasks

- __`gulp watch:sass`__ Watch for changes, compile and minify sass files (not third party).
- __`gulp validate:scripts`__ Validate scripts with JSHint (not third party).
- __`gulp`__ Default task builds for prod. Built sources are put into /dist.

## Directory structure

```
sass/
  |__*.scss
www/
  |__app/
  |   |__app.core
  |         |__*.js
  |   |__app.modules
  |         |__{module}
  |            |__*.js
  |            |__*.html
  |__images/
  |   |__*.jpg/png
```
