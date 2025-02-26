export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    sampleStoreNames: [
      {
        prop1: 5,
        prop2: "random value here",
      }
    ],
    characters: [],
    planets: [],
    starships: [],
    favorites: [],
    characterImages: [
      // Grabbed image links from this akabab.github.io api
      "https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg",
      "https://vignette.wikia.nocookie.net/starwars/images/3/3f/C-3PO_TLJ_Card_Trader_Award_Card.png",
      "https://vignette.wikia.nocookie.net/starwars/images/e/eb/ArtooTFA2-Fathead.png",
      "https://vignette.wikia.nocookie.net/fr.starwars/images/3/32/Dark_Vador.jpg",
      "https://vignette.wikia.nocookie.net/starwars/images/f/fc/Leia_Organa_TLJ.png",
      "https://vignette.wikia.nocookie.net/starwars/images/e/eb/OwenCardTrader.png",
      "https://vignette.wikia.nocookie.net/starwars/images/c/cc/BeruCardTrader.png",
      "https://vignette.wikia.nocookie.net/starwars/images/c/cb/R5-D4_Sideshow.png",
      "https://vignette.wikia.nocookie.net/starwars/images/0/00/BiggsHS-ANH.png",
      "https://vignette.wikia.nocookie.net/starwars/images/4/4e/ObiWanHS-SWE.jpg",
    ],
    planetImages: [
      // Grabbed image links from this starwars.fandom.com/wiki search page
      "https://static.wikia.nocookie.net/starwars/images/b/b0/Tatooine_TPM.png",
      "https://static.wikia.nocookie.net/starwars/images/4/4a/Alderaan.jpg",
      "https://static.wikia.nocookie.net/starwars/images/d/d4/Yavin-4-SWCT.png",
      "https://static.wikia.nocookie.net/starwars/images/1/1d/Hoth_SWCT.png",
      "https://static.wikia.nocookie.net/starwars/images/7/7d/Dagobah-CGSWG.png",
      "https://static.wikia.nocookie.net/starwars/images/1/11/Bespin-SWCT.png",
      "https://static.wikia.nocookie.net/starwars/images/1/1d/Endor_BF2.png",
      "https://static.wikia.nocookie.net/starwars/images/f/f0/Naboo_planet.png",
      "https://static.wikia.nocookie.net/starwars/images/8/84/CoruscantGlobeE1.png",
      "https://static.wikia.nocookie.net/starwars/images/a/a9/Eaw_Kamino.jpg",
      // "https://static.wikia.nocookie.net/star-wars-extended-universe/images/8/80/Waterplanet.png"
    ],
    starshipImages: [
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f2e0f812-760e-426d-8792-fe53817ccbd3/dc7r0st-a74472ce-8092-401a-ba8c-9635e78cceba.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2YyZTBmODEyLTc2MGUtNDI2ZC04NzkyLWZlNTM4MTdjY2JkM1wvZGM3cjBzdC1hNzQ0NzJjZS04MDkyLTQwMWEtYmE4Yy05NjM1ZTc4Y2NlYmEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gWGLJ7914bUMqMtxru5pQr8oCWUhYhS3vdLrR1eCXP8",
      "https://lumiere-a.akamaihd.net/v1/images/Star-Destroyer_ab6b94bb.jpeg?region=0%2C50%2C1600%2C800",
      "https://static.wikia.nocookie.net/starwars/images/5/5b/Imperial_Sentinel-class_shuttle.png",
      "https://cdn.wallpapersafari.com/70/91/clwqXy.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtft0FVNe2cS0tumsPLeew190kje113lXPb30CFiZffqT2RNf4&usqp=CAc",
      "https://lumiere-a.akamaihd.net/v1/images/resistance-ywing-main_10b5e63d.jpeg?region=340%2C0%2C720%2C720",
      "https://lumiere-a.akamaihd.net/v1/images/X-Wing-Fighter_47c7c342.jpeg?region=0%2C96%2C1536%2C769",
      "https://cdnb.artstation.com/p/assets/images/images/028/086/799/large/donny-versiga-sw-tie-advanced-01.jpg?1593449609",
      "https://swrpggm.com/wp-content/uploads/2020/12/SSDFE.png",
      "https://external-preview.redd.it/A2lpCEKxYSNqsgaHHjz9TPYVWnAhrA1s64Ey6hCDmv8.jpg?auto=webp&s=1d0a97617b39c6adcbdf34d55c76fe600e1d6d12"
    ],
  }
}

const apiUrl = "https://swapi.dev/api";

// Fetch functions for Star Wars data
export const fetchStarWarsData = {
  fetchCharacters: async (dispatch) => {
    try {
      const response = await fetch(apiUrl + '/people/');
      const data = await response.json();
      dispatch({
        type: 'get_characters',
        payload: data.results
      });
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  },

  fetchPlanets: async (dispatch) => {
    try {
      const response = await fetch(apiUrl + '/planets/');
      const data = await response.json();
      dispatch({
        type: 'get_planets',
        payload: data.results
      });
    } catch (error) {
      console.error("Error fetching planets:", error);
    }
  },

  fetchStarships: async (dispatch) => {
    try {
      const response = await fetch(apiUrl + '/starships/');
      const data = await response.json();
      dispatch({
        type: 'get_starships',
        payload: data.results
      });
    } catch (error) {
      console.error("Error fetching starships:", error);
    }
  },

  fetchAllData: (dispatch) => {
    fetchStarWarsData.fetchCharacters(dispatch);
    fetchStarWarsData.fetchPlanets(dispatch);
    fetchStarWarsData.fetchStarships(dispatch);
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case 'add_task':
      const { id, color } = action.payload
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'actionNameHere':
      const { value1, value2 } = action.payload /* payload here is the object holding your props */
      return {
        ...store,
        /* store name here*/sampleStoreNames: store.sampleStoreNames.map((sampleStoreName) => (sampleStoreName.prop1 === value1 ? { ...sampleStoreName, prop2: value2 } : sampleStoreName))
      };

    case 'get_characters':
      return {
        ...store,
        characters: action.payload
      };

    case 'get_planets':
      return {
        ...store,
        planets: action.payload
      };

    case 'get_starships':
      return {
        ...store,
        starships: action.payload
      };

    case "add_favorite":
      const { name, index, category } = action.payload;
      return {
        ...store,
        favorites: [...store.favorites, { name, index, category }]
      };

    case 'delete_favorite':
      const indexToDelete = action.payload;
      return {
        ...store,
        favorites: store.favorites.filter((_, index) => index !== indexToDelete),  // Remove the favorite at the given index
      };

    default:
      throw Error('Unknown action.');

  }
}

