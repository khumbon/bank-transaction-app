/** Checks that the amount entered has a maximum of two decimals*/
export const amountValidate = (amount: Number) => {
  const countDecimals = String(amount).includes(".")
    ? String(amount).split(".")[1].length
    : 0;

  if (countDecimals > 2) {
    return "Your amount is not valid";
  }
};

/** Checks that the first name is made of alphabetical character */
export const nameValidate = (firstName: string) => {
  const nameFormat = /^[a-zA-Z]+$/;

  if (!nameFormat.test(firstName)) {
    return "Your first name is not valid";
  }
};

/** Checks that email address matches the expected format */
export const emailValidate = (emailAddress: string) => {
  const emailFormat = /\S+@\S+\.\S+/;

  if (!emailFormat.test(emailAddress)) {
    return "Your email address is not valid";
  }
};

/** Checks that a value exists for every key in the values object */
export const validate = (values) => {
  let errors = {};

  Object.keys(values).forEach((key) => {
    if (!values[key]) {
      errors[key] = "Field required";
    }
  });

  return errors;
};
