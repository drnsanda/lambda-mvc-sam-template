
interface filteredKeys {
    PK?: String;
    SK?: String;

    GSI1PK?: String;
    GSI1SK?: String;

    GSI2PK?: String;
    GSI2SK?: String;

    GSI3PK?: String;
    GSI3SK?: String;

    GSI4PK?: String;
    GSI4SK?: String;

    GSI5PK?: String;
    GSI5SK?: Number;

    GSI6PK?: String;
    GSI6SK?: Number;

    GSI7PK?: String;
    GSI7SK?: Number;

    GSI8PK?: String;
    GSI8SK?: String;
}
/** Remove all schema keys from the items returned */
const filterData = (data: filteredKeys): Object => {
    delete data.PK;
    delete data.SK;

    delete data.GSI1PK;
    delete data.GSI1SK;

    delete data.GSI2PK;
    delete data.GSI2SK;

    delete data.GSI3PK;
    delete data.GSI3SK;

    delete data.GSI4PK;
    delete data.GSI4SK;

    delete data.GSI5PK;
    delete data.GSI5SK;

    delete data.GSI6PK;
    delete data.GSI6SK;

    delete data.GSI7PK;
    delete data.GSI7SK;

    delete data.GSI8PK;
    delete data.GSI8SK;

    return data;
};

export default filterData;
