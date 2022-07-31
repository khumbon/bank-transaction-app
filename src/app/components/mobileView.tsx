import { Accordion, Text } from "@zopauk/react-components";
import React from "react";

/** Layout of the app when in mobile view mode */
export const MobileView = (
  transactionForm: JSX.Element,
  transactionsList: JSX.Element
) => {
  /** Header items to be displayed */
  const items = [
    {
      id: "transactionForm",
      header: "Enter the details",
      section: transactionForm,
      size: undefined
    },
    {
      id: "transactionsList",
      header: "Transactions",
      section: transactionsList,
      size: undefined
    }
  ];

  return (
    <Accordion aria-label="transactions">
      {items.map(({ id, header, section, size }, index) => (
        <div key={id}>
          <Accordion.Header id={id} index={index} textSize={size}>
            {header}
          </Accordion.Header>
          <Accordion.Section id={id} index={index}>
            <Text size={size}>{section}</Text>
          </Accordion.Section>
        </div>
      ))}
    </Accordion>
  );
};
