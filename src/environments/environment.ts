interface IEnvironment {
    origin: string;
    prefix: string;
    version: string;
}
const environmentDevelopment: IEnvironment = {
    origin: 'http://localhost:5000',
    prefix: 'api',
    version: 'v1',
};

const environmentProduction: IEnvironment = {
    origin: 'http://localhost:5000',
    prefix: 'api',
    version: 'v1',
};

const environment: IEnvironment =
    process.env.NODE_ENV === 'production' ? environmentProduction : environmentDevelopment;

export default environment;
