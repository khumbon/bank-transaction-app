import { transaction } from "../../components/app/app";
import firebase from "./firebase";

/** Adds the submitted values to the firebase firestore */
export const addTransaction = (values: transaction) => {
  const store = firebase.firestore();
  store.collection("transferApp").add({
    firstName: values.firstName,
    emailAddress: values.emailAddress,
    amount: values.amount
  });
};
