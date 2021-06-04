import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router";
import { SearchScreen } from "../../../components/search/SearchScreen";

describe("Pruebas en <SearchScreen />", () => {
  test("should mostrarse correctamente con valores por defecto", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <Route paht="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".alert-info").text().trim()).toBe("Search a hero");
  });

  test("should mostrar a batman y el input con el valor del query string", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <Route paht="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find("input").prop("value")).toBe("batman");
    expect(wrapper).toMatchSnapshot();
  });

  test("should mostrar un error si no se encuentra el hero", () => {
    const q = "batmanasd";
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search?q=${q}`]}>
        <Route paht="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".alert-danger").text().trim()).toBe(
      `There is no a hero with ${q}`
    );
  });

  test("should de llamar el push del history", () => {
    const q = "batman";
    const history = { push: jest.fn() };
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search?q=${q}`]}>
        <Route
          paht="/search"
          component={(props) => <SearchScreen history={history} />}
        />
      </MemoryRouter>
    );
    wrapper.find("input").simulate("change", {
      target: { name: "searchText", value: q },
    });

    wrapper.find("form").simulate("submit", { preventDefault() {} });
    expect(history.push).toHaveBeenCalledWith(`?q=${q}`);
  });
});
