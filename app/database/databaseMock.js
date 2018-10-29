createDatabase();
function createDatabase() {
    if(!global.database){
        global.database = {
            get: [],
            post: [],
            put: [],
            delete: []
        };
    }
}