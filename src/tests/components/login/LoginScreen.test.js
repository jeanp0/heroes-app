import { mount } from "enzyme";
import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

describe("Pruebas en <LoginSreen />", () => {
  const historyMock = { replace: jest.fn() };
  const contextMock = { dispatch: jest.fn(9) };
  const wrapper = mount(
    <AuthContext.Provider value={contextMock}>
      <LoginScreen history={historyMock} />
    </AuthContext.Provider>
  );
  test("should mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should realizar el dispatch y la navegación", () => {
    const handleClick = wrapper.find("button").prop("onClick");
    handleClick();
    expect(contextMock.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: { name: "Jeanpier" },
    });
    expect(historyMock.replace).toHaveBeenCalledWith("/");

    const lastPath = "/dc";
    localStorage.setItem("lastPath", lastPath);
    handleClick();
    expect(historyMock.replace).toHaveBeenCalledWith(lastPath);
  });
});
