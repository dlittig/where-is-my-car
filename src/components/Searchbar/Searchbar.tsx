import { Input, Layout } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useDebounce } from "use-debounce/lib";
import { searchParking } from "../../store/actions";
import Icons from "../Icons";

import style from "./Searchbar.style";

const Searchbar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 300);
  const renderClear = useCallback(
    (props: any) => (
      <>
        {value.length > 0 && (
          <TouchableWithoutFeedback onPress={() => setSearch("")}>
            <Icons.Close {...props} />
          </TouchableWithoutFeedback>
        )}
      </>
    ),
    [value]
  );

  useEffect(() => {
    dispatch(searchParking(value));
  }, [value]);

  return (
    <Layout level="1" style={style.search}>
      <Input
        placeholder="Search"
        size="small"
        value={search}
        onChangeText={(value) => setSearch(value)}
        accessoryRight={renderClear}
      />
    </Layout>
  );
};

export default Searchbar;
