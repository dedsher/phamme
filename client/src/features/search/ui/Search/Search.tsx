import { Input } from "antd";
import { SearchIcon } from "@shared/assets/icons";
import "./Search.scss";

const Search = () => {
  return (
    <div className="search">
      <div className="search__wrapper">
        <Input
          placeholder="Search"
          style={{
            width: 200,
          }}
        />
        <div className="search__icon">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default Search;
