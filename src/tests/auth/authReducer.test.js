import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe("Pruebas en authReducer", () => {
  test("should retornar el estado por defecto", () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });

  test("should de autenticar y colocar el nombre del usuario", () => {
    const action = {
      type: types.login,
      payload: { name: "Jeanpier" },
    };
    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({ logged: true, name: action.payload.name });
  });

  test("should de borrar el name del usuario y logged en false", () => {
    const action = {
      type: types.logout,
    };
    const state = authReducer({ logged: true, name: "Jeanpier" }, action);
    expect(state).toEqual({ logged: false });
  });
});
