import { useSelector } from "react-redux";

const WithGuard = (Component) => {
  const Wrapper = (props) => {
    const { isLogedIn } = useSelector((state) => state.auth);
    return isLogedIn ? (
      <Component />
    ) : (
      <p className="err">please login first</p>
    );
  };
  return Wrapper;
};

export default WithGuard;
