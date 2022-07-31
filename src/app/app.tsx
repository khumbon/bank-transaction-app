import React, { useState, useEffect } from "react";
import {
  GlobalStyles,
  Heading,
  FlexCol,
  FlexRow,
  FlexContainer,
  Banner,
  Card
} from "@zopauk/react-components";
import { Formik } from "formik";
import "./app.scss";
import { transactionList } from "./components/transactionsList";
import { transactionFormBase } from "./components/transactionFormBase";
import { validate } from "./utilities/validation";
import { useMediaQuery } from "react-responsive";
import { MobileView } from "./components/mobileView";
import firebase from "./utilities/firebase";
import { addTransaction } from "./utilities/addTransaction";

/** Transaction object details */
export interface transaction {
  firstName: string;
  emailAddress: string;
  amount: number;
}

/** Money transfer application, renders transaction input form and history */
const TransferApp = () => {
  const initTransactions: transaction[] = [];

  const [transactions, setTransactions] = useState(initTransactions);
  const [isSubmitted, setSubmitted] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  /** Actions taken when the submit button is clicked */
  const handleSubmit = (values: transaction, actions) => {
    addTransaction(values);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 2000);

    actions.resetForm();
  };

  /** Updates the transactions from the store */
  useEffect(() => {
    const store = firebase.firestore();
    const data = store.collection("transferApp").onSnapshot((snapshot) => {
      const transactionData = [];
      snapshot.forEach((item) => transactionData.push({ ...item.data() }));

      setTransactions(transactionData);
    });
    return data;
  }, []);

  /** Functional transaction form */
  const transactionForm = (
    <div className="transactionForm">
      <Formik
        initialValues={{
          firstName: "",
          emailAddress: "",
          amount: null
        }}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
        validate={validate}
      >
        {transactionFormBase}
      </Formik>
      <br />
    </div>
  );

  return (
    <div className="transfers">
      <GlobalStyles />
      <FlexContainer>
        <Card>
          <FlexContainer>
            <Heading as="h1" data-testID="appHeader">
              Zopa Money Transfers
            </Heading>
            <br />
            {isSubmitted && (
              <Banner severity="success">The money has been sent</Banner>
            )}
          </FlexContainer>
          <div className="transferDetails">
            <FlexContainer gutter={50}>
              {isMobile &&
                MobileView(transactionForm, transactionList(transactions))}
              {!isMobile && (
                <FlexRow cols={2} justify="center">
                  <FlexCol xs="fill">
                    <Heading as="h4" data-testID="formHeader">
                      Enter the details
                    </Heading>
                    <br />
                    {transactionForm}
                  </FlexCol>
                  <FlexCol xs="fill">
                    <Heading as="h4" data-testID="historyHeader">
                      Transactions
                    </Heading>
                    <br />
                    {transactionList(transactions)}
                  </FlexCol>
                </FlexRow>
              )}
            </FlexContainer>
          </div>
        </Card>
      </FlexContainer>
    </div>
  );
};

export default TransferApp;
