import React, { useState, useEffect } from "react";
import axios from "axios";

import { Switch, Route, useParams } from "react-router-dom";

import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import FilmListesi from "./Filmler/FilmListesi";
import Film from "./Filmler/Film";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then((response) => {
          console.log(response.data);
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
          setMovieList(response.data);
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (id) => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
  };

  return (
    <div>
      <KaydedilenlerListesi
        list={
          [
            /* Burası esnek */
          ]
        }
      />
      <Switch>
        {/* // https://github.com/Workintech/FSWeb-S7G1-SPA-Routing */}
        <Route path="/:user">Profil Sayfası</Route>
        <Route path="/:user/:repoName">RepoDetayları</Route>
        <Route path="/movies/:id">
          <Film />
        </Route>
        <Route path="/">
          <FilmListesi movies={movieList} />
        </Route>
      </Switch>
      <div></div>
    </div>
  );
}
