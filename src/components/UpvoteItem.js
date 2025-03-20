import React from "react";
import { Button } from "./Button";
import { ArrowIcon } from '../icons/ArrowIcon';

export const UpvoteItem = React.memo(({ upvotes, isSelected, toggleUpvotes }) => {
  const buttonBackgroundColor = isSelected ? "var(--bg-selected-color)" : undefined;
  const iconFill = isSelected ? "var(--selected-color)" : "var(---default-color)"; 

  return (
    //upvote item
    <div className="upvoteItem" 
    data-testid="upvote-item"
    >
      {upvotes.map((id) => (
        //upvote arrow button
            <Button
              key={id}
              isSelected={isSelected}
              onClick={toggleUpvotes}
              className={"button"}
              style={{ backgroundColor: buttonBackgroundColor }} 
            >
              <ArrowIcon width={15} height={15} fill={iconFill} />
            </Button>
      ))}
    </div>
  );
});
