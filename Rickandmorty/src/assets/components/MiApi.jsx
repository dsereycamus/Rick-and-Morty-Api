// Importaciones de React y componentes necesarios
import { useState, useEffect } from "react";
import { Character } from "./Character";
import Buscador from "./Buscador";
import MyPagination from "./Pagination";
import Filter from "./Filter";

// Definición del componente principal
export function MiApi() {
  // Estados del componente
  const [loading, setLoading] = useState(true); // Estado de carga
  const [characters, setCharacters] = useState([]); // Lista de personajes
  const [maxPages, setMaxPages] = useState(0); // Número máximo de páginas
  const [page, setPage] = useState(1); // Página actual
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
  const [error, setError] = useState(""); // Mensaje de error
  const [status, setStatus] = useState(""); // Estado de los personajes
  const [sortDirection, setSortDirection] = useState("asc"); // Dirección de ordenamiento

  // useEffect para cargar datos de la API
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      // Construcción de la URL de la API con parámetros de búsqueda, paginación y ordenamiento
      const data = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}${
          searchTerm !== "" ? `&name=${searchTerm}` : ""
        }${status !== "" ? `&status=${status}` : ""}`
      );

      // Manejo de errores (404)
      if (data.status === 404) {
        setCharacters([]);
        setMaxPages(0);
        setError("No se encontró el personaje");
        setLoading(false);
        return;
      }

      // Extracción de resultados y metadata de la respuesta
      const { results, info } = await data.json();

      // Configuración de estados con los datos obtenidos y ordenamiento
      setMaxPages(info.pages);
      setCharacters(
        results.sort(function (a, b) {
          if (sortDirection === "asc") {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        })
      );

      setLoading(false);
    }

    // Llamada a la función de carga de datos
    fetchData();
  }, [page, searchTerm, status, sortDirection]);

  // Función para manejar el cambio en el término de búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1); // Reiniciar la página a 1 al realizar una nueva búsqueda
  };

  // Función para manejar el cambio en la dirección de ordenamiento
  const handleSortChange = (direction) => {
    setSortDirection(direction);
  };

  // Renderizado del componente
  return (
    <div className="container">
      {/* Componente de búsqueda */}
      <Buscador onSearch={handleSearch} />

      {/* Componente de filtro */}
      <Filter
        onStatusChange={(value) => setStatus(value)}
        onSortChange={handleSortChange}
      />

      {/* Condicional de carga: Muestra mensaje de carga o lista de personajes */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          {/* Mapeo de la lista de personajes */}
          {characters.map((character) => (
            <div className="col-md-4 p-4" key={character.id}>
              {/* Componente individual de personaje */}
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
          {/* Mostrar mensaje de error si hay un error */}
          {error && <div>{error}</div>}
        </div>
      )}

      {/* Mostrar paginación si no hay carga y hay más de una página */}
      {!loading && maxPages > 0 && (
        <div className="d-flex justify-content-center p-3">
          {/* Componente de paginación */}
          <MyPagination page={page} setPage={setPage} maxPages={maxPages} />
        </div>
      )}
    </div>
  );
}

// Exportar el componente principal
export default MiApi;
