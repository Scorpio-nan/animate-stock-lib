import { paramsStruct } from './utils';

const json = {
    "jsonrpc": "2.0",
    "id": 284,
    "result": {
        "length": 76,
        "records": [
            {
                "id": 1130,
                "name": "DICOR LAND SRL",
                "login": "fjauto2@fjdynamics.com",
                "lang": "en_US",
                "login_date": "2023-01-28 09:20:06",
                "state": "active",
            }
        ]
    }
}

const result = paramsStruct(json);

console.log(JSON.stringify(result, null, 4));
