import { useNotLoggedInDetailData } from "../../hooks/useDetailData";
import PageContainer from "./pageContainer";
import LocationProvider from "../../providers/locationProvider";
import BottomButtons from "./bottomButtons";
import CocktailPhoto from "./cocktailPhoto";
import RightSideContainer from "./rightSideContainer";
import CocktailTitle from "./cocktailTitle";
import { Ingredients } from "./ingredients";
import Directions from "./directions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import FavoriteIcon from "@mui/icons-material/Favorite";

function NotLoggedinDetail(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const {
    strDrink: cocktailName,
    strDrinkThumb: thumb,
    strInstructions: instructions,
    Favorite: favorites,
  } = props.data;

  const bigThumbnail = matches ? <></> : <CocktailPhoto thumb={thumb} />;

  const smallThumbnail = matches ? <CocktailPhoto thumb={thumb} /> : <></>;

  const { getIngredients } = useNotLoggedInDetailData({ data: props.data });

  const ingredients = getIngredients(props.data, "strIngredient");
  const measurement = getIngredients(props.data, "strMeasure");

  const likes = favorites.length;

  return (
    <LocationProvider>
      <PageContainer>
        {bigThumbnail}
        <RightSideContainer>
          <CocktailTitle cocktailName={cocktailName} />
          {smallThumbnail}
          <Typography
            sx={{ mt: { xs: 0, md: 0 }, display: "flex", alignItems: "center" }}
          >
            {likes}
            {likes === 1 ? " like" : " likes"}
            <FavoriteIcon sx={{ fontSize: "medium", color: "red" }} />
          </Typography>
          <Ingredients ingredients={ingredients} measurement={measurement} />
          <Directions instructions={instructions} />
          <BottomButtons />
        </RightSideContainer>
      </PageContainer>
    </LocationProvider>
  );
}

export default NotLoggedinDetail;
