import "./SearchItem.scss";
import classNames from "classnames";

const SearchItem = ({
  user,
}: {
  user: any;
}) => {
  return (
    <div className="search__found-user">
      <div
        className={classNames(
          "search__avatar-wrapper",
          user.status === "online" && "search__avatar-wrapper--online"
        )}
      >
        <div>
          <img src={user.avatar_url} alt="avatar" />
        </div>
      </div>
      <h3 className="search__name">
        {user.firstname} {user.lastname}
      </h3>
    </div>
  );
};

export default SearchItem;
