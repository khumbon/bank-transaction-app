import {
  Text,
  FlexRow,
  FlexCol,
  colors,
  FlexContainer,
  Card,
  ScrollableArea
} from "@zopauk/react-components";
import React from "react";
import { transaction } from "../app";
import "../app.scss";

/** Transactions are used as inputs and mapped to a styled result card */
export const transactionList = (transactions: transaction[]) => {
  return (
    <div className="transactionHistory">
      <ScrollableArea>
        {transactions.map((value: transaction, index: number) => (
          <Card styling="primary">
            <FlexContainer bottom-border="15px">
              <FlexRow cols={2}>
                <FlexCol align="flex-start">
                  <Text
                    color={colors.greyDarkest}
                    as="p"
                    weight="bold"
                  >{`${value.firstName}`}</Text>
                </FlexCol>
                <FlexCol align="flex-end">
                  <Text
                    color={colors.greyDarkest}
                    as="p"
                    weight="bold"
                    align="right"
                  >{`-£${value.amount.toFixed(2)}`}</Text>
                </FlexCol>
              </FlexRow>
              <Text color={colors.grey} as="p">{`${value.emailAddress}`}</Text>
            </FlexContainer>
          </Card>
        ))}
      </ScrollableArea>
    </div>
  );
};
