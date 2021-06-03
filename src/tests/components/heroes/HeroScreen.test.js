import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router";
import { HeroScreen } from "../../../components/heroes/HeroScreen";

describe("Pruebas en <HeroScreen/>", () => {
  const historyMock = { length: 10, push: jest.fn(), goBack: jest.fn() };

  test("should mostrar el componente redirect si no hay argumentos en el URL", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero"]}>
        <HeroScreen history={historyMock} />
      </MemoryRouter>
    );
    expect(wrapper.find("Redirect").exists()).toBeTruthy();
  });

  test("should mostrar un hero si tiene un parámetro y se encuentra", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        {/* simula el path con arumentos */}
        <Route path="/hero/:heroId" component={HeroScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find(".row").exists()).toBe(true);
  });

  test("should regresar a la ruta inicial con push", () => {
    const historyMock = { length: 1, push: jest.fn(), goBack: jest.fn() };
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route
          path="/hero/:heroId"
          component={(props) => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );
    wrapper.find("button").prop("onClick")();
    expect(historyMock.push).toHaveBeenCalledWith("/");
    expect(historyMock.goBack).not.toHaveBeenCalled();
  });

  test("should regresar a la ruta anterior con goBack()", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route path="/hero/:heroId">
          <HeroScreen history={historyMock} />
        </Route>
      </MemoryRouter>
    );
    wrapper.find("button").prop("onClick")();
    expect(historyMock.push).not.toHaveBeenCalled();
    expect(historyMock.goBack).toHaveBeenCalled();
  });

  test("debe de llamar el redirect si el param heroId no existe", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider-asd"]}>
        <Route
          path="/hero/:heroId"
          component={(props) => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );
    // si se llama redirect retorna un string vacío
    expect(wrapper.text()).toBe("");
  });
});
