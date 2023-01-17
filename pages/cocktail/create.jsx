import LocationProvider from "../../providers/locationProvider";
import PageContainer from "../../components/detail/pageContainer";
import { getIngredients } from "../../lib/inventory";
import { getCocktailNames } from "../../lib/cocktail";
import { getUserId } from "../../lib/user";
import Layout from "../../components/layout";
import NewCocktailProvider from "../../providers/newCocktailProvider";
import Form from "../../components/create/form";

function Create(props) {
  return (
    <LocationProvider>
      <NewCocktailProvider
        ingredients={props.ingredients}
        cocktails={props.cocktails}
        userId={props.userId}
      >
        <Layout navbarType={2}>
          <PageContainer>
            <Form />
          </PageContainer>
        </Layout>
      </NewCocktailProvider>
    </LocationProvider>
  );
}

Create.auth = true;

export async function getServerSideProps(context) {
  const sessionToken = context.req.cookies["next-auth.session-token"];
  const userInfo = await getUserId(sessionToken);
  const { ingredients } = await getIngredients();
  const cocktails = await getCocktailNames();
  return {
    props: {
      ingredients,
      cocktails,
      userId: userInfo.userId,
    },
  };
}

export default Create;
