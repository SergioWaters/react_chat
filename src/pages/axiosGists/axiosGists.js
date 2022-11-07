
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import { getGists, getGistsByName } from "../../store/gists";
import { firebase } from "../../api/firebase.js"

const searchGistsDebounced = debounce((query, dispatch) => {
  dispatch(getGistsByName(query));
}, 1000);

export const AxiosGists = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { gists, error, pending, gistsByName, pendingByName, errorByName } =
    useSelector((state) => state.gists);

  useEffect(() => {
    dispatch(getGists());
  }, [dispatch]);

  useEffect(() => {
    if (!!value) {
      searchGistsDebounced(value, dispatch);
    }
  }, [value, dispatch]);

  if (error) {
    return <div>
      <h1>Error</h1> !!
      <button onClick={() => dispatch(getGists(1))}>Retry</button></div>;
  }

  return (
    <div>
      <h1>Gists page</h1>
      <div style={{ display: "flex", minWidth: '50%' }}>
        <div>
          {pending ? (
            <h1>pending ...</h1>
          ) : (
            <div>
              {Array.from({ length: 10 })
                .map((_, index) => index + 1)
                .map((item) => (
                  <button onClick={() => dispatch(getGists(item))} key={item}>
                    {item}
                  </button>
                ))}
              {gists.map((gist, index) => (
                <div key={index}>
                  <h2>
                    {gist.description || (
                      <span style={{ fontWeight: "bold" }}>no description</span>
                    )}
                  </h2>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ minWidth: '50%' }}>
          <h1>Find gists by name</h1>
          <input
            placeholder="search gists by name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          {
            pendingByName ? (
              <h1>pending ...</h1>
            ) : (
              gistsByName.map((gist, index) => (
                <div key={index}>
                  <h2>
                    {gist.description || (
                      <span style={{ fontWeight: "bold" }}>no description</span>
                    )}
                  </h2>
                  <hr />
                </div>
              ))
            )
          }
          {(!gistsByName.lenth && !errorByName) ? (<h1>No gists from {value}</h1>) : (console.log(gistsByName.length))}
          {errorByName ? (<h1>Error: {errorByName?.message}</h1>) : (console.log("errorByName", errorByName?.message))}

        </div>
      </div>
    </div>
  );
};