export default function validate(values, isLogin) {
  console.log('validating');
  console.log(values);
  const errors = {};
  if (!values.email || values.email === '') {
    errors.email = 'Email is required';
  } else if (/.*@.*\..*/.test(values.email) === false) {
    errors.email = 'Please enter a valid email';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  if (!isLogin && !values.username) {
    errors.username = 'Required';
  }
  console.log(errors);
  return errors;
}
