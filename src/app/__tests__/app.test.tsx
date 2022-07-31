import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor
} from "@testing-library/react";
import TransferApp from "../app";
import "@testing-library/jest-dom/extend-expect";

describe("Transactions Form", () => {
  afterEach(cleanup);

  const {
    getByLabelText,
    getAllByText,
    queryByText,
    getByRole,
    getByTestId
  } = render(<TransferApp />);
  const firstNameInput = getByLabelText("FirstName");
  const emailAddressInput = getByLabelText("EmailAddress");
  const amountInput = getByLabelText("Amount");
  const submitButtonInput = getAllByText(/Send Money/i);
  /** 
  it("renders without crashing", async () => {
    const wrapper = render(<TransferApp />);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });*/

  it("handles value changes", async () => {
    const handleSubmit = jest.fn();

    await act(async () => {
      await fireEvent.change(firstNameInput, { target: "John" });
    });

    await act(async () => {
      await fireEvent.change(emailAddressInput, {
        target: "JohnSmith@email.com"
      });
    });
    await act(async () => {
      await fireEvent.change(amountInput, { target: 99.99 });
    });
    await act(async () => {
      await fireEvent.submit(submitButtonInput[0]);
    });
    /** If "expect is not defined", save this file and it should reset
     * This is a known code sandbox bug
     */
    waitFor(() => {
      const alert = getByRole("alert");

      expect(alert).toHaveTextContent(/The money has been sent/i);
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveFormValues({
        firstName: "John",
        emailAddress: "JohnSmith@email.com",
        amount: 99.99
      });
    });
  });

  it("renders error messages", async () => {
    await act(async () => {
      fireEvent.click(firstNameInput);
    });
    await act(async () => {
      fireEvent.blur(firstNameInput);
    });
    await act(async () => {
      fireEvent.click(emailAddressInput);
    });
    await act(async () => {
      fireEvent.blur(emailAddressInput);
    });
    await act(async () => {
      fireEvent.click(amountInput);
    });
    await act(async () => {
      fireEvent.blur(amountInput);
    });

    waitFor(() => {
      expect(queryByText("Fields are required")).toBeTruthy();
    });
  });

  it("renders all headers", () => {
    waitFor(() => {
      const appHeader = getByTestId("appHeader");
      const formHeader = getByTestId("formHeader");
      const historyHeader = getByTestId("historyHeader");

      console.log(appHeader);
      expect(appHeader).toHaveTextContent("Zopa Money Transfers");
      expect(formHeader).toHaveTextContent("Enter the details");
      expect(historyHeader).toHaveTextContent("Transactions");
    });
  });
});
