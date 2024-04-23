import { Button, ButtonGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const PostListItems = ({ isLogedIn, records, handleEdit, handleDelete }) => {
  const Nav = useNavigate();
  const deleteHandle = (item) => {
    window.confirm(`Do you really want to delete records ${item.title}`) &&
      handleDelete(item.id);
  };

  const editHandler = (id) => {
    Nav(`user/${id}/edit`);
  };
  const handleData = records?.map((el, indx) => (
    <tr key={el.id}>
      <td className="id">{indx + 1}</td>
      <td className="title">
        <Link className="title-link" to={`user/${el.id}/details`}>
          {el.title}
        </Link>
      </td>
      <td className="control">
        <ButtonGroup aria-label="Basic example">
          <Button
            variantvs="success"
            onClick={() => editHandler(el.id)}
            disabled={!isLogedIn}
          >
            edit
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteHandle(el)}
            disabled={!isLogedIn}
          >
            delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  ));

  return <>{handleData}</>;
};

export default PostListItems;
