# Consultas Blockbuster

1. **Contar el número total de copias de DVD disponibles en todos los registros:**

   ```javascript
   [
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
            _id: "$format.name",
            cantidad: {$sum: "$format.copies"}
          }
        }
      ]
   
   ```

2. **Encontrar todos los actores que han ganado premios Oscar:**

   ```javascript
   [
        {
          $unwind: "$awards"
        },
        {
          $match: {
            "awards.name": "Oscar Award"
          }
        }
      ]
   
   ```

3. **Encontrar la cantidad total de premios que ha ganado cada actor:**

   ```javascript
   [
        { 
          $unwind: "$awards" 
        },
        { 
          $group: {
            _id: "$full_name",
            total_awards: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            total_awards: 1
          }
        }
      ]
   
   ```

4. **Obtener todos los actores nacidos después de 1980:**

   ```javascript
   [
        {
          $unwind: "$date_of_birth"
        },
        {
          $match: {
            "date_of_birth": {$gt: "1980"}
          }
        }
      ]
   
   ```

5. **Encontrar el actor con más premios:**

   ```javascript
   [
        { 
          $unwind: "$awards" 
        },
        { 
          $group: {
            _id: "$full_name",
            total_awards: { $sum: 1 }
          }
        },
        {
          $sort: {
            "total_awards": -1
          }
        },
        {
          $limit: 1
        }
      ]
   
   ```

6. **Listar todos los géneros de películas distintos:**

   ```javascript
   [
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
   ]
   ```

7. **Encontrar películas donde el actor con id 1 haya participado:**

   ```javascript
   [
     {
       $match: {
         "character.id_actor": 1
       }
     }
   ]
   ```

8. **Calcular el valor total de todas las copias de DVD disponibles:**

   ```javascript
   [
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
   ]
   ```

9. **Encontrar todas las películas en las que John Doe ha actuado:**

   ```javascript
   [
     {
       $lookup: {
         from: "authors",// actor en my db authors en la de miguel
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
         name: 1,
         _id: 0
       }
     }
   ]
   ```

10. **Encontrar el número total de actores en la base de datos:**

    ```javascript
    [
      {
        $count: "total_actores"
      }
    ]
    ```

11. **Encontrar la edad promedio de los actores en la base de datos:**

    ```javascript
    [
      {
        $project: {
          age: {
            $subtract: [
              { $year: new Date() },
              { $year: { $dateFromString: { dateString: "$date_of_birth" } } }
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          promedio_edad: { $avg: "$age" }
        }
      }
    ]
    ```

12. **Encontrar todos los actores que tienen una cuenta de Instagram:**

    ```javascript
    [
      {
        $match: {
          "social_media.instagram": { $exists: true, $ne: "" }
        }
      },
      {
        $project: {
          full_name: 1,
          instagram: "$social_media.instagram",
          _id: 0
        }
      }
    ]
    ```

13. **Encontrar todas las películas en las que participan actores principales:**

    ```javascript
    [
      {
        $match: {
          "character.rol": "principal"
        }
      },
      {
        $project: {
          name: 1,
            personaje: '$character.apodo',
            rol: '$character.rol',
          _id: 0
        }
      }
    ]
    ```

14. **Encontrar el número total de premios que se han otorgado en todas las películas:**

    ```javascript
    [
      {
        $lookup: {
          from: "authors", // actor en mi db authors en la de miguel 
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
    ]
    ```

15. **Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray:**

    ```javascript
    [
      {
        $lookup: {
          from: "authors", //actor en mi db authord en la de miguel 
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
          formato : "$format.name"
          _id: 0
        }
      }
    ]
    ```

16. **Encontrar todas las películas de ciencia ficción que tengan al actor con id 3:**

    ```javascript
    [
      {
        $match: {
          genre: "Ciencia Ficción",
          "character.id_actor": 3
        }
      },
      {
        $project: {
          name: 1,
            id_actores: "$character.id_actor",
          _id: 0
        }
      }
    ]
    ```

17. **Encontrar la película con más copias disponibles en formato DVD:**

    ```javascript
    [
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
    ]
    ```

18. **Encontrar todos los actores que han ganado premios después de 2015:**

    ```javascript
    [
      {
        $unwind: "$awards"
      },
      {
        $match: {
          "awards.year": { $gt: 2015 }
        }
      },
      {
        $group: {
          _id: "$full_name",
          premios: { $push: "$awards.name" },
            año : {$push : "$awards.year"}
        }
      },
        
      {
        $project: {
          _id: 0,
          nombre: "$_id",
          premios: 1,
        año: 1
        }
      }
    ]
    ```

19. **Calcular el valor total de todas las copias de Blu-ray disponibles:**

    ```javascript
    [
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
          }
        }
      },
      {
        $project: {
          _id: 0,
          valor_total: 1
        }
      }
    ]
    ```

20. **Encontrar todas las películas en las que el actor con id 2 haya participado:**

    ```javascript
    [
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
    ]
    ```

