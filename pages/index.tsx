import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Recipe, { Recipes } from "../models/Recipe";
import { GetServerSideProps } from "next";

type Props = {
  recipes: Recipes[];
};

const Index = ({ recipes }: Props) => {
  return (
    <>
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <div className="card">
            <img src={recipe.image_url} />
            <h5 className="pet-name">{recipe.recipe_name}</h5>
            <div className="main-content">
              <p className="pet-name">{recipe.recipe_name}</p>
              {/* <p className="owner">Owner: {pet.owner_name}</p> */}

              {/* Extra Pet Info: Likes and Dislikes */}
              {/* <div className="likes info">
                <p className="label">Likes</p>
                <ul>
                  {pet.likes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </div>
              <div className="dislikes info">
                <p className="label">Dislikes</p>
                <ul>
                  {pet.dislikes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </div> */}

              <div className="btn-container">
                <Link
                  href={{ pathname: "/[id]/edit", query: { id: recipe._id } }}
                >
                  <button className="btn edit">Edit</button>
                </Link>
                <Link href={{ pathname: "/[id]", query: { id: recipe._id } }}>
                  <button className="btn view">View</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

/* Retrieves pet(s) data from mongodb database */
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect();

  /* find all the data in our database */
  const result = await Recipe.find({});

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const recipes = result.map((doc) => {
    const recipe = JSON.parse(JSON.stringify(doc));
    return recipe;
  });

  return { props: { recipes: recipes } };
};

export default Index;
