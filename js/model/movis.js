import { ObjectId } from "mongodb";
import {connect} from "../../helper/db/connect.js"
/// 1 
export const getMovisById = async () =>{
    let {db,conexion} = await connect.getinstance();


    const collection = db.collection('movis');
    const data = await collection.aggregate([
        {
          $unwind: "$format"
        },
        {
          $match: {
            "format.name": "dvd"
          }
        },
        {
          $group: {
            _id: "$_id",
            valor_copias: {
              $sum: {
                $multiply: [
                  "$format.value",
                  "$format.copies"
                ]
              }
            },
            copias: { $first: "$format.copies" }
          }
        }
      ]).toArray();
    conexion.close();
    return data; // aaca se agrega lo de js (length) etc 



}

// 6 **Listar todos los géneros de películas distintos:**

export const getAllDifferentGenres = async()=>{

  let {db, conexion} =  await connect.getinstance();

  let collection = db.collection('movis');
  const data = await collection.aggregate([
    {
      $unwind:"$genre"
    },
    
    {
      $group: {
        _id: null, 
        generos: {$addToSet:"$genre"}
      }
    },
    {
      $project:{
        _id: 0,
        generos: 1
      }
    }
  ]).toArray();
  conexion.close();


  return data;


}

//7 **Encontrar películas donde el actor con id 1 haya participado:**

export const getAllMoviesWithAuthor1 = async()=>{

  let {db, conexion} = await connect.getinstance();

  let collection = db.collection('movis');
  let data = collection.aggregate([
    {
      $match: {
        "character.id_actor": 1
      }
    }
  ]).toArray();
  return data;




}
// 8 **Calcular el valor total de todas las copias de DVD disponibles:**

export const getDvdCopiesTotalValue = async()=>{
  let {db, conexion} = await connect.getinstance();

  let collection = await db.collection('movis');
  let data = await collection.aggregate([
    {
      $unwind: "$format"
    },
    {
      $match: {
        "format.name": "dvd"
      }
    },
    {
      $group: {
        _id: "$_id",
        valor_copias: {
          $sum: {
            $multiply: [
              "$format.value",
              "$format.copies"
            ]
          }
        },
        copias: { $first: "$format.copies" }
      }
    }
  ]).toArray();
  conexion.close();
  return data;




}


//9 Encontrar todas las películas en las que John Doe ha actuado:**

export const getJohnDoeMovies = async()=>{

  let {db, conexion} = await connect.getinstance();

  let collection = db.collection('movis');

  let data = await collection.aggregate([
    {
      $lookup: {
        from: "authors",
        localField: "character.id_actor",
        foreignField: "id_actor",
        as: "actor_info"
      }
    },
    {
      $match: {
        "actor_info.full_name": "John Doe"
      }
    },
    {
      $project: {
        pelicula: "$name",
        _id: 0
      }
    }
  ]).toArray();
  return data;



}

//13 **Encontrar todas las películas en las que participan actores principales:**

export const getAllMoviesWithPrincipalAuthors = async()=>{

   let {db, conexion} = await connect.getinstance();

   let collection = await db.collection('movis');
   let data = await collection.aggregate([
    {
      $match: {
        "character.rol": "principal"
      }
    },
    {
      $project: {
        name: 1,
        _id: 0
      }
    }
  ]).toArray();
  conexion.close();
  return data;





}
// 14 **Encontrar el número total de premios que se han otorgado en todas las películas:**
export const getTotalMoviesAwards = async()=>{

  let {db, conexion}= await connect.getinstance();
  let collection = await db.collection('movis');
  let data = await collection.aggregate([
    {
      $lookup: {
        from: "authors",
        localField: "character.id_actor",
        foreignField: "id_actor",
        as: "actor_info"
      }
    },
    {
      $unwind: "$actor_info"
    },
    {
      $unwind: "$actor_info.awards"
    },
    {
      $group: {
        _id: null,
        total_premios: { $sum: 1 }
      }
    }
  ]).toArray();
  conexion.close();
  return data;

}


// 15 **Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray:**

export const getJohnDoeBluerayMovies = async()=>{

  let {db, conexion} = await connect.getinstance();

  let collection = await db.collection('movis');

  let data = await collection.aggregate([
    {
      $lookup: {
        from: "authors",
        localField: "character.id_actor",
        foreignField: "id_actor",
        as: "actor_info"
      }
    },
    {
      $match: {
        "actor_info.full_name": "John Doe",
        "format.name": "Bluray"
      }
    },
    {
      $project: {
        name: 1,
        formato : "$format.name",
        _id: 0
      }
    }
  ]).toArray();

  conexion.close();
  return data;




}

//16 **Encontrar todas las películas de ciencia ficción que tengan al actor con id 3:**

export const getFictionMoviesWithAuthor3 = async()=>{
  let {db, conexion} = await connect.getinstance();

  let collection = await db.collection('movis');
  let data = await collection.aggregate([
    {
      $match: {
        genre: "Ciencia Ficción",
        "character.id_actor": 3
      }
    },
    {
      $project: {
        nombre_pelicula: "$name",
          id_actores: "$character.id_actor",
        _id: 0
      }
    }
  ]).toArray();
  conexion.close();
  return data;




}

//17 **Encontrar la película con más copias disponibles en formato DVD:**

export const getMoviWithMostDvdCopies = async()=>{

  let {db, conexion} = await connect.getinstance();
  let collection = await db.collection('movis');
  let data = await collection.aggregate([
    {
      $unwind: "$format"
    },
    {
      $match: {
        "format.name": "dvd"
      }
    },
    {
      $sort: {
        "format.copies": -1
      }
    },
    {
      $limit: 1
    },
    {
      $project: {
        name: 1,
        copies: "$format.copies",
        _id: 0
      }
    }
  ]).toArray();
  conexion.close();
  return data;


}

//19**Calcular el valor total de todas las copias de Blu-ray disponibles:**

export const getBlurayCopiesValue = async()=>{

  let {db, conexion}= await connect.getinstance();
  let collection = await  db.collection('movis');
  let data = await collection.aggregate([
    {
      $unwind: "$format"
    },
    {
      $match: {
        "format.name": "Bluray"
      }
    },
    {
      $group: {
        _id: null,
        valor_total: {
          $sum: { $multiply: ["$format.copies", "$format.value"] }
        },
        copias: {$first: "$format.copies"}
      }
    },
    
    {
      $project: {
        _id: 0,
        valor_total: 1,
        copias: 1
      }
    }
  
    
  ]).toArray();
  conexion.close();
  return data;
}

//20 **Encontrar todas las películas en las que el actor con id 2 haya participado:**}

 export  const getMoviesWithAuthor2 = async()=>{
  
  let{db, conexion} = await connect.getinstance();
  let collection = await db.collection('movis');
  let data = await collection.aggregate([
    {
      $match: {
        "character.id_actor": 2
      }
    },
    {
      $project: {
        name: 1,
        actores: "$character.id_actor",
        _id: 0
      }
    }
  ]).toArray();
  conexion.close();
  return data;
 }