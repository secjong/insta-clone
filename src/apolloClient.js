import ApolloClient from "apollo-boost";
import utils from "./commons/utils";

const client = new ApolloClient({
    uri: utils.getApiServer
});

export default client;