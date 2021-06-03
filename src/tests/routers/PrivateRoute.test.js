import React from "react";
import { mount } from "enzyme";
import { PrivateRoute } from "../../routers/PrivateRoute";
import { MemoryRouter } from "react-router";

describe("Pruebas en <PrivateRoute />", function () {
  const props = { location: { pathname: "/marvel" } };
  // simula llamar el localStorage
  Storage.prototype.setItem = jest.fn();

  test("should de mostrar el componente si está autenticado y guardar localStorage", function () {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={true}
          component={() => <span>Listo!</span>}
          {...props}
        />
      </MemoryRouter>
    );
    expect(wrapper.find("span").exists()).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "lastPath",
      props.location.pathname
    );
  });

  test("should bloquear el componente si no está autenticado", function () {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={false}
          component={() => <span>Listo!</span>}
          {...props}
        />
      </MemoryRouter>
    );
    expect(wrapper.find("span").exists()).toBeFalsy();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "lastPath",
      props.location.pathname
    );
  });
});
