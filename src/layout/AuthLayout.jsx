import React from "react";
import { Outlet } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";

export const AuthLayout = () => {
  return (
    <Fragment>
      <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-12 p-5 items-center">
        <Outlet />
      </main>
    </Fragment>
  );
};
