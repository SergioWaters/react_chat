import { useCallback, useState, useEffect } from 'react'
import { FirstComp } from "../../components"

export const API_URL_PUBLIC = "https://api.github.com/gists/public";
export const API_URL_GIST = "https://api.github.com/gists/";

export const GistsList = () => {

  const [gists, setGists] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)


  const requestGistsNew = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(API_URL_PUBLIC);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const result = await response.json();
      setGists(result);
    } catch (err) {
      setError(true);
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  const requestGists = () => {
    setError(false);
    setLoading(true);
    fetch(API_URL_PUBLIC)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((result) => setGists(result))
      .catch((err) => {
        setError(err);
        console.log(err, [err]);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    requestGists();
  }, []);

  const renderGist = useCallback(
    (gist) => <li key={gist.id}>{gist.id}" - "{gist.description || 'No description'}</li>,
    []);



  //render
  if (error) {
    return (
      <>
        <h3>Got error: '{error.message}'</h3>
        <button onClick={requestGists}>Retry</button>
      </>
    );
  };
  if (loading) {
    return (
      <>
        <FirstComp name="Waiting for data" />
      </>
    );
  };

  return <ul>{gists.map(renderGist)}</ul>;
};
