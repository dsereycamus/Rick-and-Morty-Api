import { useState, useEffect } from "react";
import { Character } from "./Character";
import Buscador from "./Buscador";
import MyPagination from "./Pagination";
import Filter from "./Filter";

export function MiApi() {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [maxPages, setMaxPages] = useState(0);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}${
          searchTerm !== "" ? `&name=${searchTerm}` : ""
        }${status !== "" ? `&status=${status}` : ""}`
      );
      if (data.status === 404) {
        setCharacters([]);
        setMaxPages(0);
        setError("No se encontró el personaje");
        setLoading(false);
        return;
      }
      const { results, info } = await data.json();
      setMaxPages(info.pages);
      setCharacters(
        results.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
      );
      setLoading(false);
    }
    fetchData();
  }, [page, searchTerm, status]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  return (
    <div className="container">
      <Buscador onSearch={handleSearch} />
      <Filter onStatusChange={(value) => setStatus(value)} />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          {characters.map((character) => (
            <div className="col-md-4 p-4" key={character.id}>
              <Character
                key={character.id}
                name={character.name}
                origin={character.origin}
                image={character.image}
                status={character.status}
                gender={character.gender}
                species={character.species}
              />
            </div>
          ))}
          {error && <div>{error}</div>}
        </div>
      )}

      {!loading && maxPages > 0 && (
        <div className="d-flex justify-content-center p-3">
          <MyPagination page={page} setPage={setPage} maxPages={maxPages} />
        </div>
      )}
    </div>
  );
}

export default MiApi;
