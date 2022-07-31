import React from "react";
import { FormTextField, Button, Icon } from "@zopauk/react-components";
import { Form } from "formik";
import "../app.scss";
import {
  faPoundSign,
  faArrowCircleRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  nameValidate,
  emailValidate,
  amountValidate
} from "../utilities/validation";

/** Base of the transactions form laying the form fields and a submit button */
export const transactionFormBase = (
  <Form data-testid="form">
    <FormTextField label="First Name" name="firstName" validate={nameValidate} />
    <FormTextField
      label="Email Address"
      name="emailAddress"
      validate={emailValidate}
    />
    <FormTextField
      startIcon={<Icon variant={faPoundSign} className="mr-6" />}
      label="Amount"
      name="amount"
      validate={amountValidate}
      type="number"
      min="0.00"
      step="0.01"
    />
    <br />
    <Button
      styling="primary"
      type="submit"
      fullWidth={true}
      data-testid="button"
    >
      Send money
      <FontAwesomeIcon icon={faArrowCircleRight} />
    </Button>
  </Form>
);
