import { useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";
import React, { useState, useEffect } from "react";
import { Surface, Searchbar as SearchBarPaper } from "react-native-paper";

import { searchParking } from "../../store/actions";

import style from "./Searchbar.style";

const Searchbar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 300);

  useEffect(() => {
    dispatch(searchParking(value));
  }, [value]);

  return (
    <Surface>
      <SearchBarPaper
        placeholder="Search"
        onChangeText={setSearch}
        value={search}
      />
    </Surface>
  );
};

export default Searchbar;
