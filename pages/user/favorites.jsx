import * as React from "react";
import { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Link from "next/link";
import { getFavorites, getUserId } from "../../lib/favorite";
import { Box, Button } from "@mui/material";
import {
  getAllCategoriesByUser,
  getCategoryContentsByUser,
} from "../../lib/category";
import CategoryForm from "../../components/category/categoryForm";
import CategoryMenu from "../../components/category/categoryMenu";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ExpandCircleDownTwoToneIcon from "@mui/icons-material/ExpandCircleDownTwoTone";

const Favorites = (props) => {
  const [recipes, setRecipes] = useState(props.recipes);
  const [categories, setCategories] = useState(props.categories);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const categoryList = (categories) => {
    setCategories(categories);
  };

  const filterCocktail = (cocktails) => {
    setRecipes(cocktails);
  };

  const imagePath = (id) => {
    if (id.includes("/public")) {
      const newId = id.replace("/public", "");
      return newId;
    }
    return id;
  };
  const results = recipes.map((item) => (
    <ImageListItem
      key={item.idDrink}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href={`/cocktail/${item.idDrink}`}>
        <Image
          src={item.strDrinkThumb}
          alt={item.strDrink}
          width={matches ? "351" : "435"}
          height={matches ? "375" : "450"}
          object-fit="cover"
          position="relative"
        />
      </Link>
      <CategoryMenu
        categories={categories}
        favId={item.favId}
        userId={item.userId}
        categoryContents={props.categoryContents}
      />
      <ImageListItemBar
        title={item.strDrink}
        subtitle={item.strCategory}
        sx={{
          marginBottom: "6px",
        }}
      />
    </ImageListItem>
  ));
  return (
    <Box
      sx={{
        marginTop: "104px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CategoryForm
        categories={categories}
        setCategories={categoryList}
        filterCocktail={filterCocktail}
        userId={props.userId}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ImageList sx={{ width: "100%", height: "80%" }} cols={matches ? 1 : 3}>
          {results}
        </ImageList>
      </Box>
      <Button
        variant="outlined"
        size="medium"
        sx={{ m: 2 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
      </Button>
    </Box>
  );
};
Favorites.auth = true;

export async function getServerSideProps(context) {
  const sessionToken = context.req.cookies["next-auth.session-token"];
  if (sessionToken) {
    const categoryContents = await getCategoryContentsByUser(sessionToken);
    const userId = await getUserId(sessionToken);
    const categoriesByUser = await getAllCategoriesByUser(sessionToken);
    const recipes = await getFavorites(sessionToken);
    const categories = categoriesByUser.map((el) => el.name);

    return {
      props: {
        recipes,
        userId,
        categories,
        categoryContents,
      },
    };
  }
  return { props: {} };
}

export default Favorites;
