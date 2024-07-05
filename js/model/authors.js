import { ObjectId } from "mongodb";
import {connect} from "../../helper/db/connect.js"



export class authors extends connect{
  static instanceAuthors;
  db
  constructor() {
      super();

      this.db = this.conexion.db(this.getDbName);
      if (typeof authors.instanceAuthors === 'object') {
          return authors.instanceAuthors;
      }
      authors.instanceAuthors = this;
      return this;
  }
  destructor(){
    authors.instanceAuthors = undefined;
    connect.instance = undefined;
  }
  // 1. **Contar el número total de copias de DVD disponibles en todos los registros:**
  async getAuthorsWithOscar(){
    await this.conexion.connect();
      const collection = this.db.collection('authors');
      const data = await collection.aggregate([
        {
          $unwind: "$awards"
        },
        {
          $match: {
            "awards.name": "Oscar Award"
          }
        }
      ]
        
      ).toArray();
      await this.conexion.close();
      return data;
  }

  async getTotalAuthorAwards(){
    await this.conexion.connect();
    const collection = this.db.collection('authors');
    const data = await collection.aggregate([
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
    ]).toArray();
    await this.conexion.close();
    return data;
  }
  async authorsBornAfter1980(){
    await this.conexion.connect();
    const collection = this.db.collection('authors');
    const data = await collection.aggregate([
      {
        $unwind: "$date_of_birth"
      },
      {
        $match: {
          "date_of_birth": {$gt: "1980"}
        }
      }
    ]).toArray();
    await this.conexion.close();
    return data;
  }

///5 **Encontrar el actor con más premios:**
  async getAuthorWithMoreAwards(){
    await this.conexion.connect();
    const collection = this.db.collection('authors');
    const data = await collection.aggregate([
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
    ]).toArray();
    await this.conexion.close();
    return data;
  }
// 10 **Encontrar el número total de actores en la base de datos:**
async getTotalAuthors(){
  await this.conexion.connect();
  const collection = this.db.collection('authors');

  const data = await collection.aggregate([
    {
      $count: "total_actores"
    }
  ]).toArray();
  await this.conexion.close();
  return data;
}
//11 **Encontrar la edad promedio de los actores en la base de datos:**
async AvgAuthorsAge(){
  await this.conexion.connect();
  const collection = this.db.collection('authors');
  const data = await collection.aggregate([
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
  ]).toArray();
  await this.conexion.close();
  return data;
}
//12 **Encontrar todos los actores que tienen una cuenta de Instagram:**
async getAllAuthorsWithInstagram(){
  await this.conexion.connect();
  const collection = this.db.collection('authors');
  const data = await collection.aggregate([
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
  ]).toArray();
  await this.conexion.close();
  return data;
}
//18 **Encontrar todos los actores que han ganado premios después de 2015:**
async getAuthorsAwardsAfter2015(){
  await this.conexion.connect();
  const collection = this.db.collection('authors');
  const data = await collection.aggregate([
  
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
  ]).toArray();
  await this.conexion.close();
  return data;
}
}
//2 
export const getAuthorsWithOscar= async () =>{
  
    let {db,conexion} = await connect.getinstance();


    const collection = db.collection('authors');
    const data = await collection.aggregate([
        {
          $unwind: "$awards"
        },
        {
          $match: {
            "awards.name": "Oscar Award"
          }
        }
      ]).toArray();
    conexion.close();
    return data; // aaca se agrega lo de js (length) etc 



}

// 3 **Encontrar la cantidad total de premios que ha ganado cada actor:**
export const getTotalAuthorAwards= async () =>{
    let {db,conexion} = await connect.getinstance();


    const collection = db.collection('authors');
    const data = await collection.aggregate([
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
      ]).toArray();
    conexion.close();
    return data; // aaca se agrega lo de js (length) etc 



}

/// 4 **Obtener todos los actores nacidos después de 1980:**

export const  authorsBornAfter1980 = async() =>{
    let {db, conexion} = await connect.getinstance();

    const collection = db.collection('authors');
    const data = await collection.aggregate([
        {
          $unwind: "$date_of_birth"
        },
        {
          $match: {
            "date_of_birth": {$gt: "1980"}
          }
        }
      ]
   ).toArray();
    conexion.close();
    return data;
}

///5 **Encontrar el actor con más premios:**

export const getAuthorWithMoreAwards = async() =>{
    let {db,conexion} = await connect.getinstance();

    const collection = db.collection('authors');
    const data = await collection.aggregate([
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
      ]).toArray();
    conexion.close();
    return data;

}


// 10 **Encontrar el número total de actores en la base de datos:**

export const getTotalAuthors = async()=> {
    
    let {db, conexion} = await connect.getinstance();

    let collection = await db.collection('authors');
    let data = await collection.aggregate([
        {
          $count: "total_actores"
        }
      ]).toArray();
      conexion.close();
      return data;







}

//11 **Encontrar la edad promedio de los actores en la base de datos:**

export const AvgAuthorsAge = async()=>{

    let {db, conexion} = await connect.getinstance();

    let collection = await db.collection('authors');
    let data = await collection.aggregate([
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
      ]).toArray();
      conexion.close();
      return data;



}

//12 **Encontrar todos los actores que tienen una cuenta de Instagram:**

export const getAllAuthorsWithInstagram = async()=>{
    let {db, conexion} = await connect.getinstance();
    
    let collection = await db.collection('authors');
    let data = await collection.aggregate([
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
      ]).toArray();
      conexion.close();
      return data;



}

//18 **Encontrar todos los actores que han ganado premios después de 2015:**


export const getAuthorsAwardsAfter2015 = async()=>{


    let{db, conexion} = await connect.getinstance();
    let collection = await db.collection('authors');
    let data = await collection.aggregate([
  
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
      ]).toArray();
      conexion.close();
      return data;

}