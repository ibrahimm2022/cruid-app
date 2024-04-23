import React from "react";

const Loading = ({ isLoading, error, children }) => {
  const elementType = children.type.render?.displayName;
  const handleLoading = () => {
    if (elementType === "Button") {
      const cloneButton = React.cloneElement(
        children,
        { disable: true },
        "Isloading"
      );
      return (
        <>
          {isLoading ? (
            cloneButton
          ) : error ? (
            <p className="err">{error}</p>
          ) : (
            children
          )}
        </>
      );
    }
    return (
      <>
        {isLoading ? (
          <p>loading please wait</p>
        ) : error ? (
          <p className="err">{error}</p>
        ) : (
          children
        )}
      </>
    );
  };
  return handleLoading();
};

export default Loading;
